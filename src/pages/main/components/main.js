import React from "react";
import { useState, useEffect } from "react";
import '../main_styles.scss';



const Main = () => {

  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [modal, setModal] = useState(null);

  useEffect(() => {

    const newTodos = localStorage.getItem('todos');
    if (newTodos) {
      setTodos(JSON.parse(newTodos));
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const addText = () => {
    if (inputValue.trim() === '') {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000
      )

      return;
    }
    const taskArr = {
      text: inputValue,
      isDone: false
    }
    setTodos([...todos, taskArr]);

    setInputValue('');
    setShowAlert(false);

    //localStorage.setItem('todos', JSON.stringify(...todos, taskArr));
  }


  const formSubmit = (e) => {
    e.preventDefault();
    addText();
  }

  const changeIsDone = (index) => {

    const isDoneTodos = [...todos];
    isDoneTodos[index].isDone = !isDoneTodos[index].isDone;
    setTodos(isDoneTodos);

    //localStorage.setItem('todos', JSON.stringify(isDoneTodos));

  }

  const deleteLi = (index) => {

    const indexTodos = todos.filter((_, i) => i !== index);
    setTodos(indexTodos);
    // localStorage.setItem('todos', JSON.stringify(indexTodos));
  }

  const showModal = (todo) => {
    setModal(todo);
  }

  useEffect(() => {
    const keyDown = (e) => {
      if (e.key === 'Escape') {
        setModal(null);
      }
    };
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };

  }, []);



  return (
    <>
      <h1>Main page</h1>
      <div className="todo conteiner">
        <div className="todo__wrapper">
          <h3>Todo list</h3>
          <form onSubmit={formSubmit} className="todo__form">
            <input type="text" value={inputValue} className="todo__input" placeholder="Add task"
              onChange={(e) => { setInputValue(e.target.value) }} />
            <button type="button" className="todo__btn" onClick={addText}>Add</button>
          </form>
          <ul className="todo__list">
            {todos.map((todo, index) => (
              <li key={index}>
                <input type="checkbox" checked={todo.isDone} onChange={() => changeIsDone(index)} />
                <span onClick={() => showModal(todo)}>{todo.text}</span>
                <button className="todo__btn-danger" onClick={() => deleteLi(index)} >Delete</button>
              </li>
            ))}
          </ul>
          {showAlert &&
            (
              <div className="todo__alert">
                Please enter a task
              </div>
            )
          }
        </div>
        {
          modal && (
            <div className="modal modal__overlay" onClick={() => setModal(null)}>
              <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header modal__header--flex">
                  <span className="modal__title">Your task...!!!</span>
                  <div onClick={() => setModal(null)} className="modal__close" aria-label="close">Esc</div>
                </div>

                <div className="modal__content">
                  {modal.text}
                </div>

                <div className="modal__actions">
                  <button onClick={() => setModal(null)} className="modal__btn modal__btn--cancel" >Cancel</button>
                </div>
              </div>
            </div>
          )
        }

      </div>

    </>
  )
}

export default Main;

