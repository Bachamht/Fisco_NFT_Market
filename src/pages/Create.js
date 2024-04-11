import React, { useState } from 'react';
//import './Create.css'; // 确保导入了样式文件
import '../styles/Create.css';
import Header from "../components/Header";
import Button from "../components/base/Button";
import { useMobile } from "../hooks/isMobile";

const Create = () => {
  //const [submitResult, setsubmitResult] = useState(null);
  const [author, setAuthor] = useState('');
  const isMobile = useMobile();
  const [workTitle, setWorkTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreateSuccessModalVisible, setIsCreateModalVisible] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const handleCreateClick =  () => {
    if (author.trim() !== '' &&
        workTitle.trim() !== '' &&
        description.trim() !== '' &&
        imageFile !== null) {
      setIsCreateModalVisible(true);
    } else {
      // 可以在这里显示一个错误或者提示用户填写所有必填项
     // alert('请填写所有必填项');
    }

    //try {
      // 假设API端点是 'https://api.yourdomain.com/buyNFT&#39; 
      //const response =1;
      /* await fetch('https://api.yourdomain.com/buyNFT&#39;,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 如果API需要认证，可能还需要添加如下面的headers
          // 'Authorization': 'Bearer your_token'
        },
        body: JSON.stringify({
          tokenId: state.item.tokenId, // 假设你有一个tokenId字段
          // 可能还需要其他购买所需的信息，如用户地址等
        }),
      }   */;
  
      //if (response) {  //response.ok
        // 如果响应状态码在200-299之间，认为是成功的
        //const data = await response.json();

        // 假设服务器返回的对象中有一个success属性来表示购买是否成功
        //if (response) {
          //setsubmitResult("上传成功");
         // setIsCreateModalVisible(true);
        //} else {
          // 如果服务器返回的数据表明购买未成功
          //setsubmitResult("上传失败");
       // }
      //} 
      //else {
        // 如果响应状态码不在200-299之间，认为是失败的
        //setsubmitResult("上传失败，发生错误");
      //}
    //} catch (error) {
      // 如果请求失败（例如网络问题），捕获错误
      //setsubmitResult("上传失败，发生错误");
     // console.error('Error during submit:', error);
    //}
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleWorkTitleChange = (e) => {
    setWorkTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  //const handleSubmit = (e) => {
    //e.preventDefault();
    // 在这里添加上传逻辑，例如调用API上传图片和信息
    //console.log('上传作品:', author, workTitle, description, imageFile);
  //};
  const handleCloseModal = () => {
    setIsCreateModalVisible(false);
   // setsubmitResult(null);
  };
  const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px", // 弹窗的宽度
    maxWidth: "100%", // 确保在小屏幕上也能完全显示
    height: "auto", // 弹窗的高度，根据内容自适应
    backgroundColor: "white",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    zIndex: "10000",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // 阴影效果
    textAlign: "center", // 文字居中
  };
  const headerStyle = {
    margin: "-20px -20px 10px", // 与其他内容的间距
    padding: "10px 20px",
    backgroundColor: "#f0f0f0", // 标题栏背景色
    borderBottom: "1px solid #ccc", // 底部边框
    fontSize: "18px", // 标题字号
    fontWeight: "bold", // 字体加粗
    color: "#333", // 标题颜色
    textAlign: "left", // 文字居中
  };
  
  const buttonStyle = {
    position: "absolute", 
    right: "20px", // 按钮距离弹窗右边缘的距离
    bottom: "20px", // 按钮距离弹窗下边缘的距离
    padding: "10px", // 按钮内边距
    margin: "10px 0 0", // 按钮与其他内容的间距
    border: "none", // 无边框
    backgroundColor: "#007bff", // 按钮背景色
    color: "white", // 文字颜色
    cursor: "pointer",
    borderRadius: "5px", // 圆角
    width: "100%", // 按钮宽度
    maxWidth: "100px", // 最大宽度
    textAlign: "center", // 文字居中
    display: 'block', // 使<button>成为一个块级元素
  };
  const bodyStyle = {
    margin: "0", // 内容区域不需要额外外边距
    padding: "10px 20px", // 内边距
    color: "#333", // 文字颜色
    fontSize: "16px", // 字号
    display: 'block',
    textAlign: "left", // 文字居中
  };

  return (
    
    <div className="upload-form-container">
      <Header />
      <form className="upload-form" >
        <div className="form-group">
          <header>
        <h1>作品上传</h1>
      </header>
      <br/>
          <label htmlFor="author">作者名:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={handleAuthorChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="work-title">作品名:</label>
          <input
            type="text"
            id="work-title"
            name="work-title"
            value={workTitle}
            onChange={handleWorkTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">作品介绍:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">上传图片:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>




        <button style={buttonStyle} onClick={handleCreateClick}>
           上传作品
         </button>

        {isCreateSuccessModalVisible && (
         <div style={modalStyle}>
         <div style={headerStyle}>
           提示
         </div>
         <div style={bodyStyle}>
           <p>上传成功</p>
         </div>
         <br/>
         <br/>
         <button style={buttonStyle} onClick={handleCloseModal}>
           确定
         </button>
       </div>
        )}

      </form>
    </div>
  );
};

export default Create;