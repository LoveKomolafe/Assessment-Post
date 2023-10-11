import React from "react";
import axios from "axios";

function DeletePosts({ postId, onDelete }) {
  const handleDelete = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(() => {
        onDelete(postId);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeletePosts;
