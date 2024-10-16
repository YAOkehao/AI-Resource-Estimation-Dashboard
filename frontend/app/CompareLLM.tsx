import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { fetchAllModelInfo, compareLLM } from './api';
import ComparisonResult from './ComparisonResult'; // Import the ComparisonResult component

const CompareLLM = () => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [llmModels, setLlmModels] = useState<any[]>([]);
  const [comparisonResult, setComparisonResult] = useState<any>(null); // For storing comparison result

  // Fetch models from the API when the component mounts
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await fetchAllModelInfo();
        setLlmModels(data); // Store fetched model data
      } catch (err) {
        console.error('Error fetching models:', err); // Error handling
      }
    };

    fetchModels();
  }, []);

  // Handle model selection
  const handleModelSelection = (modelName: string) => {
    setSelectedModels((prev) =>
      prev.includes(modelName) ? prev.filter((item) => item !== modelName) : [...prev, modelName]
    );
  };

  // Handle the Compare button click event, call the compareLLM API
  const handleCompareSubmit = async () => {
    try {
      const result = await compareLLM(selectedModels);
      setComparisonResult(result.result);
    } catch (error) {
      console.error('Failed to compare models:', error);
    }
  };

    // Handle return to model selection
    const handleReturn = () => {
      setComparisonResult(null); // Clear the comparison result to allow another comparison
      setSelectedModels([]); // Reset selected models
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

        {comparisonResult ? (
          // Show the comparison result
          <>
            <ComparisonResult comparisonResult={comparisonResult} />
            <div className="text-center mt-6">
              {/* Return button */}
              <button
                onClick={handleReturn}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Return to Model Selection
              </button>
            </div>
          </>
        ) : (
          <>
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
                  {/* Display model information */}
                  <h3 className="text-xl font-semibold mb-2">{model.Name}</h3>
                  <p className="text-gray-600 mb-4">{model.Description}</p>     
 

                  {/* Selection indicator */}
                  <div className="flex items-center justify-between">
                    {selectedModels.includes(model.Name) ? (
                      <FaCheckCircle className="text-blue-500 w-6 h-6" />
                    ) : (
                      <span className="text-gray-500">Select</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Comparison Bar - Appears after selecting at least two models */}
            {selectedModels.length >= 2 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t-2 border-gray-200">
                <div className="flex justify-between items-center max-w-4xl mx-auto">
                  {/* Display selected models */}
                  <div className="flex space-x-4">
                    {selectedModels.map((modelName) => (
                      <div key={modelName} className="bg-gray-100 p-2 rounded-lg">
                        {modelName}
                      </div>
                    ))}
                  </div>
                  {/* Compare button */}
                  <button
                    onClick={handleCompareSubmit}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                  >
                    Compare
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default CompareLLM;