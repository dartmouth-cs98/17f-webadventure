/* eslint no-undef: "off" */
const URL = 'http://localhost:9090/api';
function getHelloMessage() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${URL}/`, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.response);
    }
  };
  xhr.send();
}

console.log('hi');
getHelloMessage();
