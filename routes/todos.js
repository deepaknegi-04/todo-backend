const express = require("express");
const router = express();

const authMiddleware = require("../middleware/authMiddleware");
const { todoSchema } = require("../types");
const { Todo, User } = require("../db/index")


router.post("/create", authMiddleware, async (req, res) => {
    const username = req.user.username;
    console.log(req.user);

    const parsedInputs = todoSchema.safeParse(req.body);

    if (!parsedInputs.success) {
        return res.status(411).json({
            msg: "invalid inputs!"
        })
    }

    const { title, description } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    const todo = await Todo.create({
        title,
        description,
        userId: req.user.userId,
        completed: false
    })

    user.todos.push(todo._id);
    await user.save();
    res.status(201).json({
        msg: "Todo created successfully",
        todo,
    });

})


router.get("/getTodos", authMiddleware, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.userId });
        res.json({ todos });
    } catch (e) {
        res.status(500).json({ msg: "Error fetching todos" });
    }

})


router.put("/update:id", authMiddleware, async (req, res) => {

    const { title, description, completed } = req.body;
    const todoId = req.params.id;
    try {
        const updated = await Todo.findOneAndUpdate(
            { _id: todoId, userId: req.user.userId },
            { title, description, completed },
            { new: true }
        )
        res.json({ msg: "todo updated", updated });
    } catch (error) {
        res.status(500).json({ msg: "Failed to update todo" });
    }
})

router.delete("/delete/:id", authMiddleware, async (req, res) => {
    const todoId = req.params.id;

    try {
        const deleteTodo = await Todo.findOneAndDelete({
            _id: todoId,
            userId: req.user.userId
        })
        if(!deleteTodo){
            return res.status(404).json({msg:"Todo not found or"})
        }

        // todo removal from the user table
        await User.findByIdAndUpdate(req.user.userId,{
            $pull:{
                todos:todoId
            }
        })
        res.status(200).json({
            msg:"Todo deleted successfully",
            todo:deleteTodo
        })
    } catch (error) {
        res.status(500).json({msg:"failed to delete todo"});
    }

})
module.exports = router;