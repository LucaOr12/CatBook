import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./Profile.scss";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5082/api/Users/loggedUser", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Authenticated user:", data);
        setUserData(data);
      })
      .catch(() => {
        setUserData(null);
      });
  }, []);

  if (!userData) {
    return (
      <div style={{ padding: "2rem" }}>
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
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🐾 Welcome, {userData.displayName}</h2>
    </div>
  );
}
