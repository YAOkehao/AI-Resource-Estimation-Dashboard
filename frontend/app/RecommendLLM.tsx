import { useState } from 'react';

const options = [
  'Text Generation', 'Image Generation', 'Song Generation', 'Code Generation', 
  'Table Processing', 'Summarization', 'Logical Reasoning', 'Mathematical Problem Solving'
];

const parameters = [
  'Price', 'Response Speed', 'Accuracy', 'Ethical Training', 'Green Computing Resources', 
  'Local Deployment Capability', 'Training Resource Requirements', 'Fine-Tuning Difficulty', 
  'Multilingual Support Capability', 'Model Scalability'
];

const RecommendLLM = () => {
  // State to store selected options and priorities
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<{ [key: string]: string }>({});

  // Function to handle option selection for LLM features
  const handleOptionChange = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  // Function to handle priority selection for parameters
  const handlePriorityChange = (param: string, value: string) => {
    setPriorities(prev => ({ ...prev, [param]: value }));
  };

  // Function to submit the selected options and priorities
  const handleSubmit = () => {
    console.log('Selected Options:', selectedOptions);
    console.log('Priorities:', priorities);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">LLM Recommendation</h2>

      {/* Feature selection section */}
      <h3 className="text-lg font-medium mb-2">Choose the features you need</h3>
      <div className="mb-4">
        {options.map(option => (
          <label key={option} className="block mb-2">
            <input
              type="checkbox"
              value={option}
              onChange={() => handleOptionChange(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      {/* Parameter selection section */}
      <h3 className="text-lg font-medium mb-2">Decision Parameters</h3>
      {parameters.map(param => (
        <div key={param} className="mb-2">
          <label className="block">{param}</label>
          <select
            onChange={(e) => handlePriorityChange(param, e.target.value)}
            className="border rounded p-2 mt-1"
          >
            <option value="High Priority">High Priority</option>
            <option value="Normal">Normal</option>
            <option value="Low Priority">Low Priority</option>
          </select>
        </div>
      ))}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </div>
  );
};

export default RecommendLLM;