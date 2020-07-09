import React from "react";
import "./Result.css";
function Result({
  name,
  userName,
  inputValue,
  avatar,
  follows,
  following,
  repoCount,
  htmlUrl,
  err,
  getRepos,
  repData,
}) {
  return (
    <>
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
            <p className="result__info">Public repos: {repoCount}</p>
          </div>

          <a
            href={htmlUrl}
            className="result__user-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Profile
          </a>
          <button className="result__button" onClick={getRepos}>
            Get repos
          </button>
        </div>
      )}
      <div className="repos">
        <h2 className="repos__title">Repositories</h2>
        {repData.map((repo) => (
          <div className="repos__item" key={repo.id}>
            <p className="repos__info">Name:{repo.name}</p>
            <p className="repos__info">Default branch: {repo.default_branch}</p>
            <p className="repos__info">Forks: {repo.forks_count}</p>
            <a
              className="repos__link"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to repo
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
export default Result;
