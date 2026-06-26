import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';

import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useContext, useState} from 'react';
import { Todoscontext } from '../context/todosContexte';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function Todo({todo, fun}){
  const [deleteAlert, setdeleteAlert] = useState(false)
  const [updateAlert, setupdateAlertt] = useState(false)
  const [updatedTodo, setupdatedTodo] = useState({title : "", details : ""})
  const {todos,setTodos} = useContext(Todoscontext)
  
  // handle buttons
  
  function handlecheckClick(){
    const updatedTodos = todos.map((t)=>{
          if (t.id == todo.id )
          {t.isCompleted=!t.isCompleted}
          return t;
        }) ;
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }
   function handleDelete(){
    setdeleteAlert(true)
   }
   function handleDeleteDialogClose(){
    setdeleteAlert(false)
   }
   function handleDeleteConfirm(){
    const newTo = todos.filter((t)=>{
      
      return t.id != todo.id
    })

    setTodos(newTo)
    localStorage.setItem("todos", JSON.stringify(newTo))
   }

   function handleUpdateDialogOpen(){
    setupdateAlertt(true)
   }


   function handleUpdateDialogClose(){
    setupdateAlertt(false)
   }

   function handleUpdateConfirm(){
    const updatedTodos = todos.map((t)=>{
      if (t.id == todo.id)
      {return {...t, title : updatedTodo.title, details: updatedTodo.details}}
      else{return t}

    })
    setTodos(updatedTodos)
    setupdateAlertt(false)
   }




  // -----HAndle buttons
    return (
      <>
      {/* Dialog delete */}
      <Dialog
        open={deleteAlert}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure of the delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can't undelete after deleting the item
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button  autoFocus onClick={handleDeleteConfirm}>
            Delete it
          </Button>
        </DialogActions>
      </Dialog>



      {/* ---Dialog delete--- */}


      {/* dialog edit */}

      <Dialog
        open={updateAlert}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit the mission"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {todo.title}
          </DialogContentText>
        </DialogContent>
         <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Mission title"
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange={(e)=>{
                setupdatedTodo({...updatedTodo, title : e.target.value})
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Details"
              fullWidth
              variant="standard"
               value={updatedTodo.details}
              onChange={(e)=>{
                setupdatedTodo({...updatedTodo, details : e.target.value})
              }}
            />
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
          <Button  autoFocus onClick={handleUpdateConfirm}>
            Edit it
          </Button>
        </DialogActions>
      </Dialog>



      {/* ----dialog edit---- */}
        <Card
          className="todoCard"
          sx={{
            minWidth: 275,
            background: "#283593",
            color: "white",
            marginTop: 5,
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{ textAlign: "left", fontFamily: "A" }}
                >
                  {todo.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{ textAlign: "left" }}
                >
                  {todo.details}
                </Typography>
              </Grid>

              {/* button */}



              {/* Check button */}
              <Grid
                size={4}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconButton
                  onClick={()=>{
                    handlecheckClick()
                  }}
                  className="iconButton"
                  aria-label="delete"
                  style={{
                    color: todo.isCompleted ? "white":"#8bc34a",
                    background: todo.isCompleted ? "#8bc34a":"white",
                    border: "solid #8bc34a 3px",
                  }}
                >
                  <CheckIcon />
                </IconButton>
                {/* --Check button-- */}
                  {/* edit button */}
                <IconButton
                  className="iconButton"
                  aria-label="delete"
                  style={{
                    color: "#1769aa",
                    background: "white",
                    border: "solid #1769aa 3px",
                  }}
                  onClick={handleUpdateDialogOpen}
                >
                  <EditIcon />
                </IconButton>

                {/* ----edit button---- */}
                  {/* Delete button */}
                <IconButton
                  className="iconButton"
                  aria-label="delete"
                  style={{
                    color: "#b23c17",
                    background: "white",
                    border: "solid #b23c17 3px",
                  }}
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                </IconButton>
                {/* ----Delete button---- */}
              </Grid>
              {/* button */}
            </Grid>
          </CardContent>
        </Card>
      </>
    );
}