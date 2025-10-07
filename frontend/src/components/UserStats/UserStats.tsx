import { FC, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./UserStats.css";
import { FolderDistribution } from "../../types/FolderDistribution";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

interface UserStatsProps {
  folderDistribution: FolderDistribution[];
}

const UserStats: FC<UserStatsProps> = ({ folderDistribution }) => {
  const chartData = useMemo(() => ({
    labels: folderDistribution.map(f => f.folderTitle),
    datasets: [
      {
        label: "Tasks per Folder",
        data: folderDistribution.map(f => f.taskCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  }), [folderDistribution]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { position: "right" as const },
      title: { display: true, text: "Task Distribution by Folder" },
    },
  }), []);

  return (
    <div className="chart-wrapper">
      <h2 className="chart-title">Folder Distribution</h2>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default UserStats;
