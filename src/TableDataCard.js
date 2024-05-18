import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';

const TableDataCard = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/table_data');
      const data = await response.json();
      setTableData(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch data every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {tableData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Tisch {item.Tisch}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.Klasse} - {item.Typ}
                </Typography>
                <Typography variant="body1" component="div">
                  Spieler 1:
                  {item['Spieler 1'].map((player, idx) => (
                    <div key={idx}>
                      {player.first_name} {player.last_name}
                    </div>
                  ))}
                </Typography>
                <Typography variant="body1" component="div">
                  Spieler 2:
                  {item['Spieler 2'].map((player, idx) => (
                    <div key={idx}>
                      {player.first_name} {player.last_name}
                    </div>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TableDataCard;

