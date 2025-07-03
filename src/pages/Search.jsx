import { useEffect, useState } from "react";
import "./Search.scss";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      fetch(
        `https://catbook-api-ot8w.onrender.com/api/CatProfiles/search?query=${encodeURIComponent(
          query
        )}`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => setResults(data))
        .catch((err) => console.error("❌ Error fetching profiles:", err));
    }, 400); // debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name, breed, or age..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="results-grid">
        {results.map((profile) => (
          <div key={profile.id} className="profile-card">
            <h3>{profile.catName}</h3>
            <p>Breed: {profile.breed}</p>
            <p>Age: {profile.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
