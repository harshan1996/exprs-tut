const express=require("express")
const router=express.Router()
const {employeeDetails}=require("../../employee.js") // If you don't enclose it with {} every export comes as bundle
const uuid=require('uuid')

// GET All employees
router.get('/',(req,res)=>{
    // res.sendFile(path.join(__dirname,"public",'about.html'))})
    res.json(employeeDetails)})

// GET a single employee
router.get('/:id',(req,res)=>{
    const id=req.params.id

    const found=employeeDetails.some(employee=>employee.id===parseInt(id))
    if (found){

        res.json(employeeDetails.filter((employeeDetail)=>employeeDetail.id===parseInt(id)))
    }
    else{
        res.status(400).json({message:`Employee with the id of ${id} is not found`})
    }
})

// Add a new employee
router.post("/",(req,res)=>{
    const newEmployee={
        id:uuid.v4(),
        name:req.body.name,
        designation:req.body.designation
    }
    if(!newEmployee.name || !newEmployee.designation){
        return res.status(400).json({msg:"Please enter all the details"})
    }

    employeeDetails.push(newEmployee)

    return res.status(201).json({msg:"successfully added",employees:employeeDetails})
    // res.redirect("/index")
})

// Update the employee
router.put('/:id',(req,res)=>{
    const id=req.params.id
    const updateEmployee=req.body

    const found=employeeDetails.some(employee=>employee.id===parseInt(id))
    if (found){
        employeeDetails.map((employee)=>{
            if (employee.id===parseInt(id)){
                employee.name=updateEmployee.name
                employee.designation=updateEmployee.designation
            }
        })
        return res.status(200).json({msg:"successfully updated"})
        
    }
    else{
        res.status(400).json({message:`Employee with the id of ${id} is not found`})
    }
})

// Delete a single employee
router.delete('/:id',(req,res)=>{
    const id=req.params.id

    const found=employeeDetails.some(employee=>employee.id===parseInt(id))
    if (found){

        res.json({msg:"successfully deleted the employee","employees":employeeDetails.filter((employeeDetail)=>employeeDetail.id!==parseInt(id))})
    }
    else{
        res.status(400).json({message:`Employee with the id of ${id} is not found`})
    }
})

module.exports=router