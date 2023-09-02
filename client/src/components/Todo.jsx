import { createContext, useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { Card, List, Box, Button, Typography } from '@mui/material';

import TodoItem from './TodoItem';
import ActionDialog from './ActionDialog';
import { getTodoList } from '../api/todo';

const ListCard = styled(Card)`
  width: 60%;
  margin-top: 32px;
  background-color: #eaeaea;
`;

export const TodoContext = createContext({});

const Todo = () => {
  const [list, setList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchTodoList = useCallback(async () => {
    const list = await getTodoList();
    setList(list);
  }, []);

  useEffect(() => {
    fetchTodoList();
  }, [fetchTodoList]);

  return (
    <TodoContext.Provider value={{ fetchTodoList }}>
      <ListCard>
        <Box display="flex" justifyContent="flex-end" pt={1} pr={1}>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Add todo
          </Button>
        </Box>
        <List>
          {list.length > 0 ? (
            list.map((todo, index) => <TodoItem key={index} todo={todo} />)
          ) : (
            <Typography textAlign="center">
              There's nothing to do for now. Click 'ADD TODO' to create your
              todo list.
            </Typography>
          )}
        </List>
      </ListCard>
      <ActionDialog
        open={dialogOpen}
        fetchTodoList={fetchTodoList}
        onClose={() => setDialogOpen(false)}
      />
    </TodoContext.Provider>
  );
};

export default Todo;
