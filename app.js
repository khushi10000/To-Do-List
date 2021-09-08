const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});
const app= express();
var addtasks=[];
var addtask="";
var worktasks=[];

const itemSchema = {
name : String
};
const Item = mongoose.model("item", itemSchema)

const bodyparser= require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
//let ejs = require('ejs');
// const ejs= require("ejs");
app.set('view engine', 'ejs');
app.use(express.static("public"));



app.get("/",function(request,response){
    // var today= new Date();
    // var currentDay= today.getDay;
    var today = new Date();
    // var currentDay = today.getDay();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var day=today.toLocaleDateString("en-US", options);

    
  
    response.render("List",{
        ListTitle:day,item:addtasks}
    );
   
    

    
});
app.post("/",function(req,res){
    console.log(req.body);
    addtask= req.body.additionaltask;
    if(req.body.add_button=="Work"){
        worktasks.push(addtask);
        res.redirect("/work");

    }else{
        addtasks.push(addtask);
    res.redirect("/");
    }

    });
    
    
app.get("/work",function(request,response){
    response.render("List",{
        ListTitle:"Work List",item:worktasks
    })

});
// app.post("/work",function(req,res){
//     // addtask=req.body.additionaltask;
   
// })


app.listen(3000,function(){
    console.log("Server is ported from 3000");
})
