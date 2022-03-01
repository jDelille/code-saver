import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import "./Home.scss";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import domain from "../../util/domain";

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [snippetEditorOpen, setSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { user } = useContext(UserContext);

  function clearEditSnippetData() {
    setEditSnippetData(null);
  }

  useEffect(() => {
    if (!user) setSnippets([]);
    else getSnippets();
  }, [user]);

  async function getSnippets() {
    const snippetsRes = await axios.get(`${domain}/snippet/`);
    setSnippets(snippetsRes.data);
  }

  function editSnippet(snippetData) {
    setEditSnippetData(snippetData);
    setSnippetEditorOpen(true);
  }

  function renderSnippets() {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedSnippets.map((snippet, i) => {
      return (
        <Snippet
          key={i}
          snippet={snippet}
          getSnippets={getSnippets}
          editSnippet={editSnippet}
        />
      );
    });
  }

  function searchSnippet() {
    let searchSnippets = [...snippets];
    let filteredSnippets = searchSnippets.filter(
      (item) =>
        item.title.toUpperCase().includes(search.toUpperCase()) ||
        item.category.toUpperCase().includes(search.toUpperCase()) ||
        item.description.toUpperCase().includes(search.toUpperCase()) ||
        item.code.toUpperCase().includes(search.toUpperCase())
    );

    return filteredSnippets.map((snippet, i) => {
      return (
        <Snippet
          key={i}
          snippet={snippet}
          getSnippets={getSnippets}
          editSnippet={editSnippet}
        />
      );
    });
  }

  console.log(snippets);

  let categoryArr = [];

  snippets.map((item) => {
    return categoryArr.push(
      item.category.charAt(0).toUpperCase() +
        item.category.substring(1).toLowerCase()
    );
  });
  let categorySet = [...new Set(categoryArr)];
  console.log(categorySet);

  console.log(categoryArr)
  categoryArr.map((count) => {
    return console.log(count)
  })

  return (
    <div className="home">
      {!snippetEditorOpen && user && (
        <div className="content">
          <div className="control-bar">
            <p className="snippets-length">
              You have {snippets.length} Snippets
            </p>
            <div className="search-controls">
              <input
                type="search"
                placeholder="Search for snippet"
                className="search-bar"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className="add-btn"
              onClick={() => setSnippetEditorOpen(true)}
            >
              Add
            </button>
            <div className="show-tech">
            <p> Languages you use: </p>
              {categorySet.map((item, index) => {
                return (
                  <div className="category-box" key={index}>
                    <p>{item}</p>
                    <p></p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="home-controls">
            <div className="snippet-container">
              <h1> {search.length > 0 ? searchSnippet() : ""}</h1>
              {snippets.length > 0
                ? renderSnippets()
                : user && (
                    <p className="no-snippets-msg">
                      You have not added any snippets yet.
                    </p>
                  )}
            </div>
          </div>
        </div>
      )}

      {snippetEditorOpen && (
        <SnippetEditor
          setSnippetEditorOpen={setSnippetEditorOpen}
          getSnippets={getSnippets}
          editSnippetData={editSnippetData}
          clearEditSnippetData={clearEditSnippetData}
        />
      )}
      {user === null && (
        <div className="home-text">
          <h2> Welcome to Shmagity </h2>
          <p> Save lines of code to reuse in your projects. </p>
          <p>Free to use. Just create an account and start saving some code!</p>
          <Link to="/register" className="register-link-home">
            Register Here
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
