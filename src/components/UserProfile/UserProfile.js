import React, { useState, useEffect, Suspense } from "react";
import "./UserProfile.css";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
const Result = React.lazy(() => import("../Result/Result"));
function UserProfile() {
  const [userName, setUserName] = useState("");
  const [repositoriesData, setRepositoriesData] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
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
    }
    fetchData();
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
      <Suspense fallback={<LoadingIndicator />}>
        <Result
          profileData={profileData}
          repositoriesData={repositoriesData}
          error={error}
        />
      </Suspense>
    </>
  );
}

export default UserProfile;
