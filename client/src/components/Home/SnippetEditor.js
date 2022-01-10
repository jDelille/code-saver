import React, { useState, useEffect } from "react";
import axios from "axios";
import './SnippetEditor.scss'

function SnippetEditor({ getSnippets, setSnippetEditorOpen, editSnippetData }) {
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorCode, setEditorCode] = useState("");

  useEffect(() => {
    if (editSnippetData) {
      setEditorTitle(editSnippetData.title ? editSnippetData.title : "");
      setEditorDescription(
        editSnippetData.description ? editSnippetData.description : ""
      );
      setEditorCode(editSnippetData.code ? editSnippetData.code : "");
    }
  }, [editSnippetData]);

  async function saveSnippet(e) {
    e.preventDefault();

    const snippetData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      code: editorCode ? editorCode : undefined,
    };

    if (!editSnippetData) {
     await axios.post("http://localhost:5000/snippet/", snippetData);
    } else {
     await axios.put(`http://localhost:5000/snippet/${editSnippetData._id}`, snippetData)
    }
    getSnippets();
    closeEditor();
  }

  function closeEditor() {
    setSnippetEditorOpen(false);
    setEditorCode("");
    setEditorDescription("");
    setEditorTitle("");
  }

  return (
    <div className="snippet-editor">
      <form className="form" onSubmit={saveSnippet}>
        <label htmlFor="editor-title"> Title </label>
        <input
          type="text"
          id="editor-title"
          value={editorTitle}
          onChange={(e) => setEditorTitle(e.target.value)}
        />
        <label htmlFor="editor-description"> Description </label>
        <input
          type="text"
          id="editor-description"
          value={editorDescription}
          onChange={(e) => setEditorDescription(e.target.value)}
        />
        <label htmlFor="editor-code"> Code </label>
        <textarea
          type="text"
          id="editor-code"
          value={editorCode}
          onChange={(e) => setEditorCode(e.target.value)}
        />
        <button className="save-btn" type="submit">
          Save
        </button>
        <button type="button" className="cancel-btn" onClick={closeEditor}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default SnippetEditor;
