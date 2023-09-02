import { useCallback, useState, useContext } from 'react';

import {
  Box,
  Radio,
  Dialog,
  Button,
  FormLabel,
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import styled from '@emotion/styled';

import { TodoContext } from './Todo';
import { addTodo, updateTodo } from '../api/todo';

const FormTitle = styled.h3`
  margin: 0;
  margin-bottom: 24px;
  text-align: center;
`;

const FormWrapper = styled(Box)`
  display: flex;
  padding: 24px 32px;
  flex-direction: column;
`;

const initTodo = { text: '', complete: false };

const ActionDialog = ({ open, onClose, todoData }) => {
  const isEdit = !!todoData;

  const [todo, setTodo] = useState(todoData || initTodo);
  const [isTextValid, setTextValid] = useState(true);

  const { fetchTodoList } = useContext(TodoContext);

  const handleTodoChange = useCallback((e) => {
    const key = e.target.name;
    const value = e.target.value;
    setTodo((prev) => ({ ...prev, [key]: value }));
  }, []);

  const validateText = useCallback((e) => {
    const value = e.target.value;
    setTextValid(!!value);
  }, []);

  const handleSave = () => {
    if (!isTextValid) return;
    const handleData = isEdit ? updateTodo : addTodo;
    const data = isEdit ? { id: todoData._id, ...todo } : todo;
    handleData(data).then(() => {
      fetchTodoList();
      setTodo(initTodo);
      onClose();
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <FormWrapper padding="24px 32px">
        <FormTitle>{isEdit ? 'Edit' : 'Create'} Todo</FormTitle>
        <Box mb={4}>
          <TextField
            name="text"
            label="New Todo*"
            value={todo.text}
            variant="standard"
            error={!isTextValid}
            onBlur={validateText}
            onChange={handleTodoChange}
            helperText={isTextValid ? '' : 'Todo is required.'}
          />
        </Box>

        <FormControl>
          <FormLabel>Is this completed?</FormLabel>
          <RadioGroup
            row
            name="complete"
            value={todo.complete}
            onChange={handleTodoChange}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button size="small" variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </FormWrapper>
    </Dialog>
  );
};

export default ActionDialog;
