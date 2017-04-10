chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			main();
		}
	}, 10);
});


function getElementsByTagNameArray (tagName) {
	var elems = document.getElementsByTagName(tagName);
	var array = Array.prototype.slice.call( elems, 0 );

	return array;
}

function filenameFromURL (path) {
	var split = path.split('/');
	return split[split.length-1].split('.')[0];
}

function main () {

	var allFoundElems = [];
	allFoundElems = allFoundElems.concat(getElementsByTagNameArray('embed'));
	allFoundElems = allFoundElems.concat(getElementsByTagNameArray('object'));

	allFoundElems.forEach(function (elem) {
		var swfUrl = elem.data || elem.src;
		window.open(swfUrl)

		var extraInfo = {
			url: window.location.href,
			title: document.title,
		};
		var extraInfoJson = JSON.stringify(extraInfo, null, 4);
		var blob = new Blob([extraInfoJson], {type: "application/json"});
		saveAs(blob, filenameFromURL(swfUrl));
	});

}