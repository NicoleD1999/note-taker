const express = require('express');
const path = require('path');
const app = express();
const util = require('util');
const fs = require('fs');

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.listen(PORT, ()=> console.log(`Listening on PORT: http://localhost:${PORT}`));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname,'/public/notes.html'))
});

app.get('/api/notes', (req, res)=>{
    console.info(`${req.method} request received for adding note`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res)=>{
    console.log(`${req.method} request received to save a note`)
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
          title,
          text,
        };
    
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
      } else {
        res.error('Error in adding Note');
      }
});