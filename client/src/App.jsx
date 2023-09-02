import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Todo from './components/Todo';

const Container = styled(Box)`
  height: 100vh;
  color: #5e5e5e;
  background-color: #faf69d;
`;

const MainTitle = styled(Typography)`
  display: flex;
  justify-content: center;
`;

const App = () => {
  return (
    <Container>
      <MainTitle variant="h2">My Todo List</MainTitle>
      <Todo />
    </Container>
  );
};

export default App;
