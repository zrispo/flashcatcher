chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		main();

	}
	}, 10);
});


function getElementsByTagNameArray (tagName) {
	var elems = document.getElementsByTagName(tagName);
	var array = Array.prototype.slice.call( elems, 0 );

	return array;
}

function main () {

	var allFoundElems = [];
	allFoundElems = allFoundElems.concat(getElementsByTagNameArray('embed'));
	allFoundElems = allFoundElems.concat(getElementsByTagNameArray('object'));

	allFoundElems.forEach(function (elem) {
		window.open(elem.data || elem.src);
	});

}