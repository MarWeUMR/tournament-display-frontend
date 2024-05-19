import { Typography, Box } from "@mui/material";

const TableBox = ({ item, fontSize }) => {
  return (
    <Box
      // whole table surface
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
        // upper table half
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50%",
          zIndex: 6,
        }}
      >
        {item["Spieler 1"].map((player, idx) => (
          <Typography key={idx} variant="body1" sx={{ fontSize }}>
            {player.last_name}
          </Typography>
        ))}
      </Box>
      <Box
        // table number box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "0 10px",
          zIndex: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontSize }}>
          {item.Tisch}
        </Typography>
      </Box>
      <Box
        // divider line
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: "2px",
          backgroundColor: "#000",
          zIndex: 1,
        }}
      />
      <Box
        // lower table half
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50%",
          zIndex: 6,
        }}
      >
        {item["Spieler 2"].map((player, idx) => (
          <Typography key={idx} variant="body1" sx={{ fontSize }}>
            {player.last_name}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default TableBox;
