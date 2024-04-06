## 						智能合约技术文档

三个核心合约承担项目功能：

NFT.sol

Points.sol

NFTMarket.sol

#### NFT.sol

完成对数字藏品的标准化设计

**对外接口：**

```solidity
//功能描述：返回该藏品拥有者地址
//调用权限：任意地址
function ownerOf(uint256 tokenId) 

//功能描述：返回地址拥有藏品数量
//调用权限：任意地址
function balanceOf(address owner) 

//功能描述：返回藏品的uri地址
//调用权限：任意地址
function tokenURI(uint256 tokenId) 

//功能描述：向某个地址mint一个藏品
//调用权限：仅管理员
function mint(address to, string memory tokenURI) 

//功能描述：将藏品从一个地址转移到另一个地址
//调用权限：仅市场地址
function transferFrom(address from, address to, uint256 tokenId) 

//功能描述：设置市场地址
//调用权限：仅管理员
function setMarket(address _market)

```



#### Points.sol

完成平台的积分系统设计

**对外接口：**

```solidity
//功能描述：充值交易积分
//调用权限：仅管理员
function rechargeTPoints(address _to, uint256 _amount)
 
 
//功能描述：分配奖励积分
//调用权限：仅管理员
function allocateRPoints(address _to, uint256 _amount)


//功能描述：提现交易积分
//调用权限：仅管理员
function withdrawTPoints(address _to, uint256 _amount)
 
 
//功能描述：NFT卖家交易积分余额增加
//调用权限：仅市场地址
function addTPoints(address _to, uint256 _amount)


//功能描述：用户使用奖励积分
//调用权限：仅管理员
function withdrawRPoints(address _to, uint256 _amount)

//功能描述：设置市场地址
//调用权限：仅管理员
function setMarket(address _market)
```



#### NFTMarket.sol

完成NFT交易系统设计

特殊功能介绍：
**白名单购买NFT**是链下提前给一些用户资格签名，购买时只有验签通过才能进行购买。
适用于稀有NFT购买资格抽奖等场景（类似于摇号买房）

**持卖家签名购买NFT**是链下卖家对自己的NFT的出售情况（包含tokenid，定价price等）进行签名并发送给买家，买家拿此签名就可直接完成购买不需要交易市场上架该NFT。
适用于不公开上架的私人交易，并且交易市场保证交易的安全性。

**对外接口**：

```solidity
//功能描述：上架自己的NFT
//调用权限：NFT持有者
function sellNFTs(uint256 tokenID, uint256 amount) 

//功能描述：下架NFT
//调用权限：NFT持有者
function removeNFT(uint tokenID)

//功能描述：用户购买NFT
//调用权限：任意地址
function buyNFT(uint256 tokenID)

//功能描述：查询NFT价格
//调用权限：任意地址
 function viewPrice(uint256 tokenID)

//功能描述：查询NFT主人
//调用权限：任意地址
function viewOwner(uint256 tokenID)

//功能描述：白名单购买NFT
//调用权限：任意地址
function WhitelistBuy(uint256 tokenID, bytes memory _signature)

//功能描述：持有签名购买
//调用权限：任意地址
function buyWithSignature(uint256 tokenID, uint amount,  bytes memory _signature)

//功能描述：设置手续费比率
//调用权限：仅管理员
function setFee(uint16 _fee) 

```

