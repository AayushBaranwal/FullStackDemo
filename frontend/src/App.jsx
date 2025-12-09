import { useEffect, useState } from "react";
import { fetchTasks, addTask, deleteTask } from "./api/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await fetchTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }
    try {
      await addTask(title.trim());
      setTitle("");
      loadTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h1>Task List</h1>

      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "70%", padding: "6px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "6px 12px" }}>
          Add
        </button>
      </form>

      {loading && <p>Loading tasks...</p>}

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
                border: "1px solid #ddd",
                marginBottom: "6px",
                borderRadius: "4px",
              }}
            >
              <span>{task.title}</span>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
