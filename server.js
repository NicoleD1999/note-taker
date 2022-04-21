const express = require('express');
const path = require('path');
const fs = require('fs');
var uuidv1 = require('uuidv1');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));





app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname,'/public/notes.html'))
});

app.get('/api/notes', (req, res)=>{
  const getNote = fs.readFileSync(path.join(__dirname, '/db/db.json'), "utf-8");
  const parseNote = JSON.parse(getNote);
  res.json(parseNote);
  console.info(`${req.method} request received for adding note`);
});

app.post('/api/notes', (req, res)=>{
  const saveNote = fs.readFileSync(path.join(__dirname, '/db/db.json'), "utf-8");
  const parseNote = JSON.parse(saveNote);
  req.body.id = uuidv1();
  parseNote.push(req.body)

  fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(parseNote), "utf-8");
  res.json();
  console.log(`${req.method} request received to save a note`);
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, ()=> console.log(`Listening on PORT: http://localhost:${PORT}`));