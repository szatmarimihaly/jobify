"use client";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface ScoreBadgeMuiProps {
  score: number;
}

export default function ScoreBadgeMui({ score }: ScoreBadgeMuiProps) {
  const getColor = () => {
    if (score <= 39) return "error";
    if (score <= 79) return "warning";
    return "success";
  };

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={score}
        color={getColor()}
        size={80}
        thickness={5}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <span className="text-sm font-bold">{score}%</span>
      </Box>
    </Box>
  );
}
