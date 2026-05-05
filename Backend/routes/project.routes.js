import express from "express";
import protect from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/role.middleware.js";
import {
  createProject,
  getProjects,
  addMember,
  deleteProject,
} from "../controllers/project.controller.js";

const router = express.Router();

// Create project (Admin)
router.post("/", protect, isAdmin, createProject);

// Get projects
router.get("/", protect, getProjects);

// Add member (Admin)
router.put("/:id/add-member", protect, isAdmin, addMember);

// Delete project (Admin)
router.delete("/:id", protect, isAdmin, deleteProject);

export default router;