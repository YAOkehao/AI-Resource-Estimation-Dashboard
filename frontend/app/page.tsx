"use client"
import { useState } from 'react';
import RecommendLLM from './RecommendLLM';
import CompareLLM from './CompareLLM';
const MainPage = () => {
  const [activeTab, setActiveTab] = useState('recommend'); // Set the initial state to the recommended page
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">AI Dashboard</h1>
        {/* Tab Switch Button */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('recommend')}
            className={`px-4 py-2 rounded-md font-semibold focus:outline-none ${
              activeTab === 'recommend'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Recommended AI Model
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-4 py-2 rounded-md font-semibold focus:outline-none ${
              activeTab === 'compare'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Comparing AI models
          </button>
        </div>
        {/* Tab Content */}
        {activeTab === 'recommend' && <RecommendLLM />}
        {activeTab === 'compare' && <CompareLLM />}
      </div>
    </div>
  );
};
export default MainPage;