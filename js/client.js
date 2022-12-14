const socket= io('http://localhost:8000',{transports:['websocket']});

const form=document.getElementById('send-container');
const messageInput=document.getElementById('msginp');
const messageContainer=document.querySelector(".chatbox");

var audio= new Audio('ting.mp3');


const append= (message, position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position='leftbox')
    {
        audio.play();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'rightbox');
    socket.emit('send',message);
    messageInput.value='';
})


const name = prompt("Enter your name to join");

socket.emit('new-user-joined',name);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'leftbox');

})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`,'leftbox')
})

socket.on('left', name=>{
    append(`${name} left the chat`,'leftbox');
})