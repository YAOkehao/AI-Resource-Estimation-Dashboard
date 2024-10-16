import React from 'react';
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
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Model Comparison</h2>
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