const Configuration = require('./nodejs-sdk/packages/api/common/configuration').Configuration;
Configuration.setConfig(path.join(__dirname, args.config));

const Web3jService = require('./nodejs-sdk/packages/api').Web3jService;
let web3jService = new Web3jService();

web3jService.getBlockNumber().then(blockNumber => {
    console.log(blockNumber)
});


// 获取某个地址拥有的 NFT 数量
web3jService.call('NFTContractAddress', 'balanceOf', [ownerAddress]).then(result => {
    console.log('NFT Balance:', result.output);
}).catch(err => {
    console.error('Error:', err);
});

// 获取某个 NFT 的 URI
web3jService.call('NFTContractAddress', 'tokenURI', [tokenId]).then(result => {
    console.log('NFT URI:', result.output);
}).catch(err => {
    console.error('Error:', err);
});

// Mint 一个新的 NFT
const mintData = '0x' + web3.utils.utf8ToHex(tokenURI).slice(2); // Convert tokenURI to hex data
web3jService.sendRawTransaction('NFTContractAddress', {
    to: 'NFTContractAddress',
    func: { name: 'mint', args: [toAddress, mintData] },
    params: [],
    who: 'YOUR_ADMIN_ACCOUNT'
}).then(result => {
    console.log('Mint Transaction Hash:', result.transactionHash);
    console.log('Mint Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});

// 从一个地址转移 NFT 到另一个地址
web3jService.sendRawTransaction('NFTContractAddress', {
    to: 'NFTContractAddress',
    func: { name: 'transferFrom', args: [fromAddress, toAddress, tokenId] },
    params: [],
    who: 'YOUR_MARKET_ACCOUNT'
}).then(result => {
    console.log('Transfer Transaction Hash:', result.transactionHash);
    console.log('Transfer Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});

// 设置市场地址
web3jService.sendRawTransaction('NFTContractAddress', {
    to: 'NFTContractAddress',
    func: { name: 'setMarket', args: [marketAddress] },
    params: [],
    who: 'YOUR_ADMIN_ACCOUNT'
}).then(result => {
    console.log('Set Market Transaction Hash:', result.transactionHash);
    console.log('Set Market Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});
