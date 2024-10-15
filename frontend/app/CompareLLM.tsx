import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { compareLLM, fetchAllModelInfo } from './api';

const CompareLLM = () => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [llmModels, setLlmModels] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchModels = async () => {
      const data = await fetchAllModelInfo();
      setLlmModels(data);
    };
    fetchModels();
  }, []);

  // Handle model selection, toggling selected models
  const handleModelSelection = (modelName: string) => {
    setSelectedModels((prev) =>
      prev.includes(modelName) ? prev.filter((item) => item !== modelName) : [...prev, modelName]
    );
  };
  const handleCompareSubmit = async () => {
    try {
      const result = await compareLLM(selectedModels);
      console.log('Comparison Result:', result);
    } catch (error) {
      console.error('Failed to compare models:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
    <div className="max-w-4xl mx-auto">
        {/* Hint for model selection */}
        {selectedModels.length < 2 && (
        <div className="bg-gray-50 p-6 rounded-lg text-center mb-6 text-gray-500 border border-gray-300">
           Start by selecting two or more models to compare.
        </div>
      )}
      
      {/* LLM Model Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {llmModels.map((model) => (
          <div
            key={model.id}
            onClick={() => handleModelSelection(model.Name)}
            className={`relative bg-white shadow-md rounded-lg p-6 transition-all transform cursor-pointer ${
              selectedModels.includes(model.Name) ? 'border-4 border-blue-500' : ''
            } hover:shadow-lg`}
          >
            {/* Model Info */}
            <h3 className="text-xl font-semibold mb-2">{model.Name}</h3>
            <p className="text-gray-600 mb-4">{model.Description}</p>
            {/* Selection Indicator */}
            <div className="flex items-center justify-between">
            {selectedModels.includes(model.Name) ? (
                <FaCheckCircle className="text-blue-500 w-6 h-6" />
              ) : (
                <span className="text-gray-500">Select</span>
              )}

      {/* Toggle Switch with color transition */}
      <div className="flex items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedModels.includes(model.Name)}
                      onChange={() => handleModelSelection(model.Name)}
                      className="sr-only"
                    />
                    <div
                      className={`block w-10 h-6 rounded-full transition-colors ${
                        selectedModels.includes(model.Name) ? 'bg-blue-500' : 'bg-gray-400'
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${
                        selectedModels.includes(model.Name) ? 'translate-x-4' : ''
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Comparison Bar - Appears after selecting at least two models */}
        {selectedModels.length >= 2 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t-2 border-gray-200">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              {/* Selected Models Overview */}
              <div className="flex space-x-4">
              {selectedModels.map((modelName) => (
                  <div key={modelName} className="bg-gray-100 p-2 rounded-lg">
                    {modelName}
                  </div>
                ))}
              </div>
              {/* Compare Button */}
              <button
                onClick={handleCompareSubmit}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Compare
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareLLM;