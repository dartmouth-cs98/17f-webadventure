# WebAdventure

WebAdventure is a Chrome Extension that provides a unique and fun way of interacting with Wikipedia via a game format. Players compete against each other in a version of the "Wiki Game." For each player, the object of the game is to reach the "goal" page before any other player does.

Example of Game:

![login](assets/login.png)

![lobby](assets/lobby.png)

![gameplay](assets/Gameplay.png)

![Gameover](assets/end.png)

## Other Repos
Backend Repo: https://github.com/dartmouth-cs98/webadventure-backend

WikiGraph Repo: https://github.com/dartmouth-cs98/17f-webadventure-wikigraphDB

## Architecture

Our Chrome Extension currently injects Javascript into a Wikipedia page and uses React to modify page by displaying game elements. The extension code is compiled and built using Babel and Webpack.

On the backend we are using MongoDB and Mongoose to access the data. Visit the [backend repo](https://github.com/dartmouth-cs98/webadventure-backend).

The frontend and backend communicate via web sockets (using Socket.io).

## Setup

We are using vanilla Javascript, JQuery, React, HTML and CSS right now to inject the game onto the Wikipedia page.

After pulling the repo run:
```
npm install
npm run build
```

Then load the unpacked extension onto the [Chrome Extensions](chrome:\\extensions) settings page.

Run the game by clicking on the extension icon and the game will provide instructions.

By default the game uses the deployed backend. To use a locally deployed backend change the socketserver variable in gameData.js

## Deployment

At this stage, we plan to deploy via Chrome extension using Google Developer Tools (chrome://extensions).

Before reloading as an extension, run the command:
```
npm install
npm run build
```
Then add the unpacked extension to Chrome.

Click on the extension.

Have fun!

In the near future, we plan to have the game on the Google Chrome App store.

## Gameplay

### Lobby

Upon opening the game extension, the user is taken to a sign in page where they can sign in and register as a player. Once the user signs in, the user is able to select an avatar, choose from one of the public games (generated via the backend), and join a game. In the near future, we also plan to allow the user to host and join private games via private game key.

### Game

Once a game reaches capacity (which we have set to 5 players), then the game will start.

To move the avatar, make sure the Wikipedia page in focus (click on it if it's not) and move using the keys 'W', 'A', 'S', 'D'. To go to another page, press "l" when a link is highlighted.

## Summary of Term 1

### November 14 Demo Feedback

Please see Google Doc to directly view responses submitted from November 14 Demo:
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

## Authors

* Imanol "Idea Guy" Avendaño
* Stephanie "Load Balancer" Guo
* David "Dreamer/Doh" Oh
* Alma "Savage" Wang
* Barry "PM" Yang

## Acknowledgments
Tim for being our shepherd and guiding light.
