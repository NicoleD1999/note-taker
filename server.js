const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.listen(PORT, ()=> console.log(`Listening on PORT: ${PORT}`));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname,'/public/notes.html'))
});

app.get('api/notes', (req, res)=>{

});

app.post('api.notes', (req, res)=>{

});