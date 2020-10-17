import React from "react";
import "./App.css";

//A function here is created where you would pass in the 'todo' and then render a simple component with the 'todo' you've received in a text format. There are two additional
//buttons here that will be passed in a function as an input. Once again, the index is being pased in through the map function and thus each todo would have a unique index
//placed upon them. This is how the buttons know which todo to remove/complete. The question mark is a ternary operator in JavaScript that makess the statement true or false
//and thus will execute the left hand side of the colon when it's true and the right hand side when it is false (think of it like an if-else statement almost). In this case
//we're setting the style of the text to have a line through it. The reason why it won't remove the line is because when we pass in the 'completeTodo' function below in the
//App function, we are always setting the 'isComplete' to true and thus we will never be able to remove the strikethrough line.
function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className="todo" style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}


function TodoForm({ addTodo }) {
  
  //useState hook. Hooks are a way for you to code functionality without using classes. The useState hook will return an array with two values. The first value will 
  //be the state. It is what React will render each time. The second value is a function that will allow you to update your state. What you initially have defined here
  //is the default values. If you were to refresh your page/restart your app, these are the default values that would show up each time.
  const [value, setValue] = React.useState("");

  //'e' in JavaScript is a event handler. The browser is 'listening' for an event - a click, a keyboard press, etc. However, we're cancelling that functionality by
  //using the preventDefault() method. We're verifying that there is a value (otherwise we just do nothing) and if there is, we use JavaScript's method of passing in a 
  //function to another function. In this case, we pass in the value to the 'addTodo' function defined in the App. After all that, we clear the form and ready it 
  //for the next todo
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  //On submitting the form, we call the handleSubmit function defined earlier. The input is fairly standard. The only things to look at is the value field which is dynamic
  //based on the constants mentioned before. Also in the onChange, when it detects a keystroke, it will update the component with the new value that it has listened to
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)} />
    </form>
  );
}

function App() {

  //useState hook. Hooks are a way for you to code functionality without using classes. The useState hook will return an array with two values. The first value will 
  //be the state. It is what React will render each time. The second value is a function that will allow you to update your state. What you initially have defined here
  //is the default values. If you were to refresh your page/restart your app, these are the default values that would show up each time.
  const [todos, setTodos] = React.useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);

  //To remove the todo, you would grab the entire list of todos and then use the built in .splice method. The method takes the first input as the starting index of the
  //array you want to modify. In this case, we are passing in the index to start at so it will be whatever we selected. The second input is how many entries in the array
  //we want to delete after the index. In this case, we only want to delete the one todo, so we pass in a '1'. After that, we set the values of the todo list again by
  //using the method defined above
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  //In JavaScript, const does not declare a constant but rather it is a constant reference to something. Essentially, this function cannot be overwritten. Once this
  //functionality has been declared, you cannot make a second 'addTodo'. Similarly, the newTodos cannot be overwritten by another function even if two operations were to
  //be carried out at the same time. In this case you would nto have to worry about it, but on a large scale, it will happen that two people might try to do multiple 
  //actions at once JavaScript will give you an error. The three dots are JavaScript notation to grab the entire list of todos. Then you're using the 'setTodos' function
  //you defined earlier to update the state of the component by adding a new todo
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  //Similar to the other ones, this arrow function will take the todos and set the 'isCompleted' to true using the index that was passed in. It will then set the todos
  //to the component using the state modifying function defined above
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  //Using the standadrd JavaScript mapping function, you're calling the 'Todo' function you created earlier. A key is supposed to be unique, but since you are also
  //using an index, the index and key would both be unique (there can only be one #1 Todo in existence at a time). You're passing in the 'todo' variable by setting it
  //to the 'todos' in the constant defined above. The arrow function is used to simplify the code and to actually pass in the (todo, index) as possible variables to
  //the 'Todo' function. Below the main todos, you're adding the new component of the Todoform and setting the variable addTodo in the function level as the arrow
  //function listed previously. Within the main 'Todo', you're mapping the variables in the 'Todo' function defined above to the functions that were defined in the
  //main application above 
  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            removeTodo={removeTodo}
            completeTodo={completeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;