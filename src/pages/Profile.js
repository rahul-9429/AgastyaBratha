import React, { useEffect, useRef, useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import light from '../images/agalogoedited.png';
function Profile() {
    const [newMessage, setNewMessage] = useState("");
    const [file, setFile] = useState(null);
    const focus_type = useRef(null);
    const db = getFirestore(); 
    const [user, setUser] = useState(null);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };
    
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
           
        });
    
        return () => unsubscribe();
      }, []);
 
      const sendMessage = async () => {
        if (!newMessage.trim()) {
            console.log("Message not sent.");
            return;
        }
    
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;  
    
        const currentTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    
        await addDoc(collection(db, "announcements"), {
            user_id: user.uid,
            text: newMessage,
            timestamp: serverTimestamp(),
            time: currentTime
        });
        setNewMessage("");
        toast.success("Announcement announced!");
    };
    
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    useEffect(() => {
        focus_type.current.focus(); 
    }, [focus_type]);

    return (
        <>
        <div className='profile-bg'>
        <img src={light} className='aga-main' height="70vh" alt="logo"></img>
            <h1 style={{ color: '#345163' ,alignContent:'center',justifyContent:'center',textAlign:'center'
             }}>Hello admin,<br/>What's happening..?</h1>
            <ToastContainer />
            <div className='send-msg'>
                <input className='msg-feild'
                    ref={focus_type}
                    value={newMessage}
                    placeholder="What would you like to announce"
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    accept="image/*, video/*, .gif, .txt"
                />
                <button className='send' onClick={sendMessage}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABLElEQVR4nO2WsUoDQRCG10obq3TJzJ7FIYhCmp05TWGK3MyJYApJfAQ738HGF1CwFl/BRvAdtPAhFCxFrDRyB3fESjx1zkB+mG7hG3b/mf2dm6sJQZCNVm+4bApFyg6QdYKkz0hyBpsaG4HluABXJW/AcuVDlhqDtSpgvfWJHkb9/pIpGKsG5CE/16ZByxSMZQOkr0ByGSXpmikYP/vgBoPsOecWDME6XXe1fIA/B5fP8PgtH3iW0W+Ap57hBVjO2zRY/RLeYe12QrYPpEdAegKsF8h6jaz3yPpUs4FiHwDJtqurON5ZXNnajXzQXo0G3zFJh82AQ+H+f3LVnmXciLmwqXHC2VogYrsywfqTAOtvEWyDgNhEH1/OcR72WE7Nwl4upGzdPN7O5f5YH92R4pqmqt7BAAAAAElFTkSuQmCC" alt="send" />
                </button>
            </div></div>
        </>
    );
}

export default Profile;
