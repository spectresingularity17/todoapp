import {Header} from "./components/Header.jsx";
import {Tabs} from "./components/Tabs.jsx";
import {TodoList} from "./components/TodoList.jsx";
import {TodoInput} from "./components/TodoInput.jsx";
import {useState, useEffect} from "react";

function App() {
    // const todos = [
    //     {input: "Hello! Add your first todo!", complete: true },
    //     {input: "Get groceries!", complete: false },
    //     {input: "Learn how to web design", complete: false },
    //     {input: "Say hi to shadow", complete: true },
    // ]

    const [todos, setTodos] = useState([
        {input: "Hello! Add your first todo!", complete: true }
    ]);

    const [selectedTab, setSelectedTab] = useState('Open');

    function handleAddTodo(newTodo) {
        const newTodoList = [...todos, {input: newTodo, complete: false}];
        setTodos(newTodoList);
        handleSaveData(newTodoList)
    }

    function handleCompleteTodo(index) {
        let newTodoList = [...todos];
        let completedTodo = todos[index]
        completedTodo['complete'] = true;
        newTodoList[index] = completedTodo;
        setTodos(newTodoList);
        handleSaveData(newTodoList)
    }

    function handleDeleteTodo(index) {
        let newTodoList = todos.filter((val, valIndex) => {
            return valIndex !== index
        })
        setTodos(newTodoList)
        handleSaveData(newTodoList)
    }

    function handleSaveData(currentTodos) {
        localStorage.setItem('todo-app', JSON.stringify({todos: currentTodos}));
    }

    useEffect(() => {
        if (!localStorage || !localStorage.getItem('todo-app')) {
            return
        }
        let db = JSON.parse(localStorage.getItem('todo-app'))
        setTodos(db.todos)
    }, [])

    return (
        <>
            <Header todos={todos} />
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos} />
            <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos} />
            <TodoInput handleAddTodo={handleAddTodo} />
        </>
    )
}

export default App
