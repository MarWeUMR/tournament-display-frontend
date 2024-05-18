import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";

const defaultTables = Array.from({ length: 21 }, (_, i) => ({
  Tisch: i + 1,
  "Spieler 1": [],
  "Spieler 2": [],
  Klasse: "",
  Typ: "",
}));

const TableDataCard = () => {
  const [tableData, setTableData] = useState(defaultTables);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/table_data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const updatedTables = defaultTables.map((table) => {
          const tableData = data.find((item) => item.Tisch === table.Tisch);
          return tableData ? tableData : table;
        });
        setTableData(updatedTables);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 20000); // Fetch data every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {tableData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "200px",
                    border: "1px solid #000",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "50%",
                      borderBottom: "1px solid #000",
                    }}
                  >
                    {item["Spieler 1"].map((player, idx) => (
                      <Typography key={idx} variant="body1">
                        {player.first_name} {player.last_name}
                      </Typography>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "50%",
                    }}
                  >
                    {item["Spieler 2"].map((player, idx) => (
                      <Typography key={idx} variant="body1">
                        {player.first_name} {player.last_name}
                      </Typography>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "#fff",
                      padding: "0 10px",
                    }}
                  >
                    <Typography variant="h6">Tisch {item.Tisch}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TableDataCard;
