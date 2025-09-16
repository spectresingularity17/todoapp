import {useState} from "react"

export function TodoInput(props) {
    const { handleAddTodo } = props
    const [inputValue, setInputValue] = useState("")

    function checkAdd(inputValue) {
        if (!inputValue) {return}
        handleAddTodo(inputValue)
        setInputValue('')
    }

    return (
        <div className='input-container'>
            <input value={inputValue}
                   onChange={(e) => {
                     setInputValue(e.target.value)}}
                   onKeyPress={(e) => {
                     if (e.key === "Enter") checkAdd(inputValue)}}
                   placeholder='Add task'/>
            <button onClick={() => {
                checkAdd(inputValue)
            }}>
                <i className='fa-solid fa-plus'></i>
            </button>
        </div>
    )
}