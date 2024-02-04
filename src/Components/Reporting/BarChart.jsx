import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
  }
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

export const data = {
  labels,
  datasets: [
    {
      label: "Sales",
      data: [312, 203, 142, 314, 147, 345, 551, 294, 243],
      backgroundColor: "#6C5FFC"
    }
  ]
};
console.log("barcharrt")
export function BarChart() {
    
  return <Bar options={options} data={data} redraw={true} style={{height:'600px !important', padding:"0px", margin:"0px"}}/>;
}
