import { useState, useEffect } from "react";
import "./Home.scss";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          "https://catbook-api-ot8w.onrender.com/api/Posts/all",
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("❌ Error fetching posts:", err);

        try {
          const fallbackResp = await fetch("/posts-fallback.json");
          if (!fallbackResp.ok) throw new Error("Failed to fetch fallback");

          const fallbackData = await fallbackResp.json();
          setPosts(fallbackData);
        } catch (fallbackErr) {
          console.error("❌ Error loading fallback posts:", fallbackErr);
          setError("Error loading fallback posts");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
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
              <img src={post.imageUrl} alt={`of ${post.catName || "cat"}`} />
              <div className="post-content">
                <h3>{post.catName || "Unknown Cat"}</h3>
                <p>{post.caption}</p>
                <span className="post-date">
                  {new Date(post.postedAt).toLocaleString()}
                </span>
                <div className="post-stats">
                  <span>👍 {post.likes || 0}</span>
                  <span>💬 {post.comments?.length || post.comments || 0}</span>
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
