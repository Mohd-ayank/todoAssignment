function generateCondition() {
	let condition = {};
	if (valueOf("hair")) condition.hair = true;
	if (valueOf("feathers")) condition.feathers = true;
	if (valueOf("eggs")) condition.eggs = true;
	if (valueOf("milk")) condition.milk = true;
	if (valueOf("airborne")) condition.airborne = true;
	if (valueOf("aquatic")) condition.aquatic = true;
	if (valueOf("predator")) condition.predator = true;
	if (valueOf("toothed")) condition.toothed = true;
	if (valueOf("backbone")) condition.backbone = true;
	if (valueOf("venomous")) condition.venomous = true;
	if (valueOf("fins")) condition.fins = true;
	if (valueOf("tail")) condition.tail = true;
	if (valueOf("domestic")) condition.domestic = true;
	return condition;
}

function valueOf(filterId) {
	return document.getElementById(filterId).checked;
}

function loadJson(container, condition) {
	let request = new XMLHttpRequest();
	let url =
		"https://bulgakoff-809c.restdb.io/rest/zoo?&sort=translation&q=" +
		JSON.stringify(condition);
	request.open("GET", url, true);
	request.setRequestHeader("content-type", "application/json");
	request.setRequestHeader("x-apikey", "5c3f4f7166292476821ca012");
	request.setRequestHeader("cache-control", "no-cache");
	request.send();
	request.onreadystatechange = function() {
		if (request.status !== 200) {
			document.getElementById(container).innerHTML =
				"Status: " + request.status + " " + request.statusText;
		} else {
			document.getElementById(container).innerHTML = createList(
				JSON.parse(request.responseText)
			);
		}
	};
}

function createList(jsonArray) {
	let list = [];
	for (let i = 0; i < jsonArray.length; i++)
		list[i] = jsonArray[i].translation;
	return list.join(", ");
}

[
	{name: "hair", value: "Шерсть"},
	{name: "feathers", value: "Пернатое"},
	{name: "eggs", value: "Яйцекладущее"},
	{name: "milk", value: "Млекопитающее"},
	{name: "airborne", value: "Летающее"},
	{name: "aquatic", value: "Водоплавающее"},
	{name: "predator", value: "Хищник"},
	{name: "toothed", value: "Зубастое"},
	{name: "backbone", value: "Позвоночное"},
	{name: "venomous", value: "Ядовитое"},
	{name: "fins", value: "Есть плавники"},
	{name: "tail", value: "Хвостатое"},
	{name: "domestic", value: "Домашнее"}
].forEach(e => {
	let input = document.createElement("input");
	input.type = "checkbox";
	input.id = e.name;
	input.onchange = function() {
		loadJson("results", generateCondition());
	};
	document.getElementById("filters").append(input);
	document.getElementById("filters").append(document.createTextNode(e.value));
	document.getElementById("filters").append(document.createElement("br"));
});

loadJson("results", generateCondition());