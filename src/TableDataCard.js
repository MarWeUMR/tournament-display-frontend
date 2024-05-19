import React, { useEffect, useState } from "react";
import { Typography, Container, Box } from "@mui/material";

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
    const interval = setInterval(fetchData, 20000); // Fetch data every 20 seconds
    return () => clearInterval(interval);
  }, []);

  // Create a new array for the 4x4 grid in the desired order
  const orderedTables = [
    tableData[3],
    tableData[7],
    tableData[11],
    tableData[15],
    tableData[2],
    tableData[6],
    tableData[10],
    tableData[14],
    tableData[1],
    tableData[5],
    tableData[9],
    tableData[13],
    tableData[0],
    tableData[4],
    tableData[8],
    tableData[12],
  ];

  // Define the dimensions based on the known display size
  const totalHeight = 980; // Total height of the display
  const gridHeight = 700; // Height for the 4x4 grid
  const gap = 10; // Gap between tables and between the grid and the row
  const verticalGap = 10; // Vertical gap between rows in the grid
  const gapBetweenGridAndRow = 20; // Configurable gap between the grid and the last row

  // Calculate the total height for the grid including vertical gaps
  const totalGridHeight = gridHeight + 3 * verticalGap;

  // Calculate the height for the single row
  const rowHeight = totalHeight - totalGridHeight - gapBetweenGridAndRow;

  const tableWidthRow = 540; // Width for each table in the row

  // Calculate the total width for the last row
  const totalWidthRow = 5 * tableWidthRow + 4 * gap;

  // Calculate the width for each table in the grid
  const tableWidthGrid = (totalWidthRow - 3 * gap) / 4;

  return (
    <Container
      maxWidth={false} // Remove any maximum width constraints
      sx={{
        height: `${totalHeight}px`, // Total height of the display
        width: "100%", // Use all available width
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 0,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: `repeat(4, ${gridHeight / 4}px)`,
          gridTemplateColumns: `repeat(4, ${tableWidthGrid}px)`, // Use calculated width for grid columns
          gap: `${gap}px ${verticalGap}px`, // Set horizontal and vertical gaps
          height: `${totalGridHeight}px`, // Set the total height for the grid including gaps
          width: "100%",
          justifyContent: "center", // Center the grid horizontally
        }}
      >
        {/* 4x4 Grid for tables 1 through 16 in the desired order */}
        {orderedTables.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid #000",
              position: "relative",
              height: "100%",
              width: "100%",
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
                  {player.last_name}
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
                  {player.last_name}
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
              <Typography variant="h6">{item.Tisch}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(5, ${tableWidthRow}px)`, // Use original width for row columns
          gap: `${gap}px`,
          height: `${rowHeight}px`, // Set the height for the row
          width: "100%",
          justifyContent: "center", // Center the row horizontally
          marginTop: `${gapBetweenGridAndRow}px`, // Add gap between grid and row
        }}
      >
        {/* Single row of 5 tables for tables 17 through 21 */}
        {tableData.slice(16, 21).map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid #000",
              position: "relative",
              height: "100%",
              width: "100%",
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
                  {player.last_name}
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
                  {player.last_name}
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
              <Typography variant="h6">{item.Tisch}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default TableDataCard;
