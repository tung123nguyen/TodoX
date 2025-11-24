import Task from "../models/Task.js";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: "desc" });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Loi he thong" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log("Loi khi goi createTask", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true }
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Nhiem vu khong ton tai" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Loi khi goi updateTask", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ message: "Nhiem vu khong ton tai" });
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    console.log("Loi khi goi deleteTask", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

export { getAllTasks, createTask, updateTask, deleteTask };
