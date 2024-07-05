const express = require("express"); // access express
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

//error handle

db.connect((err) =>{
    if(err){
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database");
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql,(err,data) => {
        if(err) return res.status(500).json({error: "Error retrieving student", details: err}); //Changed Nimesh .status(500)  {error: "Error retrieving students", details: err}
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (Name, Email) VALUES (?, ?)"; // changed "?" Nimesh
    const values = [
        req.body.name,
        req.body.email
    ];
    
    db.query(sql, values, (err, data) =>{
        if(err) return res.status(500).json({ error: "Error creating student", details: err });  //Changed Nimesh .status(500)  {error: "Error retrieving students", details: err}
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET Name = ?, Email = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email
    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) =>{
        if(err) return res.status(500).json({ error: "Error creating student", details: err });  //Changed Nimesh .status(500)  {error: "Error retrieving students", details: err}
        return res.json(data);
    })
})

app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) =>{
        if(err) return res.status(500).json({ error: "Error creating student", details: err });  //Changed Nimesh .status(500)  {error: "Error retrieving students", details: err}
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("Listening on port 8081");
})