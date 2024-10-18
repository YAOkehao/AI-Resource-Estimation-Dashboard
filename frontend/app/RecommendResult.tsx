import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RecommendResultProps {
  results: { Name: string; Score: number }[];
}

const RecommendResult: React.FC<RecommendResultProps> = ({ results }) => {
  // Prepare data for the chart
  const data = {
    labels: results.map((item) => item.Name), // X-axis labels (model names)
    datasets: [
      {
        label: 'Score',
        data: results.map((item) => item.Score), // Y-axis data (scores)
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Bar color with transparency
        borderColor: 'rgba(54, 162, 235, 1)', // Bar border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend since we have only one dataset
      },
      title: {
        display: true,
        text: 'Top LLM Model Scores',
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensure Y-axis starts at 0
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default RecommendResult;