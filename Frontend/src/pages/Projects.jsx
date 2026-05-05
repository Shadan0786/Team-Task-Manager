import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";

const Projects = () => {
  const { user } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [memberInputs, setMemberInputs] = useState({}); // projectId -> userId

  const fetchProjects = async () => {
    const { data } = await API.get("/projects");
    setProjects(data);
  };

  const createProject = async () => {
    if (!name) return alert("Enter project name");

    await API.post("/projects", { name });
    setName("");
    fetchProjects();
  };

  const deleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;

    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  // ✅ Assign Member
  const assignMember = async (projectId) => {
    const userId = memberInputs[projectId];

    if (!userId) return alert("Enter user ID");

    try {
      await API.put(`/projects/${projectId}/add-member`, { userId });
      alert("Member added!");
      setMemberInputs({ ...memberInputs, [projectId]: "" });
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add member");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      {/* Create Project (Admin only) */}
      {user?.role === "admin" && (
        <div className="flex gap-2 mb-6">
          <input
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
          />
          <button
            onClick={createProject}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Create
          </button>
        </div>
      )}

      {/* Project List */}
      {projects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{p.name}</p>

              {/* Members */}
              <div className="text-sm text-gray-500 mt-1">
                Members:{" "}
                {p.members?.map((m) => m.name).join(", ") || "None"}
              </div>

              {/* Admin Controls */}
              {user?.role === "admin" && (
                <>
                  {/* Assign Member */}
                  <div className="flex gap-2 mt-3">
                    <input
                      className="border p-1 rounded w-full"
                      placeholder="Enter user ID"
                      value={memberInputs[p._id] || ""}
                      onChange={(e) =>
                        setMemberInputs({
                          ...memberInputs,
                          [p._id]: e.target.value,
                        })
                      }
                    />
                    <button
                      className="bg-green-500 text-white px-2 rounded"
                      onClick={() => assignMember(p._id)}
                    >
                      Add
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mt-3"
                    onClick={() => deleteProject(p._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Projects;