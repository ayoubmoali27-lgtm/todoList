import Container from '@mui/material/Container';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './Todo';
import Grid from '@mui/material/Grid';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Todoscontext } from '../context/todosContexte';

export default function TodoList() {
  
  const {todos,setTodos} = useContext(Todoscontext)
  const [fields, setFields]= useState("")
  const [displayType,setdisplayType]=useState("all")
  

  function handleClickType(e){
    setdisplayType(e.target.value)
  }



  function handleClick(){
    const newTodo={
      id: uuidv4(),
    title: fields,
    details:"",
    isCompleted: false
    }
    const updatedT=[...todos, newTodo]
    setTodos(updatedT)
    setFields("");
    localStorage.setItem("todos", JSON.stringify(updatedT))
  }

  const completedTodos = todos.filter((t)=>{
    return t.isCompleted
  })
  const notCompletedTodos = todos.filter((t)=>{
    return !t.isCompleted
  })

  let todosToberendered = todos
  if(displayType==="done"){todosToberendered=completedTodos}
  else if (displayType==="not-done"){todosToberendered=notCompletedTodos}

  const TodoJs = todosToberendered.map ((t)=> {
    return <Todo todo = {t} key={t.id} />
  })
  useEffect(()=>{
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? []
    setTodos(storageTodos)
  },[setTodos])
  return (
      
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}style={{
          maxHeight:"80vh",
          overflow:"scroll"
        }}>
      <CardContent>
        <Typography gutterBottom variant="h2" sx={{ color: 'text.secondary' }}>
          Todo
        </Typography>
        <Divider />
        {/* filter button */}
           
            <ToggleButtonGroup
       value={displayType}
       exclusive
       onChange={handleClickType}
      aria-label="text alignment"
    >
      <ToggleButton value="all" >
        All
      </ToggleButton>
      <ToggleButton value="done" >
        Done
      </ToggleButton>
      <ToggleButton value="not-done" >
        Not done
      </ToggleButton>
    
    </ToggleButtonGroup>


        {/* ---closed filter button--- */}

        {/* All todos */}
        {TodoJs}
        

        {/*--- All todos ---*/}
        {/* ADD BUTTON + INPUT */}
          <Grid container style={{marginTop:"10px"}} spacing={2}>
            <Grid size={8}  > 
              <TextField id="outlined-basic" label="Task name" variant="outlined" style={{width:"100%"}} value={fields} onChange={(e)=>{setFields(e.target.value)}}/>
        </Grid>
        <Grid size={4} display="flex" justifyContent="space-between" alignItems="center"   >
          <Button variant="contained"style={{width:"100%", height:"100%"}} onClick={()=>{handleClick();}}>Add</Button>
        </Grid>
          </Grid>
        {/*--- ADD BUTTON + INPUT ---*/}
      </CardContent>
      
    </Card>
      </Container>
    
  );
}
