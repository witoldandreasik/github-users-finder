import React, { useState, useEffect } from "react";
import Result from "../result/Result";
import "./Form.css";

function Form() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [follows, setFollows] = useState("");
  const [following, setFollowing] = useState("");
  const [repoCount, setRepoCount] = useState("");
  const [htmlUrl, setHtmlUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [err, setErr] = useState(null);
  const [repData, setRepData] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/witoldandreasik")
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
    setRepoCount(public_repos);
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
  const getRepos = async () => {
    const profile = await fetch(`https://api.github.com/users/${userName}`);
    const profileJson = await profile.json();
    const repos = await fetch(profileJson.repos_url);
    const reposJson = await repos.json();
    console.log(reposJson);
    if (profileJson) {
      setRepData(reposJson);
    }
  };
  return (
    <>
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

      <Result
        name={name}
        userName={userName}
        inputValue={inputValue}
        avatar={avatar}
        follows={follows}
        following={following}
        repoCount={repoCount}
        htmlUrl={htmlUrl}
        err={err}
        getRepos={getRepos}
        repData={repData}
      />
    </>
  );
}

export default Form;
