import axios from "axios";
import React from "react";
import "./Snippet.scss";
import domain from "../../util/domain";

function Snippet({ snippet, getSnippets, editSnippet }) {
  async function deleteSnippet() {
    if (window.confirm("Do you want to delete this snippet?"))
      await axios.delete(`${domain}/snippet/${snippet._id}`);

    getSnippets();
  }

  return (
    <div className="snippet">
      {snippet.title && (
        <h2 className="title">
          <span>Title: </span>
          <br />
          {snippet.title}
        </h2>
      )}
      {snippet.category && (
        <h2 className="category">
          <span>Category: </span> <br /> {snippet.category}
        </h2>
      )}
      {snippet.description && (
        <p className="description">
          <span>Description: </span> <br />
          {snippet.description}
        </p>
      )}
      {snippet.code && (
        <pre className="code">
          <code>
            <span>Code: </span> <br />
            {snippet.code}
          </code>
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
