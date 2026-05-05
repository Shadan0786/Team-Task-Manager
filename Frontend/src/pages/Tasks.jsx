import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch tasks");
    }
  };

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);

      if (data.length > 0) {
        setProjectId(data[0]._id);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  // Create Task
  const createTask = async () => {
    if (!title || !projectId) {
      return alert("Enter task & select project");
    }

    try {
      await API.post("/tasks", { title, projectId });
      setTitle("");
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create task");
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      alert("Failed to update task");
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;

    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>

      {/* Create Task */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          className="border p-2 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />

        {/* Project Dropdown */}
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-red-500">
            No projects available. Ask admin to add you.
          </p>
        ) : (
          <select
            className="border p-2 rounded"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={createTask}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((t) => (
            <div
              key={t._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{t.title}</p>
                <p className="text-sm text-gray-500">
                  {t.status} | {t.projectId?.name || "No Project"}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded"
                  onClick={() => updateStatus(t._id, "in-progress")}
                >
                  Start
                </button>

                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => updateStatus(t._id, "done")}
                >
                  Done
                </button>

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteTask(t._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Tasks;