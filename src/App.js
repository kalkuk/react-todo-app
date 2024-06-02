import { useLocalStorage } from 'usehooks-ts'
import { nanoid } from 'nanoid';
import ItemList from './ItemList';

const App = () => {

  const defaultTodos = [
    {id: nanoid(), name: 'Sai', isDone: false},
    {id: nanoid(), name: 'Piim', isDone: true},
    {id: nanoid(), name: 'Muna', isDone: false},
  ];
  
  let [todos, setTodos] = useLocalStorage('todos', defaultTodos);

  const todoChange = (name, isDone, id) => {
      let newTodos = todos.map(todo => {
          if (todo.id === id) {
            return {...todo, name: name, isDone: isDone};
          
          }

          return todo;
      });

      newTodos = newTodos.filter(item => item.name.trim() !== '');

      setTodos(newTodos);
  }

  const doneItems = todos.filter(item => item.isDone);
  const toDoItems = todos.filter(item => !item.isDone);

  const addItem = () => {
    let newItemName = document.getElementById('newItemName');
    if (newItemName.value.trim() !== ''){
      todos = [...todos, {id: nanoid(), name: newItemName.value.trim(), isDone: false}];
    }

    setTodos(todos);

    newItemName.value = '';
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addItem();
    }
  }

  return (
    <div className="container mx-auto mt-16 flex flex-col justify-center items-center bg-white p-16 rounded">
      <div className="relative flex w-full max-w-[24rem]">
            <div className="relative h-10 w-full min-w-[200px]">
                <input className="input peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 pr-20 font-normal text-slate-800 outline outline-0 focus:border-2 focus:border-gray-400 placeholder:italic placeholder:text-slate-400" placeholder="Add sth to the list..." id="newItemName" onKeyDown={event => handleKeyDown(event)} />
            </div>
            <div>
                <button className="absolute right-1 top-1 select-none rounded  py-2 px-4 text-center align-middle text-xs text-white font-bold uppercase bg-blue-600 hover:bg-blue-800 hover:scale-125 " onClick={addItem}>
                    Add item
                </button>
            </div>
        </div>

        <ItemList todos={todos} title="All Items" todoChangeFunc={todoChange} />
        <ItemList todos={doneItems} title="Done Items" todoChangeFunc={todoChange} />
        <ItemList todos={toDoItems} title="ToDo Items" todoChangeFunc={todoChange} />
        
      </div>
  );
}

export default App;
