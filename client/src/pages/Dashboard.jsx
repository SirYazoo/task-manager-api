import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState("");

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

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!newTaskTitle.trim()) return;

    try {
      const response = await api.post("/tasks", { title: newTaskTitle });
      setTasks([response.data, ...tasks]);
      setNewTaskTitle("");
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Failed to create task. Check the console.");
    }
  };

  const handleToggleTask = async (id, currentStatus) => {
    const newStatusString =
      currentStatus === "completed" ? "pending" : "completed";

    try {
      const response = await api.put(`/tasks/${id}`, {
        status: newStatusString,
      });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error(
        "Failed to update task. Full eror:",
        error.response?.data || error,
      );
      alert("Failed to update task status. Check the console.");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!globalThis.confirm("Are you sure you want to delete this task?"))
      return;

    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task. Check the console.");
    }
  };

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
            className="flex justify-between items-center bg-gray-700 rounded p-4 border border-gray-600 group"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => handleToggleTask(task.id, task.is_completed)}
                className="w-5 h-5 cursor-pointer accent-blue-500"
              />
              <span
                className={
                  task.status === "completed"
                    ? "line-through text-gray-500 transition-all"
                    : "text-gray-100 transition-all"
                }
              >
                {task.title}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-gray-500 hover:text-red-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200"
              title="Delete task"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
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
          <form onSubmit={handleCreateTask} className="mb-6 flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              maxLength="255"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold transition duration-200"
            >
              Add Task
            </button>
          </form>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
