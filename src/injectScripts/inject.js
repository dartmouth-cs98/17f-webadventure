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
  if (request.message === 'new game') {
    const {
      counter, username, avatar, game,
    } = request.payload;
    const curPlayer = new Player(username, avatar);
    const wikiGame = new WikiGame(onNewUrl, curPlayer, counter, game);
    console.log(wikiGame);
  }
});
