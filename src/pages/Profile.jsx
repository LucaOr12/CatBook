import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./Profile.scss";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  if (!userData) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>👤 Access your Profile</h2>
        <p>Please log in with Google to view your profile.</p>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("✅ Login Success!");
            const idToken = credentialResponse.credential;

            fetch("http://localhost:5082/auth/google", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("✅ Dati utente:", data);
                setUserData(data);
              })
              .catch((err) => {
                console.error("❌ Errore invio token:", err);
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
      <p>Email: {userData.email}</p>
      {/* Mostra altri dati se vuoi */}
    </div>
  );
}
