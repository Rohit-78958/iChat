const socket = io('http://localhost:8000');

// Define the key and initialization vector
const key = CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef");
const iv = CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210");

const form = document.getElementById('send-form');
const messageInput = document.getElementById('txt');
const messageContainer = document.querySelector('.container')

var audio = new Audio('Ting Sound Effect.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position == 'left'){
        console.log('sound is playing');
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message1 = CryptoJS.AES.encrypt(messageInput.value, key, { iv: iv, mode: CryptoJS.mode.CBC }).toString();
    append(`You: ${message1}`, 'right');
    const message2=CryptoJS.AES.decrypt(message1, key, { iv: iv, mode: CryptoJS.mode.CBC }).toString(CryptoJS.enc.Utf8);
    socket.emit('send', message2);
    messageInput.value = '';
})

const namea = prompt("Enter your name to join LetsChat")
socket.emit('new-user-joined', namea)

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, `left`);
})

socket.on('receive', data=>{
    append(`${data.name }: ${data.message}`, 'left')
})

socket.on('left', name=>{
    append(`${name} left the chat`, 'left');
})
