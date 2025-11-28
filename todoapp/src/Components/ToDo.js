import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ApiServices from "./ApiServices";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    ApiServices.getall()
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      let data = {
        ToDoTitle: inputValue,
        isCompleted: false, // Default status is pending
      };

      ApiServices.AddToDo(data)
        .then(() => {
          getTodos();
          setInputValue("");
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
        });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].ToDoTitle);
    openModal();
  };

  const handleSaveEdit = () => {
    let data = {
      _id: todos[editIndex]._id,
      ToDoTitle: editValue,
      isCompleted: todos[editIndex].isCompleted,
    };
    if (editValue.trim() !== "") {
      ApiServices.EditToDo(data)
        .then(() => {
          getTodos();
          setEditIndex(null);
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
        });
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    closeModal();
  };

  const handleRemoveTodo = (id) => {
    ApiServices.DeleteTODo({ _id: id })
      .then(() => {
        getTodos();
      })
      .catch((error) => {
        console.error("Error removing todo:", error);
      });
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center">
                <div className="py-4">
                  <h2 className="text-center">To Do App</h2>
                </div>

                <div className="card col-lg-12 col-md-12">
                  <div className="card-body">
                    <div className="pt-2 pb-0">
                      <h5 className="card-title text-center pb-0 fs-1">
                        To Do List
                      </h5>
                      <p className="text-center small pb-2">
                        Add, edit, and delete your todos
                      </p>
                    </div>
                    <form className="mb-3">
                      <div className="mb-3">
                        <h3 htmlFor="todoInput" className="form-label">
                          Add Todo
                        </h3>
                        <div className="input-group">
                          <input
                            type="text"
                            name="todoInput"
                            className="form-control"
                            id="todoInput"
                            required=""
                            value={inputValue}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={handleAddTodo}
                        >
                          Add Todo
                        </button>
                      </div>
                    </form>
                    <ul className="list-group">
                      {todos &&
                        todos.map((todo, index) => (
                          <li
                            key={todo._id}
                            className={`list-group-item d-flex justify-content-between align-items-center ${
                              todo.isCompleted ? "list-group-item-success" : ""
                            }`}
                          >
                            <div>
                              <span
                                className={
                                  todo.isCompleted
                                    ? "text-decoration-line-through ms-2"
                                    : "ms-2"
                                }
                              >
                                {todo.ToDoTitle}
                              </span>
                            </div>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-warning me-2"
                                onClick={() => handleEditTodo(index)}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleRemoveTodo(todo._id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "480px",
            padding: "0",
            borderRadius: "10px",
            border: "none",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.45)",
          },
        }}
      >
        <div className="modal-content p-4 border-0">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="m-0 fw-semibold">Edit Todo</h4>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>

          {/* Body */}
          <div className="mb-4">
            <label className="form-label fw-medium mb-2">Todo Title</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Enter updated task title"
            />
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-light border px-4 py-2"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary px-4 py-2 fw-semibold"
              onClick={handleSaveEdit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default TodoList;
