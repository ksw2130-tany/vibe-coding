const express = require("express");
const mongoose = require("mongoose");
const Todo = require("../models/Todo");

const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "유효하지 않은 할일 ID입니다." });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "할일을 찾을 수 없습니다." });
    }

    return res.status(200).json({ message: "할일이 삭제되었습니다." });
  } catch (error) {
    return res.status(500).json({ message: "할일 삭제 실패" });
  }
});

module.exports = router;
