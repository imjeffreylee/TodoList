import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { Card, List, Box, Button } from '@mui/material';

import TodoItem from './TodoItem';
import { getTodoList } from '../api/todo';
import ActionDialog from './ActionDialog';

const ListCard = styled(Card)`
  width: 50%;
  margin-top: 32px;
  background-color: #eaeaea;
`;

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
    <>
      <ListCard>
        <Box display="flex" justifyContent="flex-end" pt={1} pr={1}>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Add todo
          </Button>
        </Box>
        <List>
          {list.map((item, index) => (
            <TodoItem key={index} item={item} />
          ))}
        </List>
      </ListCard>
      <ActionDialog
        open={dialogOpen}
        fetchTodoList={fetchTodoList}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default Todo;
