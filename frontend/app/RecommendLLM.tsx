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
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Feature selection section */}
        <h2 className="text-3xl font-bold text-center mb-6">LLM Feature Selection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-6">
          {options.map(option => (
            <div
              key={option}
              onClick={() => handleOptionChange(option)}
              className={`relative bg-white shadow-md rounded-lg p-4 transition-all transform cursor-pointer hover:shadow-lg ${
                selectedOptions.includes(option) ? 'border-4 border-blue-500' : ''
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">{option}</h3>
              <p className="text-gray-500">{`Click to ${selectedOptions.includes(option) ? 'deselect' : 'select'}`}</p>
            </div>
          ))}
        </div>

        {/* Parameter selection section */}
        <h2 className="text-3xl font-bold text-center mb-6">Decision Parameters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {parameters.map(param => (
            <div key={param} className="bg-white shadow-md rounded-lg p-4">
              <label className="block text-lg font-semibold mb-2">{param}</label>
              <select
                onChange={(e) => handlePriorityChange(param, e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              >
                <option value="High Priority">High Priority</option>
                <option value="Normal">Normal</option>
                <option value="Low Priority">Low Priority</option>
              </select>
            </div>
          ))}
        </div>
        {/* Submit button */}
        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Submit
            </button>
        </div>
        </div>
    </div>
  );
};

export default RecommendLLM;