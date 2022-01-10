import axios from "axios";
import React from "react";
import "./Snippet.scss";

function Snippet({ snippet, getSnippets, editSnippet }) {
  async function deleteSnippet() {
    if (window.confirm("Do you want to delete this snippet?"))
    await axios.delete(`http://localhost:5000/snippet/${snippet._id}`);

    getSnippets();
  }

  return (
    <div className="snippet">
      {snippet.title && <h2 className="title">{snippet.title}</h2>}
      {snippet.description && (
        <p className="description">{snippet.description}</p>
      )}
      {snippet.code && (
        <pre className="code">
          <code>{snippet.code}</code>
        </pre>
      )}
      <button className="edit-btn" onClick={() => editSnippet(snippet)}>
        Edit
      </button>
      <button className="delete-btn" onClick={deleteSnippet}>
        Delete
      </button>
    </div>
  );
}

export default Snippet;
