
import './App.css';
import TodoList from './components/TodoList';
import {createTheme, ThemeProvider} from "@mui/material/styles"
import { Todoscontext } from './context/todosContexte';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const theme = createTheme({
  typography:{
    fontFamily:["A"]
  }
});
const initials = [
  {
    id: uuidv4(),
    title: "first mission",
    details:"hgrhhrthrthrth",
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: "first mission",
    details:"hgrhhrthrthrth",
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: "first mission",
    details:"hgrhhrthrthrth",
    isCompleted: false
  },{
    id: uuidv4(),
    title: "first mission",
    details:"hgrhhrthrthrth",
    isCompleted: false
  },
]
function App() {
   const [todos, setTodos] = useState(initials)
  return (
    <ThemeProvider theme={theme}>
    <div className="App" style={{display:"flex", justifyContent:"center",alignItems:"center", height:"100vh",background:"#191b1f"}}>
      <Todoscontext.Provider value={{todos,setTodos}}>
      <TodoList/>
      </Todoscontext.Provider>
    </div>
    </ThemeProvider>
  );
}

export default App;
