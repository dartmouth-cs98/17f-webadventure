// this is the code which will be injected into a given page...

(function() {

	// just place a div at top right
	var div = document.createElement('div');
	div.id = "fook";
	//div.style.position = 'fixed';
	div.style.top = 0;
    div.style.position = "absolute";
	div.style.right = 0;
	div.textContent = 'Injected!';
	document.body.appendChild(div);


    function leftArrowPressed() {
    	console.log("l");
    	console.log(div.id);
    	div.style.backgroundColor = "lightblue";
    	div.style.right = parseInt(div.style.right) + 5 + 'px';
    }

    function rightArrowPressed() {
    	console.log("r");
    	div.style.right = parseInt(div.style.right) - 5 + 'px';
    }

    function upArrowPressed() {
    	console.log("u");
    	div.style.top = parseInt(div.style.top) - 5 + 'px';
    }

    function downArrowPressed() {
    	console.log("d");
    	div.style.top = parseInt(div.style.top) + 5 + 'px';
    }

    function moveSelection(evt) {
    	console.log("hello");
    	console.log(evt.keyCode);
        switch (evt.keyCode) {
            case 65:
	            leftArrowPressed();
	            break;
            case 68:
	            rightArrowPressed();
	            break;
            case 87:
	            upArrowPressed();
	            break;
            case 83:
	            downArrowPressed();
	            break;
            }
        };

    window.addEventListener('keydown', moveSelection);

})();