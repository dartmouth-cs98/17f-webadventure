import WikiGame from '../wikiGame';
import Player from '../player';


const onNewUrl = (newUrl) => {
  const req = {
    message: 'new url',
    payload: {
      newUrl,
    },
  };
  chrome.runtime.sendMessage(req);
};

chrome.runtime.onMessage.addListener((request) => {
  console.log('request.payload');
  console.log(request.payload);
  if (request.message === 'new game') {
    const {
      counter, username, avatar, game, audioOn,
    } = request.payload;
    console.log('game in inject.js');
    console.log(game);
    console.log(game.players);
    const curPlayer = new Player(username, avatar);
    const wikiGame = new WikiGame(onNewUrl, curPlayer, counter, game, audioOn);
    console.log('wikiGame');
    console.log(wikiGame);
  }
});
