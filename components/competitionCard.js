'use client'
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });
import { useState, useEffect } from 'react';

export default function CompetitionCard({ competition, athletes, onSkip, onSave, initialSelectedAthletes  }) {
    const [selectedAthletes, setSelectedAthletes] = useState(initialSelectedAthletes || Array(5).fill(null));
  useEffect(() => {
    // Reset the selected athletes when the competition changes
    setSelectedAthletes(Array(5).fill(null));
    if (initialSelectedAthletes) {
        setSelectedAthletes(initialSelectedAthletes);
      }
  }, [competition]);

  const handleAthleteChange = (selected, index) => {
    setSelectedAthletes(prev => {
      const newSelection = [...prev];
      newSelection[index] = selected;
      return newSelection;
    });
  };

  const getAvailableOptions = (currentIndex) => {
    return athletes.filter(
      athlete => !selectedAthletes.some(
        (selected, index) => selected && index !== currentIndex && selected.value === athlete.value
      )
    );
  };

  const resetSelections = () => {
    setSelectedAthletes(Array(5).fill(null));
  };

  const handleSave = () => {
    onSave(selectedAthletes);
    resetSelections();
  };

  const ranks = ['1st', '2nd', '3rd', '4th', '5th'];

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-96">
      <h2 className="text-xl font-bold mb-4 text-center">{competition.label}</h2>

      {ranks.map((rank, index) => (
        <div key={rank} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {rank} Place:
          </label>
          <Select
            className="text-sm"
            options={getAvailableOptions(index)}
            value={selectedAthletes[index]}
            onChange={(selected) => handleAthleteChange(selected, index)}
            isClearable
            isSearchable
            openMenuOnClick={false}
            formatOptionLabel={(data) => (
              <>
                <img src={data.flag} alt={data.label + " flag"} className="inline mr-2" />
                {data.label}
              </>
            )}
          />
        </div>
      ))}

      <div className="flex justify-between">
        <button 
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
          onClick={onSkip}
        >
          Skip
        </button>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
