import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

// ✅ CREATE PROJECT (Admin)
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await Project.create({
      name,
      description,
      members: [req.user._id], // keep this
      createdBy: req.user._id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET PROJECTS
export const getProjects = async (req, res) => {
  const projects = await Project.find();
  try {
    let projects;

    if (req.user.role === "admin") {
      projects = await Project.find()
        .populate("members", "name email")
        .populate("createdBy", "name email");
    } else {
      projects = await Project.find({
        // members: req.user._id
        members: { $in: [req.user._id] },
      })
        .populate("members", "name email")
        .populate("createdBy", "name email");
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADD MEMBER (Admin)
export const addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Prevent duplicate members


    if (
      !project.members.some(
        (m) => m.toString() === userId.toString()
      )
    ) {
      project.members.push(new mongoose.Types.ObjectId(userId));
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE PROJECT (Admin)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};