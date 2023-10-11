import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditPosts from "./Component/EditPosts";
import DeletePosts from "./Component/DeletePosts";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleEditClick = (post) => {
    setSelectedPost(post);
  };

  const handleSave = (editedPost) => {
    // Implementing logic to save the edited post

    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === editedPost.id ? editedPost : post))
    );
    setSelectedPost(null); // Clearing the selected post after saving.
  };

  const handleDeleteClick = (postId) => {
    // Calling API to delete the post
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(() => {
        // Remove the post from the state by filtering
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button
              onClick={() => handleEditClick(post)}
              className="edit-button"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(post.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {selectedPost && <EditPosts post={selectedPost} onSave={handleSave} />}
      <DeletePosts postId={selectedPost?.id} onDelete={handleDeleteClick} />
    </div>
  );
}
