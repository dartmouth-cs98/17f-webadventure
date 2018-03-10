# WebAdventure

WebAdventure is a Chrome Extension that provides a unique and fun way of interacting with Wikipedia via a game format. Players compete against each other in a version of the ["Wiki Game."](https://en.wikipedia.org/wiki/Wikipedia:Wiki_Game) For each player, the objective of the game is to reach the "goal" page before any other player does. Live updates of other players and power-ups and power-downs throughout the Wikipedia pages make for a competitive and exciting experience!

## Other Repos
Backend Repo: https://github.com/dartmouth-cs98/webadventure-backend

WikiGraph Repo: https://github.com/dartmouth-cs98/17f-webadventure-wikigraphDB

## Architecture

Our Chrome Extension currently injects Javascript into a Wikipedia page and uses React to modify the page by displaying game elements. The extension code is compiled and built using Babel and Webpack.

On the backend we are using MongoDB and Mongoose to access the data. Visit the [backend repo](https://github.com/dartmouth-cs98/webadventure-backend). The frontend and backend communicate via web sockets (using Socket.io).

The frontend codebase can be broken up into React Components, injected scripts, the background script and socket code. From there the code is related to either the Lobby, Gameplay or End.

### Lobby
The lobby is injected when the extension icon is clicked and no lobby is currently injected (event listener in `background.js`). The injected script is `injectLobby.js`. The main react component/container injected is `lobby.js` and other components are imported from there. The lobby connects to the backend through a separate endpoint handled in `lobbySocket.js`.

### Gameplay
To store game between url's, the background stores a game object. It also interacts with the backend using `gameSocket.js`. Of the injected code, `wikiGame` handles the player interaction with the webpage (overlap with links, movement, etc.) while the React component, `leaderboard.js` renders and updates the leaderboard.

### End
Once the goal page is reached (detected in the background script), an end React popup is injected into the page (`end.js`), but the connection to the backend is not cut off until the popup is exited.

## Setup

We are using vanilla Javascript, JQuery, React, HTML and CSS to inject the game onto the Wikipedia page.

After pulling the repo run:
```
npm install
npm run build
```

Then load the unpacked extension onto the [Chrome Extensions](chrome:\\extensions) settings page.

Run the game by clicking on the extension icon and the game will provide instructions.

By default the game uses the deployed backend. To use a locally deployed backend change the socketserver variable in `sockets/lobbySocket.js` and `sockets/gameSocket.js`.

When developing, enable hot-reloading with
```
npm start
```
(note the chrome://extensions page needs to be refreshed for changes in the style.css file)

## Deployment

This game is run via Chrome extension using Google Developer Tools (chrome://extensions).

Before reloading as an extension, run the command:
```
npm install
npm run build
```
Then add the unpacked extension to Chrome.

Click on the extension.

Have fun!

When uploading to the Chrome Extensions store, delete the node_modules folder and .DS_Store.

Currently the extension is not publicly listed, but is available on the [Chrome Web Store](https://chrome.google.com/webstore/detail/webadventure/knbadaakpfiahdpanlijfbbemnammhka).

## Gameplay

### Lobby

Upon opening the game extension, the user is taken to a sign in page where they can sign in as a player.

The user is then brought to the lobby screen. Here the user is able to select an avatar, choose from one of the public games (generated via the backend) and join a game, or host/join a private game. Select a public game by clicking on a public game. Then click Join Game.

![Lobby](readme-gifs/lobby.gif)

Once a game reaches capacity (which we have set to 5 players), then the game will count down from 5 and start.

The music in the game can be disabled by clicking on the sound icon. This will disable the music throughout the game and can be reenabled at anytime. The same icon exists in game play as well.

### Game

To move the avatar, make sure the Wikipedia page in focus (click on it if it's not) and move using the keys 'W', 'A', 'S', 'D'. To go to another page, press "l" when a link is highlighted. Along the way there are various power-ups and power-downs. Knock into them and see what they do.

![Gameplay](readme-gifs/gameplay.gif)

The goal of the game is to reach the Goal Page (given at the top of the page). When the player is over a link, the link turns pink and the actual url is displayed on the top.

![TOC](readme-gifs/toc.gif)

The Table of Contents provides a secondary means of navigating the page. Click on part of the table of contents and the player will jump to that part of the page.

![End](readme-gifs/end.gif)

Once the goal page is reached, a pop up displays indicating that the player has reached the end and displays the scores of the other players in the game. The player can then choose to exit the game or return to the lobby and start a new game!

## Summary of Term 1

### November 14 Demo Feedback

Please refer to this Google Doc to directly view responses submitted from November 14 Demo:
https://docs.google.com/spreadsheets/d/1WIavWqiqqkvedVlsRr5hxJsht_0UQjWsiwfunbVE8TY/edit?usp=sharing

### What worked and didn't work

The game went through an evolution this term in terms of ideas, but eventually we got the concept down to an innovative way to browse a Wikipedia webpage. By the end of the term, we definitely reached a great minimum viable product. The game navigates smoothly with a single player and all critical functions work well in singleplayer mode, such as navigation through a page and interaction with backend.

We had a lot of ideas for features during this term, include question modules, obstacles, hyperlink navigation, but we developed a good scaffold that we can expand upon this term. We noticed that the game wasn't very fun to a lot of users at the demo when they were playing by themselves, but we also noticed that users really enjoyed the multiplayer aspect (when someone played against someone else at the demo). Unfortunately, the game is fairly buggy when there are a great deal of users at the same time. This is an issue we hope to resolve in the future.

The game also needs to be more intuitive to players. That was another big flaw we recognized during the pre-demo bug hunt, and attempted to fix. Some users still didn't feel like the game was intuitive, despite adding a rules section prior to running the game.

### User testing plan

We hope to deploy the chrome extension early next term and solicit feedback from users who directly use the Chrome extension. This would be after critical fixes are implemented. We will also use time early next term to read over the feedback from the demo and implement relevant changes as well.

### Summary and Next Term Ideas

We created a great minimum viable produt this term and will expand upon that for next term. We are not too worried about playability as we realized this game really shined during multiplayer aspects. Next term, we hope to clean up the bugs we noticed from the demo and implement features that we listed as issues in this repository.

Because we reached the MVP, next term will be focused on fixing bugs, adding features, bolstering user experience. Some ideas include:

- Question module
- Nice animations (upon death and rendering of other players)
- Smoothing multiplayer functionality
- Clarifying instructions and incorporating HCD elements into the game
- Graceful exit (and proper updating to the server upon unexpected exit)
- Website with statistics of the game, a link to download the chrome extension (home page website)

## Summary of Term 2

During term 2 the team re-evaluted WebAdventure and ended up pivoting to a new concept: a character focused version of the Wikipedia Game where the player is no longer oddly bound to the words. Instead the game checks for overlap of the player icon with links on the page.

In the overhaul, we ended up having to rewrite most of the code of the game. Since screen resolutions differed so dramatically from user to user, we eliminated the locations since there wasn't a consistent way of maintaining locations across screens without bizarre hopping. This smoothed out the user's experience quite a bit. The new version of the game focused on hopping between different urls, which involved constant communication between the background script and injected script.

This term we also integrated React into the project. This made for substantially easier development when it came to the lobby, end page and leaderboard portions of the project. We integrated music, animations and power ups into the game, which substantially improved the gaming experience.

The largest challenge of the project was dealing with simultaneously timing and starting the game for all players. The backend ended up crashing a few times before we were able to get it functional for multiplayer.

Ultimately the project came together successfully for Technigala. The game proved exciting and the multiplayer aspect kept people coming back, and coming back with their friends.

While there were definitely more features we could have added, we ended up with an exciting and fun project that we all feel proud of.

## Authors

* Imanol "Idea Guy" Avendaño
* Stephanie "Eye For Style" Guo
* David "Dreamer/Doh" Oh
* Alma "Savage" Wang
* Barry "PM" Yang

## Acknowledgments
Tim for being our shepherd and guiding light.
