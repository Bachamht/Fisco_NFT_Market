const express = require('express');
const app = express();
const PORT = 3001;

const Web3jService = require('./NFT.js');

app.get("/api", async (req, res) => {
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


// 启动 Express 服务器
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
