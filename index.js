let isIn = false;
let highContrast = false;

function animateMenu(animateIn = true) {
	let op = document.getElementById("menu").style;
	if (animateIn) op.animationName = "menu-anim-in";
	else op.animationName = "menu-anim-out";
	op.animationDuration = "0.5s";
	op.animationTimingFunction = "ease";
	op.animationFillMode = "forwards";
	isIn = !isIn;
}
function switchContrast(increase) {
	let karmaInContainer = document.getElementById("karma-in-container");
	let karmaIn = document.getElementById("karma-in");
	let karmaOut = document.getElementById("karma-out");
	let bodyElement = document.getElementsByTagName("body")[0];
	if (increase) {
		karmaInContainer.style.backgroundColor = "#6D304C";
		karmaOut.style.backgroundColor = "#1C461C";
		karmaIn.style.color = "#E6BACA"
		bodyElement.style.setProperty("--karma-error-red", "#EB6B6B");
	} else {
		karmaInContainer.style.backgroundColor = "#A5748B";
		karmaOut.style.backgroundColor = "#507250";
		karmaIn.style.color = "#4C0B2A"
		bodyElement.style.setProperty("--karma-error-red", "#601B1B");
	}
	highContrast = !highContrast;
}