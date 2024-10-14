import { useState } from 'react';

const llmModels = ['LLM1', 'LLM2', 'LLM3', 'LLM4', 'LLM5', 'LLM6', 'LLM7', 'LLM8', 'LLM9', 'LLM10'];

const CompareLLM = () => {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleModelSelection = (model: string) => {
    setSelectedModels(prev =>
      prev.includes(model) ? prev.filter(item => item !== model) : [...prev, model]
    );
  };

  const handleCompareSubmit = () => {
    // business logic
    console.log('Selected Models:', selectedModels);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Comparing AI models</h2>
      <h3 className="text-lg font-medium mb-2">Select models to compare</h3>
      <div className="mb-4">
        {llmModels.map(model => (
          <label key={model} className="block mb-2">
            <input
              type="checkbox"
              value={model}
              onChange={() => handleModelSelection(model)}
              className="mr-2"
            />
            {model}
          </label>
        ))}
      </div>

      <button
        onClick={handleCompareSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Show Result
      </button>
    </div>
  );
};

export default CompareLLM;