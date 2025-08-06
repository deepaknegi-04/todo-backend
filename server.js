const express = require("express");
const app = express();
const cors = require('cors');
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todos");

app.use(cors())
app.use(express.json());

// routes
app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.get('/', (req, res) => {
    res.send("Todo backend running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
