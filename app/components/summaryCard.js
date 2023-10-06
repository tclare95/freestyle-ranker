'use client';
import { useState } from "react";

export default function SummaryCard({ rankings, onSave, onEdit }) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    onSave({ nickname, email, rankings });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4 text-center">Your Rankings</h2>

      {rankings.map((ranking, index) => (
        <div key={index} className="mb-4">
          {ranking.athletes.length === 0 ? (
            <div className="flex items-center mb-4">
            <span className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full mr-4">
              Skipped
            </span>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => onEdit(index)}
            >
              Add a choice
            </button>
          </div>
          ) : (
            <table className="min-w-full mb-4">
              <thead>
                <tr>
                  <th colSpan={2} className="px-4 py-2 text-left bg-gray-200">
                    {ranking.competition.label}
                  </th>
                  <th className="px-4 py-2 text-right bg-gray-200">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => onEdit(index)}
                    >
                      Edit my choices
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ranking.athletes.map((athlete, athleteIndex) => (
                  <tr key={`${index}-${athleteIndex}`}>
                    <td className="border px-4 py-2">{athleteIndex + 1}</td>
                    <td className="border px-4 py-2">{athlete?.label}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={athlete?.flag}
                        alt={`${athlete?.label} flag`}
                        className="w-5 h-5"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nickname:
        </label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex justify-end">
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
