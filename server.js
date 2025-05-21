const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let items = [];

app.get('/', (req, res) => {
  res.render('list', { items });
});

/*app.post('/', (req, res) => {
  const newItem = req.body.newItem;
  items.push(newItem);
  res.redirect('/');
});?*/
app.post("/", function(req, res){
  let newItem = req.body.newItem?.trim();

  // Validate empty input
  if (!newItem) {
    return res.send("Error: Cannot submit empty task. Please go back and enter a valid item.");
  }

  items.push(newItem);
  res.redirect("/");
});



app.listen(8000,function(){
    console.log("server started");
});