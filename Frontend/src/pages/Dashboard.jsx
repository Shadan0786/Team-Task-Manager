import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    overdue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/tasks/dashboard");
        setStats(data);
      } catch (err) {
        console.log(err);
        alert("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg">
            <h3 className="text-gray-600">Total Tasks</h3>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>

          <div className="bg-green-100 p-5 rounded-xl shadow">
            <h3 className="text-gray-700">Completed</h3>
            <p className="text-3xl font-bold text-green-700">
              {stats.completed}
            </p>
          </div>

          <div className="bg-red-100 p-5 rounded-xl shadow">
            <h3 className="text-gray-700">Overdue</h3>
            <p className="text-3xl font-bold text-red-700">
              {stats.overdue}
            </p>
          </div>

        </div>
      )}
    </Layout>
  );
};

export default Dashboard;