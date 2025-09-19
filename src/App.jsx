import {Header} from "./components/Header.jsx";
import {Tabs} from "./components/Tabs.jsx";
import {TodoList} from "./components/TodoList.jsx";
import {TodoInput} from "./components/TodoInput.jsx";
import {useState, useEffect} from "react";

function App() {

    const [todos, setTodos] = useState([
        {input: "Hello! Add your first todo!∩0", complete: true }
    ]);

    const [totalTodos, setTotal] = useState(0);

    const [selectedTab, setSelectedTab] = useState('Open');

    function handleAddTodo(newTodo) {
        const newTodoList = [...todos, {input: newTodo+`∩${totalTodos+1}`, complete: false}];
        const newTotalTodos = totalTodos + 1
        setTodos(newTodoList)
        setTotal(newTotalTodos)
        handleSaveData(newTodoList)
    }

    function handleCompleteTodo(index) {
        let newTodoList = [...todos]
        let completedTodo = todos[index]
        completedTodo['complete'] = true
        newTodoList[index] = completedTodo
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
        if (currentTodos.length !== 0) {
            localStorage.setItem('todo-app', JSON.stringify({todos: currentTodos, totalTodos: totalTodos}));
        } else {
            localStorage.setItem('todo-app', JSON.stringify({todos: currentTodos, totalTodos: 0}));
            setTotal(0);
        }

    }

    function indexRemover(input){
        let newInput = input;
        while (newInput.includes('∩')){
            newInput = newInput.slice(0, -1)
        }
        return newInput;
    }

    useEffect(() => {
        if (!localStorage || !localStorage.getItem('todo-app')) {
            return
        }
        let db = JSON.parse(localStorage.getItem('todo-app'))
        setTotal(Number(db.totalTodos)+1)
        setTodos(db.todos)
    }, [])

    return (
        <>
            <Header todos={todos} />
            <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos} />
            <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos} indexRemover={indexRemover} />
            <TodoInput handleAddTodo={handleAddTodo} />
        </>
    )
}

export default App
