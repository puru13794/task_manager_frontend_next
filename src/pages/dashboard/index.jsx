import { useAuth } from "../../../context/AuthContext";
import Tasks from "../../../components/tasks";
import Modal from "react-bootstrap/Modal";
// import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Confirmation from "../../../components/confirmation";
import { getAuthToken, removeAuthToken } from "../../../utils/authUtils";
import NavHoc from "../../../components/navhoc";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [deleteModal, setDeletemodal] = useState(false);
  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    description: "",
    status: "todo",
  });
  const router = useRouter();
  const auth = useAuth();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddTask = () => {
    const authToken = getAuthToken("auth_token");
    if (edit) {
      axios
        .patch(
          `${process.env.base_url}/task/${newTask.id}`,
          {
            task: { ...newTask },
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        )
        .then((response) => {
          console.log("response", response);
          if (response.status === 200 && response.data?.code == 200) {
            toast.success("Task updated sucessfully");
          } else {
            toast.error("task updation failed");
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data);
        })
        .finally(() => {
          setShowModal(false);
          setEdit(false);
          fetchData();
          setNewTask({
            id: "",
            title: "",
            description: "",
            status: "todo",
          });
        });
    } else {
      axios
        .post(
          `${process.env.base_url}/task/create`,
          {
            task: { ...newTask },
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        )
        .then((response) => {
          console.log("response", response);
          if (response.status === 200 && response.data?.code == 200) {
            toast.success("Task added sucessfully");
          } else {
            toast.error("task addition failed");
          }
        })
        .catch((error) => {
            // console.log('error', error)
          toast.error( error?.response?.data?.error );
        })
        .finally(() => {
          setShowModal(false);
          fetchData();
          setNewTask({
            id: "",
            title: "",
            description: "",
            status: "todo",
          });
        });
    }
  };

  const handleEdit = (task) => {
    setEdit(true);
    setNewTask({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setShowModal(true);
  };

  const handleDelete = (task) => {
    setNewTask({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setDeletemodal(true);
  };

  const deleteTask = (task) => {
    // console.log("task", task);
    const authToken = getAuthToken("auth_token");
    console.log("authToken", authToken);
    axios
      .delete(`${process.env.base_url}/task/${task.id}`, {
        headers: {
          Authorization: authToken,
        },
      })
      .then((response) => {
        console.log("response", response);
        if (response.status === 200 && response.data?.code == 200) {
          toast.success("Task deleted sucessfully");
        } else {
          toast.error("task deletion failed");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data);
      })
      .finally(() => {
        setDeletemodal(false);
        fetchData();
        setNewTask({
          id: "",
          title: "",
          description: "",
          status: "todo",
        });
      });
  };

  const fetchData = async (filter_by = "all") => {
    const authToken = getAuthToken("auth_token");
    //   console.log("authToken", authToken);
    if (authToken) {
      // console.log("customKey", process.env.customKey);
      // const response = await
      axios
        .get(`${process.env.base_url}/tasks?filter=${filter_by}`, {
          headers: {
            Authorization: authToken,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            console.log("data", response.data);
            setTasks(response.data.data);
          } else {
            removeAuthToken("auth_token");
            router.push("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          // toast.error(error?.response?.data);
          // router.push("/login");
        });
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);
  return (
    <>
      <Toaster />
      <NavHoc>
        <Modal show={showModal} onHide={setShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Task Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Task Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Task Status
                </label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={newTask.status}
                  onChange={handleInputChange}
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddTask}
              >
                {edit ? "Edit task" : "Add Task"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
        <Confirmation
          handleDelete={handleDelete}
          task={newTask}
          show={deleteModal}
          setShow={setDeletemodal}
          deleteTask={deleteTask}
        />
        <Tasks
          tasks={tasks}
          showModal={showModal}
          setShowModal={setShowModal}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          filter={filter}
          setFilter={setFilter}
          fetchData={fetchData}
        />
      </NavHoc>
    </>
  );
};

export default dashboard;
