import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import './App.css';
import { FaArrowRight } from 'react-icons/fa';

const Createroom = () => {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();

  const generateRoomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charLength = characters.length;
    
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  };

  const handleCreateRoom = async () => {
    try {
      const code = generateRoomCode();
      const roomName = `Room ${code}`; 
      setRoomCode(code);
      
      const infoDocRef = doc(db, code, "info");
      await setDoc(infoDocRef, {
        roomCode: code,
        roomName: roomName,
        createdAt: serverTimestamp()
      });

      console.log('Room created successfully!');
      navigate(`/room/${code}`);
    } catch (error) {
      console.error('Error creating a room: ', error);
    }
  };

  return (
    <div>
       
      <button class="button" onClick={handleCreateRoom}>
   Create Room
  <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
    <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
  </svg>
</button>
    </div>
  );
};

export default Createroom;
