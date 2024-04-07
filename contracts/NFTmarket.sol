// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;


import {ECDSA} from "./utils/ECDSA.sol";

interface INFT {
        function transferFrom(address from, address to, uint256 tokenId) external;
        function ownerOf(uint256 tokenId) external returns(address);
}

interface IPoint {
        function withdrawTPoints(address _to, uint256 _amount) external;
        function addTPoints(address _to, uint256 _amount) external;
}

contract NFTMarket {

    using ECDSA for bytes32;

    address private marketOwner;
    address private signer;
    address private nftAddr;
    address private pointPool;

    bytes32 public constant BuyNFT_TYPEHASH = keccak256("BuyNFT(address buyer,uint256 tokenID)");
    bytes32 public constant BuyNFTWithSign_TYPEHASH = keccak256("BuyNFTDirectly(uint256 tokenID, uint price)");
    bytes32 public constant EIP712DOMAIN_TYPEHASH = keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
    bytes32 public DOMAIN_SEPARATOR;

    uint16 public fee = 1;
    uint256 constant public MILLION = 10 ** 7;
    uint16  constant public HUNDRED = 100;
    uint16  constant public THOUSAND = 1000;

    event BuySuccess(address buyer, uint tokenID);
    event ListSuccess(uint256 tokenID, uint256 amount);

    error MoneyNotEnough(uint amount);
    error NotOwner(address msgSender, uint tokenID);
    error NotSelling(uint256 tokenID);
    error NotMarketOwner(address sender);
    error TransferFailed();

    mapping(uint256 => uint256) price;
    mapping(uint256 => bool) isListed;

    modifier OnlyOwner(uint256 tokenID){
        address nftOwner = INFT(nftAddr).ownerOf(tokenID);
        if (msg.sender != nftOwner) revert NotOwner(msg.sender, tokenID);
        _;
    }

    modifier OnlyMarketOwner(){
        if (msg.sender != marketOwner) revert NotMarketOwner(msg.sender);
        _;
    }

    modifier isOnSelling(bytes memory data){
        uint256 tokenID = bytesToUint(data);
        if (isListed[tokenID] == false) revert NotSelling(tokenID);
        _;
    }

    modifier isOnSelling2(uint tokenID){
        if (isListed[tokenID] == false) revert NotSelling(tokenID);
        _;
    }
    
    
     constructor(address NftAddr, address PointPool) {
         nftAddr = NftAddr;
         pointPool = PointPool;
         signer = msg.sender;
         marketOwner = msg.sender;
         DOMAIN_SEPARATOR = keccak256(abi.encode(
             EIP712DOMAIN_TYPEHASH, // type hash
             keccak256(bytes("EIP712Storage")), // name
             keccak256(bytes("1")), // version
             block.chainid, // chain id
             address(this) // contract address
         ));
    }

                     /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
                     /*                  PUBLIC FUNCTIONS                          */
                     /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/

    /**
     * User lists nft for sale
     */
    function sellNFTs(uint256 tokenID, uint256 amount) public OnlyOwner(tokenID) {
        price[tokenID] = amount;
        isListed[tokenID] = true;
        emit ListSuccess(tokenID, amount);
    }
    
    /**
     * User removes nft
     */
    function removeNFT(uint tokenID) public OnlyOwner(tokenID) {
        isListed[tokenID] = false;
    }

    /**
     * User buy nft
     */
    function buyNFT(uint256 tokenID) public isOnSelling2(tokenID) {
        uint256 amount = price[tokenID];
        address seller = INFT(nftAddr).ownerOf(tokenID);
        uint256 txfeeNeed = amount * MILLION * fee / THOUSAND;
        IPoint(pointPool).withdrawTPoints(msg.sender, amount + txfeeNeed);
        IPoint(pointPool).addTPoints(seller, amount);
        INFT(nftAddr).transferFrom(seller, msg.sender, tokenID) ;
        emit BuySuccess(msg.sender, tokenID);
    }

    /**
     * View NFT's price
     */
    function viewPrice(uint256 tokenID) public view returns(uint256){
        return price[tokenID];
    }

    /**
     * View NFT's owner
     */
    function viewOwner(uint256 tokenID) public returns(address) {
        return INFT(nftAddr).ownerOf(tokenID);
    }


    /**
     * whitelist mode
     * Only users with signatures issued by the project party can purchase the corresponding NFT
     */
    function WhitelistBuy(uint256 tokenID, bytes memory _signature) public {
        require(permitWhitelist(tokenID, _signature), "No Permission");
        uint256 amount = price[tokenID];
        address seller = INFT(nftAddr).ownerOf(tokenID);
        uint256 txfeeNeed = (amount * fee * MILLION) / THOUSAND;
        IPoint(pointPool).withdrawTPoints(msg.sender, amount + txfeeNeed);
        IPoint(pointPool).addTPoints(seller, amount);
        INFT(nftAddr).transferFrom(seller, msg.sender, tokenID) ;
        emit BuySuccess(msg.sender, tokenID);
    }

   
   /**
     * Sellers do not need to list NFT
     * Buyers can directly purchase NFTs with the signature of the seller
     */
   function buyWithSignature(uint256 tokenID, uint amount, bytes memory _signature) public {
        require(permitSignature(tokenID, amount,  _signature), "No Permission");
        address seller = INFT(nftAddr).ownerOf(tokenID);
        uint256 txfeeNeed = (amount * fee * MILLION) / THOUSAND;
        IPoint(pointPool).withdrawTPoints(msg.sender, amount + txfeeNeed);
        IPoint(pointPool).addTPoints(seller, amount);
        INFT(nftAddr).transferFrom(seller, msg.sender, tokenID) ;
        emit BuySuccess(msg.sender, tokenID);
   }

    /**
     * Setting the transaction fee rate
     */
    function setFee(uint16 _fee) public OnlyMarketOwner{
        fee = _fee;
    }

                     /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
                     /*                  INTERNAL FUNCTIONS                          */
                     /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/

    /**
     * Verify signature issued by seller
     */
    function permitSignature(uint256 tokenID, uint amount, bytes memory _signature) internal returns(bool) {
        require(_signature.length == 65, "invalid signature length");
        (bytes32 r, bytes32 s, uint8 v) = decondeSignature(_signature);
        bytes32 _msgHash = keccak256(abi.encodePacked(
            "\x19\x01",
            DOMAIN_SEPARATOR,
            keccak256(abi.encode(BuyNFTWithSign_TYPEHASH, msg.sender, tokenID))
        )); 
        
        address owner = viewOwner(tokenID);
        return ( owner == _msgHash.recover(v, r, s));

    }

     /**
     * Verify whitelist signature
     */
    function permitWhitelist(uint256 tokenID, bytes memory _signature) internal returns(bool) {
        require(_signature.length == 65, "invalid signature length");
        (bytes32 r, bytes32 s, uint8 v) = decondeSignature(_signature);
        bytes32 _msgHash = keccak256(abi.encodePacked(
            "\x19\x01",
            DOMAIN_SEPARATOR,
            keccak256(abi.encode(BuyNFT_TYPEHASH, msg.sender, tokenID))
        )); 
        
        return (signer == _msgHash.recover(v, r, s));

    }

    /**
     * decode signature
     */
    function decondeSignature(bytes memory _signature) internal returns(bytes32, bytes32, uint8) {

        bytes32 r;
        bytes32 s;
        uint8 v;
        assembly {
            r := mload(add(_signature, 0x20))
            s := mload(add(_signature, 0x40))
            v := byte(0, mload(add(_signature, 0x60)))
        }
        return (r, s, v);

    }

    /**
     * bytes to uint256
     */
    function bytesToUint(bytes memory b) internal returns (uint256){
        uint256 number;
        for(uint i= 0; i<b.length; i++){
            number = number + uint8(b[i])*(2**(8*(b.length-(i+1))));
        }
        return  number;
    }

}

