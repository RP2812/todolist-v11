import express from "express";
import bodyParser from "body-parser";
import path from "path";
// import { getDay, getDate } from "./date.js";
import mongoose from "mongoose";
import { Console } from "console";


const app = express();

const __dirname = path.resolve();
let workitems = [];
const PORT = process.env.PORT || 5001

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



// let items = ["Buy Food","Cook Food","Eat Food"];
    app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("Public"));
let URI = "mongodb+srv://rp:Rp2812@rpdb.ir2vbdv.mongodb.net/RUDRALIST";
// mongoose.connect("mongodb://127.0.0.1:27017/todolist");
mongoose.connect(URI).then(()=>console.log("Succesfully connected"))
.catch((err) => console.log(`Error connecting to database ${err}`));
const itemSchema = {
    name:String
}
const Item = mongoose.model("Item",itemSchema);
const item1 = new Item({
    name:"welcome to your todo list"
});
const item2 = new Item({
    name:"hit + to add"
});

const item3 = new Item({
    name:"hit delete to delete"
});
const defalutarray= [item1,item2,item3];

app.get("/", async function (req, res) {
    try {
        const foundItems = await Item.find({});
        if(foundItems.length===0)
        {
            Item.insertMany(defalutarray)
            .then(() => {
             console.log("Successfully saved to the database");
        })
            .catch((err) => {
            console.log("Error:", err);
        });
            res.redirect("/"); 
        }
        else{
            res.render("list", { listTitle: "Today", newListItem: foundItems });
        }
       
    } catch (err) {
        console.log(foundItems);
        console.log("Error:", err);
    }
});
app.post("/", function(req,res){
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workitems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work",function(req,res){
    res.render("list", { listTitle: "Work List",newListItem: workitems});
});

app.get("/about",function(req,res){
    res.render("about");
});

let port = process.env.PORT;
if (port==null||port=="") {
    port = 3000;
}
app.listen(port, function () {
    console.log("server is started on port 3000")
});