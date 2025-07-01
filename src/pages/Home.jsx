import { useState, useEffect } from "react";
import "./Home.scss";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5082/api/Posts/all", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching posts:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="home-container">Loading posts...</div>;

  if (error)
    return <div className="home-container">Error loading posts: {error}</div>;

  return (
    <div className="home-container">
      <div className="feed">
        <h2 className="feed-title">FOR YOU</h2>
        {posts.length === 0 ? (
          <p>No posts available yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <img
                src={post.imageUrl}
                alt={`Foto di ${post.catName || "cat"}`}
              />
              <div className="post-content">
                <h3>{post.catName || "Unknown Cat"}</h3>
                <p>{post.caption}</p>
                <span className="post-date">
                  {new Date(post.postedAt).toLocaleString()}
                </span>
                <div className="post-stats">
                  <span>👍 {post.likes || 0}</span>
                  <span>💬 {post.comments?.length || 0}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
