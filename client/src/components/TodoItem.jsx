import { useState } from 'react';

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

import ActionDialog from './ActionDialog';
import AlertDialog from './AlertDialog';

const TodoItem = ({ todo, fetchTodoList }) => {
  const { _id, text, complete } = todo;

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

  return (
    <ListItem key={_id} secondaryAction={listIconSet} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <Checkbox disableRipple checked={complete} />
        </ListItemIcon>
        <ListItemText id={_id} primary={text} />
      </ListItemButton>
      <ActionDialog
        todoData={todo}
        open={editOpen}
        fetchTodoList={fetchTodoList}
        onClose={() => setEditOpen(false)}
      />
      <AlertDialog
        id={_id}
        open={alertOpen}
        fetchTodoList={fetchTodoList}
        onClose={() => setAlertOpen(false)}
      />
    </ListItem>
  );
};

export default TodoItem;
