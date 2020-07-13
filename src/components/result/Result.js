import React from "react";
import "./Result.css";
function Result({ profileData, repositoriesData, error }) {
  return (
    <>
      {error ? (
        <h1 className="result__not-found">{`User ${error.toLowerCase()}`}</h1>
      ) : (
        <>
          <div className="result">
            <img
              className="result__avatar"
              src={profileData.avatar_url}
              alt="github avatar"
            />
            <h2 className="result__name">{profileData.name}</h2>
            <h3 className="result__user-name">{profileData.login}</h3>
            <div>
              <p className="result__info">Followers: {profileData.followers}</p>
              <p className="result__info">Following: {profileData.following}</p>
              <p className="result__info">
                Public repos: {profileData.public_repos}
              </p>
            </div>

            <a
              href={profileData.html_url}
              className="result__user-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Profile
            </a>
          </div>
          <div className="repos">
            <h2 className="repos__title">Repositories</h2>
            {repositoriesData.map((repository) => (
              <div className="repos__item" key={repository.id}>
                <h3 className="repos__name">Name: {repository.name}</h3>
                <p className="repos__info">
                  Default branch: {repository.default_branch}
                </p>
                <p className="repos__info">
                  Watchers: {repository.watchers_count}
                </p>
                <p className="repos__info">Forks: {repository.forks_count}</p>
                <a
                  className="repos__link"
                  href={repository.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to repo
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
export default Result;
