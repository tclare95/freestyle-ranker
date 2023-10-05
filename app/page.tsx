"use client";
import { useState, useEffect } from "react";
import CompetitionCard from "../components/CompetitionCard";
import SummaryCard from "../components/SummaryCard";
import HomePage from "../components/HomePage";

export default function Page() {
  const competitions = [
    {
      id: "mens_squirt",
      label: "Mens Squirt",
      athletes: [
        {
          value: "athlete1_mens_squirt",
          label: "John Doe",
          flag: "https://flagsapi.com/US/flat/32.png",
        },
        // ... other athletes specific to Mens Squirt
      ],
    },
    {
      id: "womens_squirt",
      label: "Womens Squirt",
      athletes: [
        {
          value: "athlete1_womens_squirt",
          label: "Jane Smith",
          flag: "https://flagsapi.com/BE/flat/32.png",
        },
        // ... other athletes specific to Womens Squirt
      ],
    },
    // ... add other competitions as needed
  ];

  const [currentCompetitionIndex, setCurrentCompetitionIndex] = useState(0);
  const [allRankings, setAllRankings] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showHomePage, setShowHomePage] = useState(true);

  const startSelection = () => {
    setShowHomePage(false);
  };

  useEffect(() => {
    // This code will run every time currentCompetitionIndex changes
    // Here, you can set the initial values for the CompetitionCard component
    // based on the updated currentCompetitionIndex

    // For example:
    const initialSelectedAthletes =
      allRankings[currentCompetitionIndex]?.athletes;
    // Now, you can use initialSelectedAthletes to set the initial values for the CompetitionCard component
  }, [currentCompetitionIndex]);

  const handleSave = (selectedAthletes) => {
    setAllRankings((prevRankings) => {
      // Check if the rankings for the current competition already exist
      const existingRankingIndex = prevRankings.findIndex(
        (ranking) =>
          ranking.competition.id === competitions[currentCompetitionIndex].id
      );

      // If they do, update them
      if (existingRankingIndex !== -1) {
        const updatedRankings = [...prevRankings];
        updatedRankings[existingRankingIndex] = {
          competition: competitions[currentCompetitionIndex],
          athletes: selectedAthletes,
        };
        return updatedRankings;
      }

      // Otherwise, append the new rankings
      return [
        ...prevRankings,
        {
          competition: competitions[currentCompetitionIndex],
          athletes: selectedAthletes,
        },
      ];
    });

    if (currentCompetitionIndex < competitions.length - 1) {
      setCurrentCompetitionIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleEdit = (competitionIndex: number) => {
    // Logic to edit the choices for the given competition
    console.log("Edit competition", competitionIndex);
    setCurrentCompetitionIndex(competitionIndex);
    setShowSummary(false);

    console.log(currentCompetitionIndex);
    console.log(allRankings[0]);
    console.log(allRankings[competitionIndex]);
  };

  const handleSummarySave = (data: any) => {
    console.log(data); // Handle the data as needed
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {showHomePage ? (
        <HomePage onStart={startSelection} />
      ) : !showSummary ? (
        <CompetitionCard
          key={competitions[currentCompetitionIndex].id}
          competition={competitions[currentCompetitionIndex]}
          athletes={competitions[currentCompetitionIndex].athletes}
          onSkip={() => handleSave([])}
          onSave={handleSave}
          initialSelectedAthletes={
            allRankings[currentCompetitionIndex]?.athletes
          }
        />
      ) : (
        <SummaryCard
          onEdit={handleEdit}
          rankings={allRankings}
          onSave={handleSummarySave}
        />
      )}
    </div>
  );
}
