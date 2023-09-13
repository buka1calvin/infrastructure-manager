import React, { useEffect, useRef, useState } from 'react';
import { getSingleUser } from '../components/Actions/service/AuthUser';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../components/Actions/service/AuthUser';
import Chat from '../components/forms/Chat';
import { io } from 'socket.io-client';
import cross from '../assets/cross1.svg';

const ChatContainer = ({id, onClose}) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true); 
  // const { id } = useParams();
  const socket = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const FetchSenderInfo = async () => {
      try {
        const data = await getUserProfile();
        if (!data) {
          navigate('/auth/login');
        } else {
          setCurrentUser(data.userDetails);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    FetchSenderInfo();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(`${import.meta.env.VITE_REACT_APP_API_URLs}`);
      socket.current.emit('add-user', currentUser._id);
      socket.current.on('disconnect', () => {
        console.log('Socket disconnected. Reconnecting...');
        setTimeout(() => {
          socket.current.connect();
        }, 1000);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (currentUser) {
          const user = await getSingleUser(id);
          setCurrentChat(user.user);
          setIsLoading(false); // Set loading to false after fetching user data
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, id]);

  console.log('chat', currentChat);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        // <h1>
          <Chat currentUser={currentUser} currentChat={currentChat} socket={socket} />
        // </h1>
      )}
      <button onClick={onClose}><img src={cross} alt="" /></button>
    </div>
  );
};

export default ChatContainer;
