import React, { useEffect, useState } from 'react';



const NewPage = () => {

  const [shows, setShows] = useState([]);
  useEffect(() => {
    const fetchShows = async (id) => {
      try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${id}`);
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.log('Error fetching shows:', error);
      }
    };
  
    fetchShows();
  }, []);

  return (
    <div>
      {shows.map((show) => (
        <p>{show.show.summary}</p>
      ))}
    </div>
  );
};

export default NewPage;
