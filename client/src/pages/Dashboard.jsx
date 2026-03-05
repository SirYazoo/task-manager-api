import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <p className="text-gray-400 text-center py-10">Loading your tasks...</p>
      );
    }

    if (tasks.length === 0) {
      return (
        <p className="text-gray-400 text-center py-10">
          No tasks found. Create one above!
        </p>
      );
    }

    return (
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-700 rounded p-4 border border-gray-600"
          >
            <span
              className={
                task.is_completed
                  ? "line-through text-gray-500"
                  : "text-gray-100"
              }
            >
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
          <h1 className="text-2xl font-bold">Task Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">
              Welcome,{" "}
              <span className="text-blue-400 font-semibold">
                {user?.username || "User"}
              </span>
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-bold transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Your Tasks
          </h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
