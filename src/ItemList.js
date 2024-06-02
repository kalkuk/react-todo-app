const ItemList = ({title, todos, todoChangeFunc}) => {

    return (
        <div>
            {todos.length > 0 && <h1 className="text-3xl text-blue-600 font-semibold mt-16 hover:scale-110 mb-4">{ title }</h1>}
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <input value={todo.name} onChange={event => todoChangeFunc(event.target.value, todo.isDone, todo.id)} />
                        <input type="checkbox" className="hover:cursor-pointer" checked={todo.isDone} onChange={event => todoChangeFunc(todo.name, event.target.checked, todo.id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;