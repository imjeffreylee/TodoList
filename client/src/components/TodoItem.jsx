import { useContext, useState } from 'react';

import {
  Checkbox,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import { TodoContext } from './Todo';
import AlertDialog from './AlertDialog';
import { updateTodo } from '../api/todo';
import ActionDialog from './ActionDialog';

const TodoItem = ({ todo }) => {
  const { _id, text, complete, timestamp } = todo;

  const date = new Date(Number(timestamp));
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString();

  const { fetchTodoList } = useContext(TodoContext);

  const [editOpen, setEditOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const listIconSet = (
    <>
      <IconButton onClick={() => setEditOpen(true)}>
        <DriveFileRenameOutlineIcon />
      </IconButton>
      <IconButton onClick={() => setAlertOpen(true)}>
        <DeleteOutlineIcon />
      </IconButton>
    </>
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
        <ListItemText primary={text} sx={{ width: '100px' }} />
        <ListItemText primary={`last updated: ${dateStr} ${timeStr}`} />
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
