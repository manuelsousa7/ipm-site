/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";

// define headerInit and default indexURL / redipsURL variable
var headerInit,
	redipsURL = redipsURL || '/javascript/drag-and-drop-table-content/',
	indexURL = indexURL || '../';

// header initialization
headerInit = function () { 
	var header = document.createElement('div'),
		title = document.title;
	// add "header" DIV element
	document.body.insertBefore(header, document.body.firstChild);
	// apply inner HTML
};

// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', headerInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', headerInit);
}