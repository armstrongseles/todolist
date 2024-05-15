const express = require('express'); 
const mysql = require('mysql'); 
const bodyParser =require('body-parser') 
const cors = require('cors'); 
const app = express(); 
const PORT = process.env.PORT || 8000; 
app.use(bodyParser.json()); 
app.use(cors()); 
// MySQL Connection 
const connection = mysql.createConnection({ 
host: 'localhost',  
user: 'root', 
  password: '', 
  database: 'hall' 
}); 
 
connection.connect((err) => { 
  if (err) { 
    console.error('Error connecting to MySQL database:', err); 
    return; 
  } 
  console.log('Connected to MySQL database'); 
}); 
 
// Route to get todo list from the database 
app.get('/todo', (req, res) => { 
  const query = 'SELECT * FROM todolist'; 
  connection.query(query, (err, rows) => { 
    if (err) { 
      console.error('Error executing MySQL query:', err); 
      res.status(500).json({ error: 'Error retrieving data from database' }); 
      return; 
    } 
    res.json(rows); 
  }); 
}); 
app.post('/insert', (req, res) => { 
    const { title,description } =req.body; 
    console.log(req.body); 
    const query = `INSERT INTO todolist (title,description) VALUES ('${title}','${description}')`; 
    connection.query(query, (err, result) => { 
      if (err) { 
        console.error('Error executing MySQL query:', err); 
        res.status(500).json({ error: 'Error inserting data into database' }); 
        return; 
      } 
      res.status(201).json({ message: 'Task inserted successfully', id: result.insertId }); 
    }); 
  }); 
  app.delete('/delete/:id', (req, res) => { 
    const id = req.params.id; // Access the 'id' parameter correctly 
    console.log({ id }); 
    const query = 'DELETE FROM todolist WHERE id = ?'; 
    connection.query(query, [id], (err, result) => { 
        if (err) { 
            console.error('Error executing MySQL query:', err); 
            res.status(500).json({ error: 'Error deleting data from database' }); 
            return; 
        } 
        if (result.affectedRows === 0) { 
            res.status(404).json({ error: 'Task not found' }); 
            return; 
        } 
        res.json({ message: 'Task deleted successfully' }); 
    }); 
}); 
 
 
// Start the server 
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`); 
});