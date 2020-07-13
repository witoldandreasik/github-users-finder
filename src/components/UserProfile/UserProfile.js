import React, { useState, useEffect } from "react";
import Result from "../Result/Result";
import "./UserProfile.css";

function UserProfile() {
  const [userName, setUserName] = useState("");
  const [repositoriesData, setRepositoriesData] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState(undefined);

  useEffect(async () => {
    const profileData = await fetch(
      `https://api.github.com/users/witoldandreasik`
    );
    const profileDataJson = await profileData.json();

    const repos = await fetch(profileDataJson.repos_url);
    const reposJson = await repos.json();

    if (profileDataJson) {
      setProfileData(profileDataJson);
      setRepositoriesData(reposJson);
    }
  }, []);

  const handleInputValue = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = await fetch(`https://api.github.com/users/${userName}`);
    const profileDataJson = await profileData.json();
    if (profileDataJson.message) {
      setError(profileDataJson.message);
    } else {
      const repos = await fetch(profileDataJson.repos_url);
      const reposJson = await repos.json();
      setError(null);
      if (profileDataJson) {
        setProfileData(profileDataJson);
        setRepositoriesData(reposJson);
      }
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
          />
          <button className="search__button">Search</button>
        </form>
      </div>
      {console.log(error)}
      <Result
        profileData={profileData}
        repositoriesData={repositoriesData}
        error={error}
      />
    </>
  );
}

export default UserProfile;
