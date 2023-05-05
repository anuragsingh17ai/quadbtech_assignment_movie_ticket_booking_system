import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

export function HomePage() {
    const [shows, setShows] = useState([]);
  
    useEffect(() => {
      fetch('https://api.tvmaze.com/search/shows?q=all')
        .then(response => response.json())
        .then(data => setShows(data));
    }, []);
  
    return (
      <div className="min-h-full bg-gray-100">
        <h1 className="font-bold text-4xl p-3">TV Shows</h1>
        <ul className="grid md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-3 p-3">
          {shows.map(show => (
            <li key={show.show.id} >
              <Link to={`/show/${show.show.id}`} >
                <img src={show.show.image?.medium} alt={show.show.name} className="rounded-lg mt-4 " />
                <h2 className="text-black font-bold">{show.show.name}</h2>
                <p className="text-gray-400">{show.show.genres.join(', ')}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }