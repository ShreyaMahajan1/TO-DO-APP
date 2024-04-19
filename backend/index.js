const express = require("express")
const app = express()
const cors = require('cors');
const port = 4002
const config = require("./config/db")
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:'40mb'}))

const routes = require("./routes/apiRoutes")
app.use("/api",routes)



app.all("**",(req,res)=>{
    res.json({
        status:404,
        success:false,
        message : "Route not found"
    })
})

app.listen(port,()=>{
    console.log("Server running at port ",port)
})

