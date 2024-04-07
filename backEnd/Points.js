const Configuration = require('../../nodejs-sdk/packages/api/common/configuration').Configuration;
const configFilePath = path.join(__dirname, '../../nodejs-sdk/packages/cli/conf/config.json');
const configuration = new Configuration(configFilePath);
const Web3jService = require('../../nodejs-sdk/packages/api/').Web3jService;
let web3jService = new Web3jService(configuration);

// 充值交易积分
web3jService.sendRawTransaction('PointsContractAddress', {
    to: 'PointsContractAddress',
    func: { name: 'rechargeTPoints', args: [receiverAddress, amount] },
    params: [],
    who: 'YOUR_ADMIN_ACCOUNT'
}).then(result => {
    console.log('Recharge TPoints Transaction Hash:', result.transactionHash);
    console.log('Recharge TPoints Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});

// 分配奖励积分
web3jService.sendRawTransaction('PointsContractAddress', {
    to: 'PointsContractAddress',
    func: { name: 'allocateRPoints', args: [receiverAddress, amount] },
    params: [],
    who: 'YOUR_ADMIN_ACCOUNT'
}).then(result => {
    console.log('Allocate RPoints Transaction Hash:', result.transactionHash);
    console.log('Allocate RPoints Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});

// 提现交易积分
web3jService.sendRawTransaction('PointsContractAddress', {
    to: 'PointsContractAddress',
    func: { name: 'withdrawTPoints', args: [receiverAddress, amount] },
    params: [],
    who: 'YOUR_ADMIN_ACCOUNT'
}).then(result => {
    console.log('Withdraw TPoints Transaction Hash:', result.transactionHash);
    console.log('Withdraw TPoints Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});

// NFT 卖家交易积分余额增加
web3jService.sendRawTransaction('PointsContractAddress', {
    to: 'PointsContractAddress',
    func: { name: 'addTPoints', args: [receiverAddress, amount] },
    params: [],
    who: 'YOUR_MARKET_ACCOUNT'
}).then(result => {
    console.log('Add TPoints Transaction Hash:', result.transactionHash);
    console.log('Add TPoints Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});

// 用户使用奖励积分
web3jService.sendRawTransaction('PointsContractAddress', {
    to: 'PointsContractAddress',
    func: { name: 'withdrawRPoints', args: [receiverAddress, amount] },
    params: [],
    who: 'YOUR_ADMIN_ACCOUNT'
}).then(result => {
    console.log('Withdraw RPoints Transaction Hash:', result.transactionHash);
    console.log('Withdraw RPoints Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});

// 设置市场地址
web3jService.sendRawTransaction('PointsContractAddress', {
    to: 'PointsContractAddress',
    func: { name: 'setMarket', args: [marketAddress] },
    params: [],
    who: 'YOUR_ADMIN_ACCOUNT'
}).then(result => {
    console.log('Set Market Transaction Hash:', result.transactionHash);
    console.log('Set Market Transaction Status:', result.status);
}).catch(err => {
    console.error('Error:', err);
});
