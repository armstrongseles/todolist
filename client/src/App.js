import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import "./App.css" 
 
function App() { 
  const [tasks, setTasks] = useState([]); 
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState(''); 
 
  // Fetch tasks from the API 
  useEffect(() => { 
    axios.get('http://localhost:8000/todo') 
      .then(response => { 
        setTasks(response.data); 
      }) 
      .catch(error => { 
        console.error('Error fetching tasks:', error); 
      }); 
  }, []); 
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (!title.trim() || !description.trim()) return; 
 
    // Call API to insert task 
    axios.post('http://localhost:8000/insert', { title, description }) 
      .then(response => { 
        setTasks([...tasks, response.data]); 
        setTitle(''); 
        setDescription(''); 
      }) 
      .catch(error => { 
        console.error('Error inserting task:', error); 
      }); 
  }; 
 
  const handleDelete = (id) => { 
    // Call API to delete task 
     
    axios.delete(`http://localhost:8000/delete/${id}`) 
      .then(() => { 
        setTasks(tasks.filter(task => task.id !== id)); 
      }) 
      .catch(error => { 
        console.error('Error deleting task:', error); 
      }); 
  }; 
  return ( 
    <div> 
      <h1>Todo list</h1> 
      <form onSubmit={handleSubmit}> 
        <label> 
          Title: 
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          /> 
        </label> 
        <br /> 
        <label> 
          Description: 
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          /> 
        </label> 
        <br /> 
        <button type="submit">Add Task</button> 
      </form> 
 
      <h2>Task List</h2> 
      <table> 
        <thead> 
          <tr> 
            <th>Title</th> 
            <th>Description</th> 
            <th>Action</th> 
          </tr> 
        </thead> 
        <tbody> 
          {tasks.map(task => ( 
            <tr key={task.id}> 
              <td>{task.title}</td> 
              <td>{task.description}</td> 
              <td> 
                <button onClick={() => handleDelete(task.id)}>Delete</button> 
              </td> 
            </tr> 
          ))} 
        </tbody> 
      </table> 
    </div> 
  ); 
} 
export default App;