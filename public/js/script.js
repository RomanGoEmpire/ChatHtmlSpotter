var socket = new WebSocket('ws://localhost:8181/', 'chat');
var name = 'u1'

socket.onopen = function() {

    name = "name" + Math.floor(Math.random() * Math.floor(700));

    socket.send('{"type": "join", "name":" ' + name + '"}');
}
$('#send').on('click', function(e) {
    e.preventDefault();
    //name = 'u1',
    msg = $('#input').val();
    socket.send('{"type": "msg", "msg": "' + msg + '"}');
    $('#input').val('');
});
socket.onmessage = function(msg) {
    var data = JSON.parse(msg.data);
    switch (data.type) {
        case 'msg':
            var msg;
            if (data.name == "BOT") {
                msg = $.parseHTML("<div class=\"msg left-msg \"><div class=\"msg-img \" style=\"background-image: url(https://www.creativefabrica.com/wp-content/uploads/2021/07/05/Chatbot-Logo-Modern-bot-logo-Graphics-14298242-1.jpg) \"></div><div class=\"msg-bubble \"><div class=\"msg-info \"><div class=\"msg-info-name \">" + data.name + "</div><div class=\"msg-info-time \">00:00 </div></div><div class=\"msg-text \">" + data.msg + "</div></div></div>")
            } else {
                msg = $.parseHTML("<div class=\"msg right-msg \"><div class=\"msg-img \" style=\"background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg) \"></div><div class=\"msg-bubble \"><div class=\"msg-info \"><div class=\"msg-info-name \"> User</div><div class=\"msg-info-time \">00:00</div></div><div class=\"msg-text \">" + data.msg + "</div></div></div>");
            }
            $('#msgs').append(msg);
            break;
        case 'join':
            $('#users').empty();
            for (var i = 0; i < data.names.length; i++) {
                var user = $('<div>' + data.names[i] + '</div>');
                $('#users').append(user);
            }
            break;
    }
};