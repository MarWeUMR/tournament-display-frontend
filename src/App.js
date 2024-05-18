import React from 'react';
import { CssBaseline, Container, Typography } from '@mui/material';
import TableDataCard from './TableDataCard';

function App() {
  return (
    <div>
      <CssBaseline />
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          Table Tennis Tournament
        </Typography>
        <TableDataCard />
      </Container>
    </div>
  );
}

export default App;

