const Configuration = require('../../nodejs-sdk/packages/api/common/configuration').Configuration;
const configFilePath = path.join(__dirname, '../../nodejs-sdk/packages/cli/conf/config.json');
const configuration = new Configuration(configFilePath);
const Web3jService = require('../../nodejs-sdk/packages/api/').Web3jService;
let web3jService = new Web3jService(configuration);

// 上架自己的 NFT
web3jService.sendRawTransaction('NFTMarketContractAddress', {
    to: 'NFTMarketContractAddress',
    func: { name: 'sellNFTs', args: [tokenId, amount] },
    params: [],
    who: 'YOUR_NFT_OWNER_ACCOUNT'
}).then(result => {
    console.log('Sell NFT Transaction Hash:', result.transactionHash);
    console.log('Sell NFT Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});

// 下架 NFT
web3jService.sendRawTransaction('NFTMarketContractAddress', {
    to: 'NFTMarketContractAddress',
    func: { name: 'removeNFT', args: [tokenId] },
    params: [],
    who: 'YOUR_NFT_OWNER_ACCOUNT'
}).then(result => {
    console.log('Remove NFT Transaction Hash:', result.transactionHash);
    console.log('Remove NFT Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});

// 用户购买 NFT
web3jService.sendRawTransaction('NFTMarketContractAddress', {
    to: 'NFTMarketContractAddress',
    func: { name: 'buyNFT', args: [tokenId] },
    params: [],
    who: 'YOUR_BUYER_ACCOUNT'
}).then(result => {
    console.log('Buy NFT Transaction Hash:', result.transactionHash);
    console.log('Buy NFT Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});

// 查询 NFT 价格
web3jService.call('NFTMarketContractAddress', 'viewPrice', [tokenId]).then(result => {
    console.log('NFT Price:', result.output);
}).catch(err => {
    console.error('Error:', err);
});

// 查询 NFT 主人
web3jService.call('NFTMarketContractAddress', 'viewOwner', [tokenId]).then(result => {
    console.log('NFT Owner:', result.output);
}).catch(err => {
    console.error('Error:', err);
});

// 白名单购买 NFT
web3jService.sendRawTransaction('NFTMarketContractAddress', {
    to: 'NFTMarketContractAddress',
    func: { name: 'WhitelistBuy', args: [tokenId, signature] },
    params: [],
    who: 'YOUR_BUYER_ACCOUNT'
}).then(result => {
    console.log('Whitelist Buy NFT Transaction Hash:', result.transactionHash);
    console.log('Whitelist Buy NFT Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});

// 持有签名购买 NFT
web3jService.sendRawTransaction('NFTMarketContractAddress', {
    to: 'NFTMarketContractAddress',
    func: { name: 'buyWithSignature', args: [tokenId, amount, signature] },
    params: [],
    who: 'YOUR_BUYER_ACCOUNT'
}).then(result => {
    console.log('Buy With Signature NFT Transaction Hash:', result.transactionHash);
    console.log('Buy With Signature NFT Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});

// 设置手续费比率
web3jService.sendRawTransaction('NFTMarketContractAddress', {
    to: 'NFTMarketContractAddress',
    func: { name: 'setFee', args: [feeRate] },
    params: [],
    who: 'YOUR_ADMIN_ACCOUNT'
}).then(result => {
    console.log('Set Fee Transaction Hash:', result.transactionHash);
    console.log('Set Fee Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});
