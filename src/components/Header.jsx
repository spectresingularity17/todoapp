export function Header(props) {
    const { todos } = props;
    const todosLength = todos.length;

    const isTasksPlural = todos.length !== 1

    const taskOrTasks = isTasksPlural ? 'entries' : 'entry'

    return (
        <header>
            <h1 className="text-gradient">
                You have {todosLength} total {taskOrTasks}.</h1>
        </header>
    )
}