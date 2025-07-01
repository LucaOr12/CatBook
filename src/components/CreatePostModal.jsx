import { useState } from "react";
import "./CreatePostModal.scss";

export default function CreatePostModal({ onClose, onPostCreated }) {
  const [form, setForm] = useState({
    imageUrl: "",
    caption: "",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5082/api/Posts", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: form.imageUrl,
        caption: form.caption,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create post");
        return res.json();
      })
      .then((data) => {
        onPostCreated(data); // callback to refresh post list
        onClose();
      })
      .catch((err) => console.error("❌ Post creation error:", err));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>📸 Create New Post</h3>
        <form onSubmit={handleSubmit}>
          <label>Image URL:</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/cute-cat.jpg"
            required
          />

          <label>Caption:</label>
          <textarea
            name="caption"
            value={form.caption}
            onChange={handleChange}
            placeholder="What's your cat thinking?"
            required
          />

          <div className="form-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}
