'use strict';

var scrollTimeout = null,
    menu = document.querySelector('.amazing-menu');

window.addEventListener('scroll', function () {
    if (!scrollTimeout) {
        document.body.classList.add('_disable-pointer-events');
        menu.classList.add('-scrolled');
    } else {
        clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(function () {
        document.body.classList.remove('_disable-pointer-events');
        menu.classList.remove('-scrolled');
        scrollTimeout = null;
    }, 150);
});