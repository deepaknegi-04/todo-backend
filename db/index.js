const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.DATABASE_URL;
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

connectDB();

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }]
}, { timestamps: true });

// Todo Schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  completed: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Todo,
  User
};
