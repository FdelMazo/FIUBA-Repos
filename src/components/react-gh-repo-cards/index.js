import React from "react";
import styles from "./styles.module.css";
import colors from "./github-utils/colors.json";
import { ReactComponent as RepoIcon } from "./github-utils/repo.svg";
import { ReactComponent as StarIcon } from "./github-utils/star.svg";
import { ReactComponent as ForkIcon } from "./github-utils/fork.svg";

export default ({
  repoDetails,
}) => {
  return (
    <div className={styles["row"]}>
      {repoDetails.map((detail) => {
        const { user, repoName, showFullTitle = true, repoData } = detail;

        return (
          <div
            className={[
              styles["padding-left"],
              styles["padding-right"],
              styles["col-12"],
              styles["col-md-6"],
              styles["col-lg-6"],
              styles["mb-3"],
            ].join(" ")}
          >
            <RepoCard
              key={user + repoName}
              user={user}
              repo={repoName}
              showFullTitle={showFullTitle}
              data={repoData}
            />
          </div>
        );
      })}
    </div>
  );
};

const RepoCard = ({ user, repo, showFullTitle, data }) => {

  return (
    <div className={styles["main-content"]}>
      <div>
        <RepoIcon className={[styles["svg"], styles["mr-2"]].join(" ")} />
        <a
          className={styles["repo-header"]}
          target="blank"
          href={`https://github.com/${user}/${repo}`}
        >
          {showFullTitle ? `${user}/${repo}` : repo}
        </a>
      </div>
      <p className={[styles["mt-2"], styles["mb-3"]].join(" ")}>
        {data.description}
      </p>
      <p style={{ fontSize: "12px" }}>
        <span className={styles["mr-3"]}>
          <span
            className={styles["lang-color"]}
            style={{ backgroundColor: colors[data.language] }}
          ></span>{" "}
          {data.language}
        </span>
        {data.stargazers_count > 0 ? (
          <a
            className={styles["github-icon"]}
            target="blank"
            href={`https://github.com/${user}/${repo}/stargazers`}
          >
            <StarIcon className={styles["svg"]} /> {data.stargazers_count}
          </a>
        ) : null}
        {data.forks_count > 0 ? (
          <a
            className={[
              styles["github-icon"],
              data.stargazers_count > 0 ? styles["ml-3"] : "",
            ].join(" ")}
            target="blank"
            href={`https://github.com/${user}/${repo}/network`}
          >
            <ForkIcon className={styles["svg"]} /> {data.forks_count}
          </a>
        ) : null}
      </p>
    </div>
  );
};
