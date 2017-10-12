// this is the code which will be injected into a given page...

(function() {

	// just place a div at top right
	var div = document.createElement('div');
	div.id = "image1";
	//div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
	div.textContent = 'Injected!';
	document.body.appendChild(div);

	//alert('inserted self... giggity');
	while (true) {
	    function leftArrowPressed() {
	    	div.style.left = parseInt(div.style.left) - 5 + 'px';
	    }

	    function rightArrowPressed() {
	    	div.style.left = parseInt(div.style.left) + 5 + 'px';
	    }

	    function upArrowPressed() {
	    	div.style.top = parseInt(div.style.top) - 5 + 'px';
	    }

	    function downArrowPressed() {
	    	div.style.top = parseInt(div.style.top) + 5 + 'px';
	    }

	    function moveSelection(evt) {
	        switch (evt.keyCode) {
	            case 37:
	            leftArrowPressed();
	            break;
	            case 39:
	            rightArrowPressed();
	            break;
	            case 38:
	            upArrowPressed();
	            break;
	            case 40:
	            downArrowPressed();
	            break;
	            }
	        };

	    function docReady()
	    {
	    	window.addEventListener('keydown', moveSelection);
	    }
	}


})();