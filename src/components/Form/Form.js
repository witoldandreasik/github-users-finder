import React, { useState, useEffect } from "react";
import "./Form.css";

function Form() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [follows, setFollows] = useState("");
  const [following, setFollowing] = useState("");
  const [repositories, setRepositories] = useState("");
  const [htmlUrl, setHtmlUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((userData) => getUserData(userData));
  }, []);

  const getUserData = ({
    name,
    login,
    avatar_url,
    followers,
    following,
    public_repos,
    created_at,
    html_url,
  }) => {
    setName(name);
    setUserName(login);
    setAvatar(avatar_url);
    setFollows(followers);
    setFollowing(following);
    setRepositories(public_repos);
    setHtmlUrl(html_url);
  };

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://api.github.com/users/${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setErr(data.message);
        } else {
          setErr(null);
          getUserData(data);
        }
      })
      .catch(console.log(err));
  };

  const getRepos = () => {};

  return (
    <div className="container">
      <div className="search">
        <form className="search__form" onSubmit={handleSubmit}>
          <input
            className="search__input"
            type="text"
            placeholder="Search"
            onChange={handleInputValue}
            // onKeyPress={handleSubmit}
          />
          <button className="search__button">Search</button>
        </form>
      </div>
      {err ? (
        <h1 className="result__not-found">{`${inputValue} ${err.toLowerCase()}`}</h1>
      ) : (
        <div className="result">
          <img className="result__avatar" src={avatar} alt="github avatar" />
          <h2 className="result__name">{name}</h2>
          <h3 className="result__user-name">{userName}</h3>
          <div>
            <p className="result__info">Followers: {follows}</p>
            <p className="result__info">Following: {following}</p>
            <p className="result__info">Public repos: {repositories}</p>
          </div>

          <a
            href={htmlUrl}
            className="result__user-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Profile
          </a>
          <button className="result__button-repos" onClick={getRepos}>
            Get repos
          </button>
        </div>
      )}
    </div>
  );
}

export default Form;
