let data = [];
let correct = [];
let incorrect = [];

let buttons = ["button1", "button2", "button3", "button4"];

let correctIndex;
let currentIndex = 0;

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function correctAnswer() {
	highlightCorrect();
	correct[correct.length] = data[currentIndex].id;
	setTimeout("nextWord();", 1000);
}

function incorrectAnswer() {
	highlightCorrect();
	incorrect[incorrect.length] = data[currentIndex].id;
	setTimeout("nextWord();", 3000);
}

function highlightCorrect() {
	document.getElementById(buttons[correctIndex]).style.backgroundColor =
		"green";
}

function nextWord() {
	restoreButtons();
	if (currentIndex < data.length - 1) {
		document.getElementById("word-text").innerText =
			data[currentIndex].word;
		document.getElementById("transcription").innerText =
			data[currentIndex].transcription +
			" [" +
			correct.length +
			"/" +
			incorrect.length +
			"]";
		data[currentIndex].seen = true;
		correctIndex = getRandom(0, 3);
		document.getElementById("button1").innerText =
			correctIndex == 0
				? data[currentIndex].translation
				: getRandomAnswer();
		document.getElementById("button2").innerText =
			correctIndex == 1
				? data[currentIndex].translation
				: getRandomAnswer();
		document.getElementById("button3").innerText =
			correctIndex == 2
				? data[currentIndex].translation
				: getRandomAnswer();
		document.getElementById("button4").innerText =
			correctIndex == 3
				? data[currentIndex].translation
				: getRandomAnswer();
		currentIndex++;
		return;
	}
	document.getElementById("word-text").innerText =
		"You have finished this letter. Correct answers: " +
		correct.length +
		", incorrect: " +
		incorrect.length;
	document.getElementById("transcription").innerText = "";
	document.getElementById("buttons").style.display = "none";
}

function getRandomAnswer() {
	let answer = getRandom(0, data.length - 1);
	if (data[answer].translation == data[currentIndex].translation)
		return getRandomAnswer();
	return data[answer].translation;
}

function restoreButtons() {
	for (let i = 0; i < buttons.length; i++)
		document.getElementById(buttons[i]).style.backgroundColor = "#36383f";
}

function loadCategory(letter) {
	let request = new XMLHttpRequest();
	request.open(
		"GET",
		'https://bulgakoff-809c.restdb.io/rest/dictionary?q={"letter":"' +
			letter +
			'"}',
		true
	);
	request.setRequestHeader("content-type", "application/json");
	request.setRequestHeader("x-apikey", "5c3f4f7166292476821ca012");
	request.setRequestHeader("cache-control", "no-cache");
	request.send();
	request.onreadystatechange = function() {
		if (request.status === 200) {
			document.getElementById("category-selector").style.display = "none";
			document.getElementById("word").style.display = "block";
			document.getElementById("buttons").style.display = "block";
			data = JSON.parse(request.responseText)[0].words;
			nextWord();
		} else {
			document.getElementById("word").innerHTML =
				"Status: " + request.status + " " + request.statusText;
		}
	};
}

document.getElementById("button1").onclick = function() {
	if (correctIndex == 0) {
		correctAnswer();
	} else {
		document.getElementById("button1").style.backgroundColor = "red";
		incorrectAnswer();
	}
};

document.getElementById("button2").onclick = function() {
	if (correctIndex == 1) {
		correctAnswer();
	} else {
		document.getElementById("button2").style.backgroundColor = "red";
		incorrectAnswer();
	}
};

document.getElementById("button3").onclick = function() {
	if (correctIndex == 2) {
		correctAnswer();
	} else {
		document.getElementById("button3").style.backgroundColor = "red";
		incorrectAnswer();
	}
};

document.getElementById("button4").onclick = function() {
	if (correctIndex == 3) {
		correctAnswer();
	} else {
		document.getElementById("button4").style.backgroundColor = "red";
		incorrectAnswer();
	}
};
