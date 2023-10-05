import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// Helper function to get the flag URL based on the country
const getFlagURL = (country: string) => {
  const countryToCode: { [key: string]: string } = {
    "Great Britain": "GB",
    Germany: "DE",
    Japan: "JP",
    "United States": "US",
    Norway: "NO",
    Ireland: "IE",
    Canada: "CA",
    // ... add other countries as needed
  };

  const countryCode = countryToCode[country];
  return `https://flagsapi.com/${countryCode}/flat/32.png`;
};

export async function GET(request: Request) {
  try {
    const result = [];

    // Fetch competitions
    const competitions = await sql`SELECT * FROM competitions`;

    for (let competition of competitions.rows) {
      const athletes = await sql`
        SELECT * FROM athletes WHERE competition_id=${competition.competition_id}
      `;

      const formattedAthletes = athletes.rows.map((athlete) => {
        return {
          value: `athlete${athlete.athlete_id}_${competition.label.toLowerCase().replace(/\s+/g, '_')}`,
          label: athlete.name,
          flag: getFlagURL(athlete.nationality),
        };
      });

      result.push({
        id: competition.label.toLowerCase().replace(/\s+/g, '_'),
        label: competition.label,
        athletes: formattedAthletes, // Use the formatted athletes here
      });
    }

    return NextResponse.json({ competitions: result }, { status: 200 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
