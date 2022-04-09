import React from "react";
import { DataContext } from "../Contexts";
import RepoCards from "./react-gh-repo-cards";

const Repos = () => {
  const { repos } = React.useContext(DataContext);
  // Inicialmente 8 repos de #fiuba al azar
  // un estilo de carusel que pone unos 8~10 repos
  // ver como implementar el lazy load... que va a ser lo mas jodido
  // aprovechar que tiene parametro Loading el coso este

  return (
    <>
      {repos.length > 0 && (
        <RepoCards
          repoDetails={repos.map(r => ({
            ...r,
            showFullTitle: true,
          }))}
        />
      )}


    </>
  );
};

export default Repos;
