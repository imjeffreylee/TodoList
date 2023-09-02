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

const TodoItem = ({ item }) => {
  const { _id, text, complete } = item;

  const listIconSet = (
    <>
      <IconButton edge="end" aria-label="comments">
        <DriveFileRenameOutlineIcon />
      </IconButton>
      <IconButton edge="end" aria-label="comments">
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
    </ListItem>
  );
};

export default TodoItem;
