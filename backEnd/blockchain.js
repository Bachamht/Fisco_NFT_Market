const Configuration = require('./nodejs-sdk/packages/api/common/configuration').Configuration;
Configuration.setConfig(path.join(__dirname, args.config));

const Web3jService = require('./nodejs-sdk/packages/api').Web3jService;
let web3jService = new Web3jService();

web3jService.getBlockNumber().then(blockNumber => {
    console.log(blockNumber)
});