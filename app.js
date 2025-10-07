import express from "express"
import usersRoutes from "./routes/usersRoutes.js"
import postsRoutes from "./routes/postsRoutes.js"

const PORT = 3000

const app =express()
app.use(express.json())

app.use("/posts", postsRoutes)
app.use("/users", usersRoutes)

app.get("/", (req,res)=>{

})


app.post("/", (req,res)=>{

})


app.delete("/", (req,res)=>{

})

app.listen(PORT, () =>{
    console.log(PORT)
})