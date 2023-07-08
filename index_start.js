const express=require("express")
const app=express()

// GET All employees
app.get('/api/employees',(req,res)=>{
    // res.sendFile(path.join(__dirname,"public",'about.html'))})
    res.json(employeeDetails)})

// GET a single employee

app.get('/api/employees/:id',(req,res)=>{
    const id=req.params.id

    const found=employeeDetails.some(employee=>employee.id===parseInt(id))
    if (found){

        res.json(employeeDetails.filter((employeeDetail)=>employeeDetail.id===parseInt(id)))
    }
    else{
        res.status(400).json({message:`Employee with the id of ${id} is not found`})
    }
})