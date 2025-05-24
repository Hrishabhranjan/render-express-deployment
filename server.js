
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { name } = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todo", {
  
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Define Schema
const trySchema = new mongoose.Schema({
    name: String
});

// Create Model
 const Item = mongoose.model("Item", trySchema);

// Create an item
const todo = new Item({
    name: "Create some videos"
});
 todo.save();

const todo2 = new Item({
  name:"Learn DSA"

});
const todo3 = new Item({
  name:"Learn React"

});
const todo4 = new Item({
  name:"Take some Rest"

});
todo2.save();
todo3.save();
todo4.save();

app.get("/", async function (req, res) {

  const data = await Item.find({});
  res.render("list",{dayej : data});
  
    });
    app.post("/",function(req,res){
      const ItemName = req.body.newItem;
      const todo4 = new Item({
        name:ItemName

      });
      todo4.save();
      res.redirect("/");
    });
    
    app.post("/deleted",async function(req,res) {
      const checkedItemId = req.body.checkbox;
      try {
        await Item.findByIdAndDelete(checkedItemId);
        console.log("Item Deleted Successfully");
        res.redirect("/");
      } catch (err) {
        console.log(err);
        res.redirect("/");
      }
    });

        
    
app.listen(8000, function () {
    console.log("Server started on port 8000");
});
