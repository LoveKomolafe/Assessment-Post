import React, { useState } from "react";

function EditPosts({ post, onSave }) {
  const [editedPost, setEditedPost] = useState(post);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  const handleSave = () => {
    onSave(editedPost);
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <input
        type="text"
        name="title"
        value={editedPost.title}
        onChange={handleInputChange}
      />
      <textarea
        name="body"
        value={editedPost.body}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default EditPosts;
