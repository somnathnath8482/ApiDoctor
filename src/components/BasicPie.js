import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
  const data = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 50, label: "series C" },
    { id: 3, value: 70, label: "series d" },
    { id: 4, value: 10, label: "series e" },
  ];

  return (
    <PieChart
      series={[
        {
          data: data,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          innerRadius:30
        },
      ]}
      height={200}
    />
  );
}
