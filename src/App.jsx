import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const serverURL = 'http://localhost:5000';
const api = axios.create({ baseURL: serverURL });

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [refres, setrefres] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Processing' });
  console.log(tasks)
  useEffect(() => {
    fetchTasks();
  }, [refres]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    try {
      await api.post('/api/tasks', newTask);
      Swal.fire(
        'Add!',
        'Your file has been Add.',
        'success'
      )
      setrefres(!refres)
    } catch (error) {
      console.error(error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await api.put(`/api/tasks/${taskId}`, { status });
      setTasks(tasks.map(task => (task._id === taskId ? { ...task, status } : task)));
      Swal.fire(
        'Updat!',
        'Your taks has been updat.',
        'success'
      )
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/api/tasks/${taskId}`);
          setTasks(tasks.filter(task => task._id !== taskId));

          Swal.fire(
            'Deleted!',
            'Your task has been deleted.',
            'success'
          )
        } catch (error) {
          console.error(error);
        }
      }
    })
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Task Management</h1>
      <div className="my-4">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border border-gray-400 rounded px-4 py-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="border border-gray-400 rounded px-4 py-2 mr-2"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className='font-bold'>
              <th>#</th>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Status</th>
              <th>Status Updat</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id}>
                <th>1</th>
                <td className='font-semibold'>{task.title}</td>
                <td>{task.description}</td>
                <td className={`inline-block rounded px-2 py-1 mt-2 ${task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-500 text-gray-100'}`}>{task.status}</td>
                <td><button onClick={() => updateTaskStatus(task._id, 'completed')} className="bg-green-500 text-white px-4 py-2 rounded mx-2">Complete</button></td>
                <td><button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
