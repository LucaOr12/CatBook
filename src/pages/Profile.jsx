import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./Profile.scss";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    catName: "",
    breed: "",
    age: "",
    bio: "",
  });

  useEffect(() => {
    fetch("http://localhost:5082/api/Users/loggedUser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5082/api/CatProfiles", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        catName: form.catName,
        breed: form.breed,
        age: parseInt(form.age),
        bio: form.bio,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error in creating Cat Profile");
        return res.json();
      })
      .then(() => {
        setShowModal(false);
        return fetch("http://localhost:5082/api/Users/loggedUser", {
          credentials: "include",
        });
      })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error("❌", err));
  };

  if (!userData)
    return (
      <div className="google-login">
        <h2>👤 Access your Profile</h2>
        <p>Please log in with Google to view your profile.</p>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const idToken = credentialResponse.credential;
            fetch("http://localhost:5082/auth/google", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
              credentials: "include",
            })
              .then(() => {
                window.location.reload();
              })
              .catch((err) => {
                console.error("❌ Login error:", err);
              });
          }}
          onError={() => {
            console.log("❌ Login Failed");
          }}
        />
      </div>
    );

  const postsCount = userData?.profile?.posts?.length || 0;
  const totalLikes = userData?.profile?.posts?.reduce(
    (sum, post) => sum + (post.likes || 0),
    0
  );
  return (
    <div className="profile-container">
      <h2>🐾 Welcome, {userData.displayName}</h2>

      {!userData.profile ? (
        <>
          <button onClick={() => setShowModal(true)}>
            ➕ Create Cat Profile
          </button>

          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>🐱 Create your Profile!</h3>
                <form onSubmit={handleSubmit}>
                  <label>Name:</label>
                  <input
                    name="catName"
                    value={form.catName}
                    onChange={handleChange}
                    required
                  />

                  <label>Breed:</label>
                  <input
                    name="breed"
                    value={form.breed}
                    onChange={handleChange}
                    required
                  />

                  <label>Age:</label>
                  <input
                    name="age"
                    type="number"
                    min="0"
                    value={form.age}
                    onChange={handleChange}
                    required
                  />

                  <label>Bio:</label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    required
                  />

                  <br />
                  <div className="form-buttons">
                    <button type="button" onClick={() => setShowModal(false)}>
                      Exit
                    </button>
                    <button type="submit">Save</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="cat-profile">
          <div className="profile-header">
            <div className="profile-pic">
              <img src="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D" />
            </div>
            <div className="profile-info">
              <h2>{userData.profile.catName}</h2>
              <div className="stats">
                <span>
                  <strong>{postsCount}</strong> posts
                </span>
                <span>
                  <strong>{totalLikes}</strong> likes
                </span>
              </div>
              <p className="bio">{userData.profile.bio}</p>
              <p className="details">
                <strong>Breed:</strong> {userData.profile.breed} •{" "}
                <strong>Age:</strong> {userData.profile.age}
              </p>
            </div>
          </div>

          <hr />
          <div className="profile-posts">
            {userData.profile.posts && userData.profile.posts.length > 0 ? (
              <div className="posts-grid">
                {userData.profile.posts.map((post, idx) => (
                  <div className="post-card" key={idx}>
                    <img
                      src={post.imageUrl}
                      alt={post.caption}
                      className="post-image"
                    />
                    <p className="post-caption">{post.caption}</p>
                    <span className="post-date">
                      {new Date(
                        post.postedAt || Date.now()
                      ).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <h4>📭 No posts yet. Start sharing your cat's adventures!</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
