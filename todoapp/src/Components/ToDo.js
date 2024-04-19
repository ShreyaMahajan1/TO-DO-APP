import React, { useState, useEffect } from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ApiServices from './ApiServices';
function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');


    

   
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            let data = {
                ToDoTitle: inputValue
            };

            ApiServices.AddToDo(data)
                .then(() => {
                    setInputValue('');
                   
                })
                .catch(error => {
                    console.error('Error adding todo:', error);
                });
        }
    };

    useEffect(() => {
        ApiServices.getall()
            .then(response => {
                setTodos(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
            })

     }, []);


    const handleRemoveTodo = () => {
        let data = {
            _id: todos[editIndex]._id
        };
        ApiServices.DeleteTODo(data)
            .then(() => {
               
            })
            .catch(error => {
                console.error('Error removing todo:', error);
            });
    };

    const handleEditTodo = (index) => {
        setEditIndex(index);
        setEditValue(todos[index].ToDoTitle);

    };

    const handleSaveEdit = () => {
        let data = {
            _id: todos[editIndex]._id,
            ToDoTitle:editValue
        };
        if (editValue.trim() !== '') {
            ApiServices.EditToDo(data)
                .then(() => {
                    setEditIndex(null);

                    
                })
                .catch(error => {
                    console.error('Error updating todo:', error);
                });
        }
    };

    const handleCancelEdit = () => {
        setEditIndex(null);

    };

    return (
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <div className="logo d-flex align-items-center w-auto">
                                        <span className="d-none d-md-block">To Do App</span>
                                    </div>
                                </div>


                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">To Do List</h5>
                                            <p className="text-center small">Add, edit, and delete your todos</p>
                                        </div>
                                        <form className="row g-3 needs-validation" noValidate="">
                                            <div className="col-12">
                                                <label htmlFor="todoInput" className="form-label">
                                                    Add Todo
                                                </label>
                                                <div className="input-group has-validation">
                                                    <input
                                                        type="text"
                                                        name="todoInput"
                                                        className="form-control"
                                                        id="todoInput"
                                                        required=""
                                                        value={inputValue}
                                                        onChange={handleInputChange}
                                                    />
                                                    <div className="invalid-feedback">Please enter your todo.</div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="button" onClick={handleAddTodo}>
                                                    Add Todo
                                                </button>
                                            </div>
                                        </form>
                                        <ul className="list-group mt-3">
                                            {todos && todos.map((todo, index) => (
                                                <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {index === editIndex ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={editValue}
                                                                onChange={(e) => setEditValue(e.target.value)}
                                                            />
                                                            <div>
                                                                <button className="btn btn-primary me-2" onClick={handleSaveEdit}>
                                                                    Save
                                                                </button>
                                                                <button className="btn btn-secondary" onClick={handleCancelEdit}>
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {todo.ToDoTitle}
                                                            <div>
                                                                <button className="btn btn-warning me-2" onClick={() => handleEditTodo(index)}>
                                                                    <FontAwesomeIcon icon={faEdit} />
                                                                </button>
                                                                <button className="btn btn-danger" onClick={() => handleRemoveTodo(todo._id)}>
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
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
        </main>
    );
}

export default TodoList;
