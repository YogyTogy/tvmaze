import React, { useEffect, useState } from 'react';

const App = () => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.log('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, []);

  const fetchSummary = async (showId) => {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
      const data = await response.json();
      const newSummary = data.summary.replace(/(<([^>]+)>)/ig, '')
      setSelectedShow(newSummary);
    } catch (error) {
      console.log('Error fetching show summary:', error);
    }
  };

  const closeSummary = () => {
    setSelectedShow(null);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">TV Show Cards</h1>
      <div className="flex flex-wrap">
        {shows.map((show) => (
          <div key={show.show.id} className="max-w-sm rounded overflow-hidden shadow-lg m-2">
            <img src={show.show.image?.medium || 'placeholder-image-url'} alt={show.show.name} className="w-full" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{show.show.name}</div>
              <p className="text-gray-700 text-base">{show.show.genres.join(', ')}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => fetchSummary(show.show.id)}
              >
                Show Summary
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedShow && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="h-96 w-96 max-w-md bg-white rounded p-4">
            <h2 className="text-2xl font-bold mb-2">Summary</h2>
            <p>{selectedShow}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={closeSummary}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
