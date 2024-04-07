import{useState} from "react";
import "./styles.css";

export default function App() {
  const [items, setItems] = useState("hello");
  const[todos,setTodos] =useState([]);

  function handleSubmit(e){
    e.preventDefault();  //防止默认刷新
    setTodos((current)=>{return [...current,{title:items,completed:false}]});
  }

  console.log(todos);  //打印

  return (
    <>
  <form onSubmit={handleSubmit} className="new-item-form">
    <div className="form-row">
      <label htmlFor="item">new item</label>
      <input type="text" id="item" value={items} onChange={(e)=>setItems(e.target.value)}/>
    </div>

    <button>Add</button>
  </form>

  <h1 className="header"> Todo List</h1>

  <ul className="list">
    {todos.map(todo=> (
    <li>
      <label >
        <input type="checkbox" />  {todo.title}
      </label>

      <button className="btn btn-danger">Delete</button>
    </li>
    ))}
    
  </ul>
  </>

  );
}