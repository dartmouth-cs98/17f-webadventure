// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
/*chrome.browserAction.onClicked.addListener(function(tab) {
  var action_url = "javascript:window.print();";
  chrome.tabs.update(tab.id, {url: action_url});
});*/

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.ib, {
		file: 'inject.js'
	});
	/*chrome.tabs.executeScript({
	code: 'var div=document.createElement("div"); document.body.appendChild(div); div.innerText="test123";'
	});*/
});