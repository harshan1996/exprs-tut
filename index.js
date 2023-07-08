const express=require("express")
const path=require('path')
const {employeeDetails}=require("./employee.js") // If you don't enclose it with {} every export comes as bundle
const exphbs=require('express-handlebars')
const {logger}=require('./middleware/logger');

const app=express()

// init middleware
// Whenever we hit any API it gives the time and URI as we have set it that way.
app.use(logger)


// set static folder
// use is the method we define when we want to include the middleware.
app.use(express.static(path.join(__dirname,"public")))

// Handlebars middleware
// Representation-I
app.engine('hbs', exphbs.engine({defaultLayout:'main',extname:".hbs"}));
app.set('view engine', 'hbs');

// Representation-II for the filename .handlebars
// app.engine('handlebars', exphbs.engine({defaultLayout:'main'}));
// app.set('view engine', 'handlebars');

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/index', (req, res)=> {
    res.render('index',{title:"Employees Application",employeeDetails});
});

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public",'index.html'))
})

// Employees API routes
app.use("/api/employees",require("./routes/api/employees.js"))



const PORT=process.env.PORT ||5010

app.listen(PORT,console.log(`server running on port ${PORT}`))