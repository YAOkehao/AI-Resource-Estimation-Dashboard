import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

// data for test...
const llmModels = [
    { name: 'LLM1',  description: 'This is some description for this AI models...' },
    { name: 'LLM2',  description: 'This is some description for this AI models...' },
    { name: 'LLM3',  description: 'This is some description for this AI models...' },
    { name: 'LLM4',  description: 'This is some description for this AI models...' },
    { name: 'LLM5',  description: 'This is some description for this AI models...' },
    { name: 'LLM6',  description: 'This is some description for this AI models...' },
    { name: 'LLM7',  description: 'This is some description for this AI models...' },
    { name: 'LLM8',  description: 'This is some description for this AI models...' },
    { name: 'LLM9',  description: 'This is some description for this AI models...' },
    { name: 'LLM10', description: 'This is some description for this AI models...' },
  ];

const CompareLLM = () => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  // Handle model selection, toggling selected models
  const handleModelSelection = (model: string) => {
    setSelectedModels(prev =>
      prev.includes(model) ? prev.filter(item => item !== model) : [...prev, model]
    );
  };

  const handleCompareSubmit = () => {

    console.log('Selected Models for Comparison:', selectedModels);
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
            key={model.name}
            onClick={() => handleModelSelection(model.name)}
            className={`relative bg-white shadow-md rounded-lg p-6 transition-all transform cursor-pointer ${
              selectedModels.includes(model.name) ? 'border-4 border-blue-500' : ''
            } hover:shadow-lg`}
          >
            {/* Model Info */}
            <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
            <p className="text-gray-600 mb-4">{model.description}</p>
            {/* Selection Indicator */}
            <div className="flex items-center justify-between">
              {selectedModels.includes(model.name) ? (
                <FaCheckCircle className="text-blue-500 w-6 h-6" />
              ) : (
                <span className="text-gray-500">Select</span>
              )}

      {/* Toggle Switch with color transition */}
      <div className="flex items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedModels.includes(model.name)}
                      onChange={() => handleModelSelection(model.name)}
                      className="sr-only"
                    />
                    <div
                      className={`block w-10 h-6 rounded-full transition-colors ${
                        selectedModels.includes(model.name) ? 'bg-blue-500' : 'bg-gray-400'
                      }`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform ${
                        selectedModels.includes(model.name) ? 'translate-x-4' : ''
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
                {selectedModels.map((model) => (
                  <div key={model} className="bg-gray-100 p-2 rounded-lg">
                    {model}
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