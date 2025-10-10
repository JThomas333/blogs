import express from "express"
import usersRoutes from "./routes/usersRoutes.js"
import postsRoutes from "./routes/postsRoutes.js"

const PORT = 3000

const app = express()
app.use(express.json())

app.use("/posts", postsRoutes)
app.use("/users", usersRoutes)

app.get("/users", (req, res) => {
    res.status(200).json(user);
})


app.post("/users", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(404).json({ message: "Usre notfound" })
    }
    res.status(201).json("Success")
})

app.put("/users/:id", (req, res) => {

    const id = req.params.id;
    if (!id) {
        res.status(400).json({message: "User not found"})
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(404).json({ message: "Usre notfound" })
    }
    res.status(201).json("Success")

})


app.delete("/users/:id", (req, res) => {

})

app.listen(PORT, () => {
    console.log(PORT)
})