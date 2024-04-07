const express = require('express');
const args = require('minimist')(process.argv.slice(2)); // 引入 'minimist' 模块来解析命令行参数npm install minimist
const app = express();
const path = require('path'); 
const PORT = 3001;

const Configuration = require('../../nodejs-sdk/packages/api/common/configuration').Configuration;
const configFilePath = path.join(__dirname, '../../nodejs-sdk/packages/cli/conf/config.json');
const configuration = new Configuration(configFilePath);
const Web3jService = require('../../nodejs-sdk/packages/api/').Web3jService;
let web3jService = new Web3jService(configuration);

                     /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
                     /*                    NFT Contract API                        */
                     /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/

app.get("/", async (req, res) => {
    try {
        // 调用 getBlockNumber 方法获取当前块高
        const result = await web3jService.getBlockNumber();
        // 将结果返回给用户
        res.json({ message: 'Current Block Number', blockNumber: result.result });
    } catch (err) {
        // 如果出现错误，返回错误信息给用户
        res.status(500).json({ error: err.message });
    }
});

//查寻某个地址的NFT数量
app.get("/balanceOf/:address", async (req, res) => {
    try {
        // 调用 NFT 合约中的 balanceOf 函数
        const result = await Web3jService.call('NFTContractAddress', 'balanceOf', [ownerAddress]);
        // 将结果返回给用户
        res.json({ message: 'NFT Balance', balance: result.output });
    } catch (err) {
        // 如果出现错误，返回错误信息给用户
        res.status(500).json({ error: err.message });
    }
});

