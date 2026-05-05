import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold mb-6">Task Manager</h2>

        <nav className="space-y-3">
          <Link to="/dashboard" className="block hover:text-blue-500">
            Dashboard
          </Link>
          <Link to="/projects" className="block hover:text-blue-500">
            Projects
          </Link>
          <Link to="/tasks" className="block hover:text-blue-500">
            Tasks
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default Layout;