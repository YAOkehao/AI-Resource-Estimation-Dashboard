import React from 'react';

import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface ModelComparisonProps {
  comparisonResult: any[]; // The array of models from the API response
}
const ComparisonResult: React.FC<ModelComparisonProps> = ({ comparisonResult }) => {
  // Define the list of parameters to compare
  const parameters = [
    { label: 'Price', key: 'Price' },
    { label: 'Response Speed', key: 'Response_Speed' },
    { label: 'Accuracy', key: 'Accuracy' },
    { label: 'Ethical Training', key: 'Ethical_Training' },
    { label: 'Green Computing Resources', key: 'Green_Computing_Resources' },
    { label: 'Local Deployment Capability', key: 'Local_Deployment_Capability',type: 'binary' },
    { label: 'Training Resource Requirements', key: 'Training_Resource_Requirements' },
    { label: 'Fine-Tuning Difficulty', key: 'Fine_Tuning_Difficulty' },
    { label: 'Multilingual Support Capability', key: 'Multilingual_Support_Capability' },
    { label: 'Model Scalability', key: 'Model_Scalability' },
    { label: 'Text Generation', key: 'Text_Generation', type: 'binary' },
    { label: 'Image Generation', key: 'Image_Generation', type: 'binary' },
    { label: 'Song Generation', key: 'Song_Generation', type: 'binary' },
    { label: 'Code Generation', key: 'Code_Generation', type: 'binary' },
    { label: 'Table Processing', key: 'Table_Processing', type: 'binary' },
    { label: 'Summarization', key: 'Summarization', type: 'binary' },
    { label: 'Logical Reasoning', key: 'Logical_Reasoning', type: 'binary' },
    { label: 'Mathematical Problem Solving', key: 'Mathematical_Problem_Solving', type: 'binary' },
  ];


  // Filter non-binary parameters for the radar chart
  const radarParams = parameters.filter(param => !param.type);
  // Prepare the data for the radar chart
  const radarData = {
    labels: radarParams.map((param) => param.label),
    datasets: comparisonResult.map((model, index) => {
      const colors = [
        'rgba(255, 99, 132, 0.2)', // Red
        'rgba(54, 162, 235, 0.2)', // Blue
        'rgba(75, 192, 192, 0.2)', // Green
        'rgba(255, 206, 86, 0.2)', // Yellow
        'rgba(153, 102, 255, 0.2)', // Purple
        'rgba(255, 159, 64, 0.2)',  // Orange
        'rgba(100, 255, 218, 0.2)', // Cyan
        'rgba(255, 140, 0, 0.2)',   // Dark Orange
        'rgba(255, 20, 147, 0.2)',  // Deep Pink
        'rgba(139, 69, 19, 0.2)'    // Brown
      ];
  
      return {
        label: model.Name,
        data: radarParams.map((param) => model[param.key]),
        fill: true,
        backgroundColor: colors[index % colors.length], // Ensure color cycling if more than 10 models
        borderColor: colors[index % colors.length].replace('0.2', '1'),
        borderWidth: 2,
      };
    }),
  };
  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 5, // Assuming all data points are in the range 0-5
      },
    },
  };
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Model Comparison</h2>

        {/* Radar Chart for non-binary parameters */}
        <div className="mb-6">
          <Radar data={radarData} options={radarOptions} />
        </div>
        {/* Comparison Table */}
        <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Parameter</th>
              {comparisonResult.map((model) => (
                <th key={model.id} className="border px-4 py-2 text-left">
                  {model.Name}
                  <br />
                  <span className="text-gray-500">{model.Development_Company}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Render all parameters dynamically */}
            {parameters.map((param) => (
              <tr key={param.key}>
                <td className="border px-4 py-2">{param.label}</td>
                {comparisonResult.map((model) => (
                  <td key={model.id} className="border px-4 py-2">
                    {/* Binary data displayed as checkmark/cross, other values displayed as text */}
                    {param.type === 'binary' ? (
                      model[param.key] ? (
                        <span className="text-green-500">✔</span>
                      ) : (
                        <span className="text-red-500">✘</span>
                      )
                    ) : (
                      model[param.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* Description row */}
            <tr>
              <td className="border px-4 py-2">Description</td>
              {comparisonResult.map((model) => (
                <td key={model.id} className="border px-4 py-2">
                  {model.Description}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonResult;