import React, { useEffect } from 'react';
import './App.css';
import logo from "./assets/logo.png";
import Container from './container';
import Send from './send';
import io from 'socket.io-client';

const socket = io('https://chat-bot-j26a.onrender.com');

function App() {
  useEffect(() => {
    const name = prompt('Enter your Name To join:');
    if (name) {
      socket.emit('new-user-joined', name);
      console.log(`User ${name} joined`);
    }

    const handleUserJoined = (userName) => {
      appendMessage(`${userName} joined the chat`, 'right');
    };

    const handleMessageReceive = (data) => {
      const position = data.name === name ? 'right' : 'left';
      if (data.message.trim() !== "") {
        appendMessage(`${data.name}: ${data.message}`, position);
      }
    };

    socket.on('user-joined', handleUserJoined);
    socket.on('receive', handleMessageReceive);

    // Clean up the effect
    return () => {
      socket.off('user-joined', handleUserJoined);
      socket.off('receive', handleMessageReceive);
    };
  }, []);

  useEffect(() => {
    const button = document.querySelector('.bsend');
    const input = document.querySelector('.text');

    const handleButtonClick = () => {
      const message = input.value.trim();
      if (message) {
        socket.emit('send', { name, message });
        appendMessage(`You: ${message}`, 'right');
        input.value = ''; // Clear the input field after sending
      }
    };

    button.addEventListener('click', handleButtonClick);

    // Clean up the event listener
    return () => {
      button.removeEventListener('click', handleButtonClick);
    };
  }, [name]);

  const appendMessage = (message, position) => {
    const container = document.querySelector('.container');
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = message;
    messageDiv.classList.add('message');
    messageDiv.classList.add(position);
    container.append(messageDiv);
  };

  return (
    <>
      <img src={logo} className='logo' alt='logo' />
      <Container />
      <Send />
    </>
  );
}

export default App;
