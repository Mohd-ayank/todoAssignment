document.getElementById("file-selector").onchange = () => {
	let fileReader = new FileReader();
	fileReader.onLoad = event => {
		document.getElementById("file-content").innerText = event.target.result;
	};
	fileReader.onError = event => {
		document.getElementById("file-content").innerText =
			"File cannot be read! Code: " + event.target.error.code;
	};
	document.getElementById("file-selector").files.forEach(fileReader.readAsText);
};