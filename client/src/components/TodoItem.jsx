import { useContext, useState } from 'react';

import {
  Box,
  Tooltip,
  Checkbox,
  ListItem,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import { TodoContext } from './Todo';
import styled from '@emotion/styled';
import AlertDialog from './AlertDialog';
import { updateTodo } from '../api/todo';
import ActionDialog from './ActionDialog';

const ItemText = styled(ListItemText)`
  width: 150px;
  overflow: hidden;
  margin-right: 16px;
`;

const ItemTime = styled(ListItemText)`
  overflow: hidden;
`;

const IconBox = styled(Box)`
  background-color: #eaeaea;
  border-radius: 25px;
`;

const TodoItem = ({ todo }) => {
  const { _id, text, complete, timestamp } = todo;

  const date = new Date(Number(timestamp));
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString();

  const { fetchTodoList } = useContext(TodoContext);

  const [editOpen, setEditOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const listIconSet = (
    <IconBox>
      <IconButton onClick={() => setEditOpen(true)}>
        <DriveFileRenameOutlineIcon />
      </IconButton>
      <IconButton onClick={() => setAlertOpen(true)}>
        <DeleteOutlineIcon />
      </IconButton>
    </IconBox>
  );

  const onCheckboxChange = (e, checked) => {
    updateTodo({ ...todo, complete: checked, id: todo._id }).then(() =>
      fetchTodoList()
    );
  };

  return (
    <ListItem
      key={_id}
      disablePadding
      secondaryAction={listIconSet}
      sx={{ opacity: complete ? '0.5' : '1' }}
    >
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            disableRipple
            checked={complete}
            onChange={onCheckboxChange}
          />
        </ListItemIcon>
        <Tooltip title={text}>
          <ItemText primary={text} />
        </Tooltip>
        <Tooltip title={`last updated: ${dateStr} ${timeStr}`}>
          <ItemTime primary={`last updated: ${dateStr} ${timeStr}`} />
        </Tooltip>
      </ListItemButton>

      <ActionDialog
        todoData={todo}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
      <AlertDialog
        id={_id}
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </ListItem>
  );
};

export default TodoItem;
