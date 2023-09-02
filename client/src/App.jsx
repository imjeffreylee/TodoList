import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Todo from './components/Todo';

const Container = styled(Box)`
  height: 100vh;
  color: #5e5e5e;
  background-color: #faf69d;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

const App = () => {
  return (
    <Container>
      <Typography variant="h2">My Todo List</Typography>
      <Todo />
    </Container>
  );
};

export default App;
