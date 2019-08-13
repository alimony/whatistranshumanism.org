"use strict";

function wrap(e, n) {
	e.parentNode.insertBefore(n, e), n.appendChild(e)
};

function links() {
	document.getElementsByTagName("article")[0].querySelectorAll("h1, h2, h3").forEach(e => {
		let n = document.createElement("a");
		n.href = "#" + e.id, wrap(e, n)
	})
};

window.onload = function () {
	links()
};