//获取某个 NFT 的 URI
app.get("/getNFTURI/:tokenId", async (req, res) => {
    const tokenId = req.params.tokenId;
    try {
        const result = await web3jService.call('NFTContractAddress', 'tokenURI', [tokenId]);
        res.json({ message: 'NFT URI', uri: result.output });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mint 一个新的 NFT
app.post("/mintNFT", async (req, res) => {
    const { toAddress, tokenURI } = req.body;
    const mintData = '0x' + web3.utils.utf8ToHex(tokenURI).slice(2);
    try {
        const result = await web3jService.sendRawTransaction('NFTContractAddress', {
            to: 'NFTContractAddress',
            func: { name: 'mint', args: [toAddress, mintData] },
            params: [],
            who: 'YOUR_ADMIN_ACCOUNT'
        });
        res.json({ message: 'Mint Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 从一个地址转移 NFT 到另一个地址
app.post("/transferNFT", async (req, res) => {
    const { fromAddress, toAddress, tokenId } = req.body;
    try {
        const result = await web3jService.sendRawTransaction('NFTContractAddress', {
            to: 'NFTContractAddress',
            func: { name: 'transferFrom', args: [fromAddress, toAddress, tokenId] },
            params: [],
            who: 'YOUR_MARKET_ACCOUNT'
        });
        res.json({ message: 'Transfer Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 设置市场地址
app.post("/setMarketAddress", async (req, res) => {
    const { marketAddress } = req.body;
    try {
        const result = await web3jService.sendRawTransaction('NFTContractAddress', {
            to: 'NFTContractAddress',
            func: { name: 'setMarket', args: [marketAddress] },
            params: [],
            who: 'YOUR_ADMIN_ACCOUNT'
        });
        res.json({ message: 'Set Market Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

                     /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
                     /*                    Points Contract API                     */
                     /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/

// 充值交易积分
app.post("/rechargeTPoints", async (req, res) => {
    const { receiverAddress, amount } = req.body;
    try {
        const result = await web3jService.sendRawTransaction('PointsContractAddress', {
            to: 'PointsContractAddress',
            func: { name: 'rechargeTPoints', args: [receiverAddress, amount] },
            params: [],
            who: 'YOUR_ADMIN_ACCOUNT'
        });
        res.json({ message: 'Recharge TPoints Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 分配奖励积分
app.post("/allocateRPoints", async (req, res) => {
    const { receiverAddress, amount } = req.body;
    try {
        const result = await web3jService.sendRawTransaction('PointsContractAddress', {
            to: 'PointsContractAddress',
            func: { name: 'allocateRPoints', args: [receiverAddress, amount] },
            params: [],
            who: 'YOUR_ADMIN_ACCOUNT'
        });
        res.json({ message: 'Allocate RPoints Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 提现交易积分
app.post("/withdrawTPoints", async (req, res) => {
    const { receiverAddress, amount } = req.body;
    try {
        const result = await web3jService.sendRawTransaction('PointsContractAddress', {
            to: 'PointsContractAddress',
            func: { name: 'withdrawTPoints', args: [receiverAddress, amount] },
            params: [],
            who: 'YOUR_ADMIN_ACCOUNT'
        });
        res.json({ message: 'Withdraw TPoints Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// NFT 卖家交易积分余额增加
app.post("/addTPoints", async (req, res) => {
    const { receiverAddress, amount } = req.body;
    try {
        const result = await web3jService.sendRawTransaction('PointsContractAddress', {
            to: 'PointsContractAddress',
            func: { name: 'addTPoints', args: [receiverAddress, amount] },
            params: [],
            who: 'YOUR_MARKET_ACCOUNT'
        });
        res.json({ message: 'Add TPoints Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 用户使用奖励积分
app.post("/withdrawRPoints", async (req, res) => {
    const { receiverAddress, amount } = req.body;
    try {
        const result = await web3jService.sendRawTransaction('PointsContractAddress', {
            to: 'PointsContractAddress',
            func: { name: 'withdrawRPoints', args: [receiverAddress, amount] },
            params: [],
            who: 'YOUR_ADMIN_ACCOUNT'
        });
        res.json({ message: 'Withdraw RPoints Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 设置市场地址
app.post("/setMarketAddress", async (req, res) => {
    const { marketAddress } = req.body;
    try {
        const result = await web3jService.sendRawTransaction('PointsContractAddress', {
            to: 'PointsContractAddress',
            func: { name: 'setMarket', args: [marketAddress] },
            params: [],
            who: 'YOUR_ADMIN_ACCOUNT'
        });
        res.json({ message: 'Set Market Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

                     /*«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-«-*/
                     /*                    NFTMarket Contract API                  */
                     /*-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»-»*/

// 上架自己的 NFT
app.get("/sellNFT/:tokenId/:amount/:ownerAccount", async (req, res) => {
    const { tokenId, amount, ownerAccount } = req.params;
    try {
        const result = await web3jService.sendRawTransaction('NFTMarketContractAddress', {
            to: 'NFTMarketContractAddress',
            func: { name: 'sellNFTs', args: [tokenId, amount] },
            params: [],
            who: ownerAccount
        });
        res.json({ message: 'Sell NFT Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 下架 NFT
app.get("/removeNFT/:tokenId/:ownerAccount", async (req, res) => {
    const { tokenId, ownerAccount } = req.params;
    try {
        const result = await web3jService.sendRawTransaction('NFTMarketContractAddress', {
            to: 'NFTMarketContractAddress',
            func: { name: 'removeNFT', args: [tokenId] },
            params: [],
            who: ownerAccount
        });
        res.json({ message: 'Remove NFT Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 用户购买 NFT
app.get("/buyNFT/:tokenId/:buyerAccount", async (req, res) => {
    const { tokenId, buyerAccount } = req.params;
    try {
        const result = await web3jService.sendRawTransaction('NFTMarketContractAddress', {
            to: 'NFTMarketContractAddress',
            func: { name: 'buyNFT', args: [tokenId] },
            params: [],
            who: buyerAccount
        });
        res.json({ message: 'Buy NFT Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 查询 NFT 价格
app.get("/getNFTPrice/:tokenId", async (req, res) => {
    const { tokenId } = req.params;
    try {
        const result = await web3jService.call('NFTMarketContractAddress', 'viewPrice', [tokenId]);
        res.json({ message: 'NFT Price', price: result.output });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 查询 NFT 主人
app.get("/getNFTOwner/:tokenId", async (req, res) => {
    const { tokenId } = req.params;
    try {
        const result = await web3jService.call('NFTMarketContractAddress', 'viewOwner', [tokenId]);
        res.json({ message: 'NFT Owner', owner: result.output });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 白名单购买 NFT
app.get("/whitelistBuy/:tokenId/:signature/:buyerAccount", async (req, res) => {
    const { tokenId, signature, buyerAccount } = req.params;
    try {
        const result = await web3jService.sendRawTransaction('NFTMarketContractAddress', {
            to: 'NFTMarketContractAddress',
            func: { name: 'WhitelistBuy', args: [tokenId, signature] },
            params: [],
            who: buyerAccount
        });
        res.json({ message: 'Whitelist Buy NFT Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 持有签名购买 NFT
app.get("/buyWithSignature/:tokenId/:amount/:signature/:buyerAccount", async (req, res) => {
    const { tokenId, amount, signature, buyerAccount } = req.params;
    try {
        const result = await web3jService.sendRawTransaction('NFTMarketContractAddress', {
            to: 'NFTMarketContractAddress',
            func: { name: 'buyWithSignature', args: [tokenId, amount, signature] },
            params: [],
            who: buyerAccount
        });
        res.json({ message: 'Buy With Signature NFT Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 设置手续费比率
app.get("/setFee/:feeRate/:adminAccount", async (req, res) => {
    const { feeRate, adminAccount } = req.params;
    try {
        const result = await web3jService.sendRawTransaction('NFTMarketContractAddress', {
            to: 'NFTMarketContractAddress',
            func: { name: 'setFee', args: [feeRate] },
            params: [],
            who: adminAccount
        });
        res.json({ message: 'Set Fee Transaction Hash', transactionHash: result.transactionHash });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`App listening at http://0.0.0.0:${PORT}`);
});
