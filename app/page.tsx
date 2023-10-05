"use client";
import { useState, useEffect } from "react";
import CompetitionCard from "./components/CompetitionCard";
import SummaryCard from "./components/SummaryCard";
import HomePage from "./components/HomePage";

export default function Page() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCompetitionIndex, setCurrentCompetitionIndex] = useState(0);
  const [allRankings, setAllRankings] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showHomePage, setShowHomePage] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch("/api/get-data") // replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCompetitions(data.competitions);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const startSelection = () => {
    setShowHomePage(false);
  };

  useEffect(() => {
    const initialSelectedAthletes =
      allRankings[currentCompetitionIndex]?.athletes;
  }, [currentCompetitionIndex]);

  const handleSave = (selectedAthletes) => {
    setAllRankings((prevRankings) => {
      const existingRankingIndex = prevRankings.findIndex(
        (ranking) =>
          ranking.competition.id === competitions[currentCompetitionIndex].id
      );

      if (existingRankingIndex !== -1) {
        const updatedRankings = [...prevRankings];
        updatedRankings[existingRankingIndex] = {
          competition: competitions[currentCompetitionIndex],
          athletes: selectedAthletes,
        };
        return updatedRankings;
      }

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

  const handleEdit = (competitionIndex) => {
    setCurrentCompetitionIndex(competitionIndex);
    setShowSummary(false);
  };

  const handleSummarySave = (data) => {
    console.log(data);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (competitions === null ) {
    return <div>No competitions available.</div>;
  }

  return (
    <div className="flex justify-center items-center">
      {showHomePage ? (
        <HomePage onStart={startSelection} />
      ) : !showSummary && competitions.length > 0 ? (
        <CompetitionCard
          key={competitions[currentCompetitionIndex].competition_id}
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
