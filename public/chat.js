$(function () {
    let socket = io.connect('http://localhost:3000')
    let message = $('#message')
    let send_message = $('#send_message')

    let current_username = $('#current_username')
    let username = $('#username')
    let send_username = $('#send_username')

    let chatroom = $('#chatroom')
    let feedback = $('#feedback')

    socket.on('get_messages', (data) => {
        feedback.html('')
        message.val('')
        data.forEach(function(msg) {
            chatroom.append("<p class='message'>" + msg.sender + ": " + msg.message + "</p>")
        });
    })

    send_username.click(function () {
        current_username.html(username.val())
        socket.emit('change_username', { username: username.val() })
    })

    message.bind('keypress', () => {
        socket.emit('typing')
    })

    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing ..." + "</i><p>")
    })

    send_message.click(function () {
        console.log(`${username.val()} : ${message.val()}`)
        socket.emit('new_message', { message: message.val() })
    })

    socket.on('new_message', (data) => {
        feedback.html('')
        message.val('')
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })
})