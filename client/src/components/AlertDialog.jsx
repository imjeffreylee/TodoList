import { useContext } from 'react';

import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

import { TodoContext } from './Todo';
import { removeTodo } from '../api/todo';

const AlertDialog = ({ open, onClose, id }) => {
  const { fetchTodoList } = useContext(TodoContext);

  const handleYes = () => {
    removeTodo(id).then(() => {
      fetchTodoList();
      onClose();
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to remove this todo?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This todo is not completed yet, and the removal is irreversible.
          Please confirm.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No, keep it.</Button>
        <Button onClick={handleYes}>Yes, remove it.</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
