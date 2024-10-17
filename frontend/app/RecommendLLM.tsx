import { useEffect, useState } from 'react';
import { recommendLLM } from './api';

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

   // Initialize default priorities for all parameters
   useEffect(() => {
    const defaultPriorities = parameters.reduce((acc, param) => {
      acc[param] = "2"; // Set 'Normal' as the default priority (value "2")
      return acc;
    }, {} as { [key: string]: string });
    setPriorities(defaultPriorities);
  }, []); // Empty dependency array to ensure this runs once on component mount


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
  const handleSubmit = async () => {
    if (selectedOptions.length === 0) {
      alert('Please select at least one LLM feature.');
      return; // Stop the submission
    }
  
    // Prepare the data to match the API request format
    const requestData = {
      Service: selectedOptions.map(option => option.replace(/\s/g, '_')), // Replace spaces with underscores for the API keys
      Price: parseInt(priorities['Price']),
      Response_Speed: parseInt(priorities['Response Speed']),
      Accuracy: parseInt(priorities['Accuracy']),
      Ethical_Training: parseInt(priorities['Ethical Training']),
      Green_Computing_Resources: parseInt(priorities['Green Computing Resources']),
      Local_Deployment_Capability: parseInt(priorities['Local Deployment Capability']),
      Training_Resource_Requirements: parseInt(priorities['Training Resource Requirements']),
      Fine_Tuning_Difficulty: parseInt(priorities['Fine-Tuning Difficulty']),
      Multilingual_Support_Capability: parseInt(priorities['Multilingual Support Capability']),
      Model_Scalability: parseInt(priorities['Model Scalability']),
    };
  
    try {
      // Call the recommendLLM API function with the prepared data
      const response = await recommendLLM(requestData);
      console.log('API Response:', response); // Handle the API response
    } catch (error) {
      console.error('Error recommending LLM:', error); // Handle any errors
    }
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
                <option value="2">Normal</option>
                <option value="3">High Priority</option>
                <option value="1">Low Priority</option>
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