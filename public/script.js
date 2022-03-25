const socket = io();

        var messages = document.getElementById('messages');
        var form = document.getElementById('form');
        var input = document.getElementById('input');
        const messageContainer = document.getElementById('message-container');

           function appendMessage(message) {
            const messageElement = document.createElement('div')
            messageElement.innerText = message
            messageContainer.append(messageElement)
        }
        const name = prompt('What is your name?')
        appendMessage('You joined')
        socket.emit('new-user', name)

        socket.on('user-connected', name => {
            appendMessage(`${name} connected`)
        })

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (input.value) {
                socket.emit('chat message', input.value);
                input.value = '';
            }
        });

        socket.on('chat message', function (msg) {
            var item = document.createElement('li');
            item.textContent = msg;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
        socket.on('chat', message => {
            console.log('From server: ', message)
        })
        const chatWindow = document.querySelector('.chat-window')

        const renderMessage = message => {
            const div = document.createElement('div')
            div.classList.add('render-message')
            div.innerText = message
            chatWindow.appendChild(div)
        }

        socket.on('chat', message => {
            // make sure to modify this
            renderMessage(message)
        })

        socket.on('output-message', message => {
            message.forEach(element => {
                var item = document.createElement('li');
                item.textContent = element.msg;
                messages.appendChild(item);
                window.scrollTo(0, document.body.scrollHeight);
                // renderMessage(element.msg)
            });
            console.log(message)
        })