export default function HomePage({ onStart }) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome to Athlete Selector!</h1>
        <p className="text-center mb-8">
          Here, you can select your ranking of the top athletes for the different competitions at the freestyle world championships. 
        </p>

        <p className="text-center mb-8">
            You'll be able to see how your rankings compare to the actual results after the competition is over, and at intermediate stages in the competition such as after prelims and semis

        </p>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          onClick={onStart}
        >
          Select Your Athletes
        </button>
      </div>
    );
  }
  