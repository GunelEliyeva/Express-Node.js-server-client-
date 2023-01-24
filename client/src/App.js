import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import AddUser from "./components/adduser";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      let response = await axios.get("http://localhost:8080/users/");
      setLoading(false);
      setUsers(await response.data);
    } catch (error) {
    
      console.log(error);
    }
  };

  const handleDelete=(id)=>{
    axios.delete(`http://localhost:8080/users/${id}`).then(()=>getUsers())
  }

  return (
    <div className="App">
      {loading ? (
        "Loading...."
      ) : (
        <>
        <AddUser users={users} setUsers={setUsers}/>
        <ul>

          {users.map((q) => (
            <li><p>{q.name}</p><p>{q.username}</p>
            <button onClick={()=>handleDelete(q.id)}>Delete</button></li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
}

export default App;
