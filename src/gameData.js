/* eslint no-undef: "off", no-unused-vars: "off" */
const URL = 'http://localhost:9090/api';

// checks if location is in DB
// Params: location object, playerId
function checkLocation(location, playerId) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${URL}/location`, true);
  const body = {
    location,
    playerId,
  };
  xhr.send(body);
}

function getHelloMessage() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${URL}/`, true);
  xhr.onreadystatechange = (res) => { console.log(res); };
  xhr.send();
}
