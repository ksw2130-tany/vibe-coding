const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "할일 내용을 입력해주세요." });
    }

    const todo = await Todo.create({ content: content.trim() });
    return res.status(201).json(todo);
  } catch (error) {
    return res.status(500).json({ message: "할일 저장 실패" });
  }
});

module.exports = router;
