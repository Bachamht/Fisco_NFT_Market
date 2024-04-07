import React, { useState } from 'react';
//import './Create.css'; // 确保导入了样式文件
import '../styles/Create.css';
const Create = () => {
  const [author, setAuthor] = useState('');
  const [workTitle, setWorkTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 在这里添加上传逻辑，例如调用API上传图片和信息
    console.log('上传作品:', author, workTitle, description, imageFile);
  };

  return (
    <div className="upload-form-container">
      <header>
        <h1>作品上传</h1>
      </header>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
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
        <button type="submit">上传作品</button>
      </form>
    </div>
  );
};

export default Create;