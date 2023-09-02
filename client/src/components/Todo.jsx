import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { Card, List } from '@mui/material';

import TodoItem from './TodoItem';
import { getTodoList } from '../api/todo';

const ListCard = styled(Card)`
  width: 50%;
  margin-top: 32px;
  background-color: #eaeaea;
`;

const Todo = () => {
  const [list, setList] = useState([]);

  const fetchTodoList = useCallback(async () => {
    const list = await getTodoList();
    setList(list);
  }, []);

  useEffect(() => {
    fetchTodoList();
  }, [fetchTodoList]);

  return (
    <ListCard>
      <List>
        {list.map((item, index) => (
          <TodoItem key={index} item={item} />
        ))}
      </List>
    </ListCard>
  );
};

export default Todo;
