# WebAdventure

We plan to develop an extensible program for overlaying and interacting with Wikipedia via a game format. “Players” will interact with webpages in a novel way that could be used by clients for data collection.

We intend to adapt the game paper.io that interacts with a webpage (or a screenshot of a webpage). Players would fight for "control" of a webpage via taking up area, like in paper.io. We plan to control the environment by limiting the number of hyperlinks and setting a low-depth, such that a limited number of pages within a tree can be explored. After the game ends, the user's name and score would be recorded.

For mockups of the page, please visit https://github.com/dartmouth-cs98/17f-webadventure/wiki and click on the link titled "Link to Figma"

## Architecture

Front-end: We are using a chrome extension to inject javascript into a Wikipedia page or a pre-defined webpage. Other options include building a stand-alone web-app that loads in a picture or an i-frame, where we can also overlay the game mechanics onto. Currently, we are researching different methods of "injecting javascript" into the webpage for user interaction.

On the backend we are using MongoDB and Mongoose to access the data. Visit https://github.com/dartmouth-cs98/webadventure-backend for the backend repo.

## Setup

We are using vanilla Javascript and jquery right now to test javascript injection. We are considering options such as Node.js to build the game. This section will evolve as the game developers.

## Deployment

At this stage, we plan to deploy via Chrome extension using Google Developer Tools (chrome://extensions).

We've added in Babel to compile JS. Before reloading as an extension, run the command:
```
./node_modules/.bin/babel src -d lib
```

## Authors

* Imanol Avendaño
* Stephanie Guo
* David Oh
* Alma Wang
* Barry Yang

## Acknowledgments
Tim for being our shepherd and guiding light.
