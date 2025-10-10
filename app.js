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
        req.status(404).json({ message: "Usre notfound" })
    }
})

app.put("/users/:id", (req, res) => {

})


app.delete("/users/:id", (req, res) => {

})

app.listen(PORT, () => {
    console.log(PORT)
})