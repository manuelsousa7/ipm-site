document.addEventListener('DOMContentLoaded', function() { // When the DOM is finally loaded
    var triggers = document.querySelectorAll('.watnotif-trigger'); // that's the demo buttons

    /* We bind the click event on all the buttons of the demo */
    for(var el in triggers) {
        var btn = triggers[el];
        
        document.onkeypress = function(evt) {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            var charStr = String.fromCharCode(charCode);
            if(charStr == "k"){
                test = 1;
                clock.stop();
                var s = clock.getTime();
                s = Number(s);
                s += 20;
                clock.setTime(s);
                clock.start();
                getRandomNotification(
                "error") // to get the type of the notification we want to show 
                    .display(9000);
            }
        };
    }
});

// utilitary function that creates a notification of given type with a random message
// only useful for this example.
var getRandomNotification = function generateNotification(type) {
    return new Notif("Problema na Cozinha!", type);
}
// random messages array
// only useful for this example
var randomMessages = [
    'Hey, this is a random message',
    'What about a random message quite extensively long just to show how the notification nicely sizes itself.',
    'We can have a <a href="#">link</a> inside a notification.',
    'Note that the notification won\'t be dismissed if you hover it.'
];
// utilitary function to return a random message
// only useful for this example
var getRandomMsg = function getRandomMsg() {
    return randomMessages[Math.floor(Math.random() * randomMessages.length)];
}