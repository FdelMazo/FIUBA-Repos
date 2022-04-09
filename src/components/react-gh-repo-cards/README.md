# react-gh-repo-cards

[![NPM Version](https://img.shields.io/npm/v/react-gh-repo-cards.svg?style=flat)](https://www.npmjs.com/package/react-gh-repo-cards) [![](https://img.shields.io/npm/dm/react-gh-repo-cards.svg?style=flat)](https://www.npmjs.com/package/react-gh-repo-cards)

Perfect github repo cards!

## Installation

```bash
npm install react-gh-repo-cards # npm
yarn add react-gh-repo-cards # yarn
```

## Features

- **NO** external dependencies.
- Oh, Did I say, it's responsive? Yes it is! Just drop this component wherever you want, And it tries it's best to fit itself there.
- Looks exactly same as GitHub pinned repository cards (including hyper-links).
- Simple to use.

## Customizations

There are two props **`Loading`**, **`Error`** components to over-ride default components.

```jsx
<RepoCards
  repoDetails={...}
  Loading={CustomLoadingComponent}
  Error={CustomErrorComponent}
/>
```

## Usage

```jsx
import RepoCards from "react-gh-repo-cards";
import "react-gh-repo-cards/dist/index.css";

const Cards = () => {
  return (
    <RepoCards
      repoDetails={[
        {
          user: "FdelMazo",
          repoName: "yamerecibi",
          showFullTitle: true,
        },
        {
          user: "CITIZENDOT",
          repoName: "gh-info",
          showFullTitle: true,
        },
        {
          user: "CITIZENDOT",
          repoName: "TestCode",
          showFullTitle: false,
        },
        {
          user: "CITIZENDOT",
          repoName: "VCPicker",
          showFullTitle: false,
        },
      ]}
    />
  );
};

export default Cards;
```

## License

MIT © [Appaji](https://github.com/CITIZENDOT)
