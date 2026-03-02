import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function StatsChart({ dataValues }) {
  const data = {
    labels: ["Pending", "Shortlisted", "Rejected"],
    datasets: [
      {
        label: "Candidates",
        data: dataValues, // Expected format: [pendingCount, shortlistedCount, rejectedCount]
        backgroundColor: [
          "rgba(245, 158, 11, 0.2)", // Pending (Yellow/Orange)
          "rgba(0, 210, 181, 0.2)",  // Shortlisted (Cyan - Brand)
          "rgba(239, 68, 68, 0.2)",  // Rejected (Red)
        ],
        borderColor: [
          "#f59e0b", // Pending border
          "#00D2B5", // Shortlisted border
          "#ef4444", // Rejected border
        ],
        borderWidth: 2,
        borderRadius: 8, // Modern rounded tops
        barThickness: 50, // Keeps bars from getting too wide on large screens
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hidden because the x-axis labels explain the categories perfectly
      },
      tooltip: {
        backgroundColor: "#0f172a", // Dark tooltip for high contrast
        titleFont: { family: "'Inter', sans-serif", size: 14 },
        bodyFont: { family: "'Inter', sans-serif", size: 14 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false, // Hides the little color box in the tooltip
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Ensures we don't get decimal counts for humans
          font: { family: "'Inter', sans-serif", color: "#64748b" },
          color: "#94a3b8",
        },
        grid: {
          color: "#f1f5f9", // Very faint grid lines
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          font: { family: "'Inter', sans-serif", weight: "600" },
          color: "#475569",
        },
        grid: {
          display: false, // Removes vertical grid lines for a cleaner look
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>Application Statistics</h3>
      <div style={styles.canvasWrapper}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

const styles = {
  chartContainer: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
    marginTop: "30px",
    width: "100%",
    boxSizing: "border-box",
  },
  chartTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "20px",
    marginTop: 0,
  },
  canvasWrapper: {
    height: "300px", // Strict height prevents Chart.js from expanding infinitely
    width: "100%",
    position: "relative",
  },
};

export default StatsChart;