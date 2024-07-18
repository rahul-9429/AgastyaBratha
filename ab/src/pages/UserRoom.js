import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import './App.css';
import logo from '../images/agalogoedited.png';
import sharebt from '../images/icons8-share-36.png';

const UserRoom = () => {
  const { roomName } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem('username') || "");
  const [loading, setLoading] = useState(true);
  const [isUsernameSet, setIsUsernameSet] = useState(!!localStorage.getItem('username'));
  const focusType = useRef(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    if (focusType.current) {
      focusType.current.focus();
    }
  }, [focusType]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        signInAnonymously(auth)
          .then((userCredential) => {
            setUser(userCredential.user);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error signing in anonymously: ", error);
            setLoading(false);
          });
      }
    });

    return () => unsubscribeAuth();
  }, [auth]);

  useEffect(() => {
    if (!loading) {
      const q = query(
        collection(db, roomName),
        orderBy("timestamp")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(messagesData);
      });

      return () => unsubscribe();
    }
  }, [roomName, db, loading]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const currentTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) {
      console.log("Message not sent.");
      return;
    }

    await addDoc(collection(db, roomName), {
      user_id: user.uid,
      username: username,
      text: newMessage,
      timestamp: serverTimestamp(),
      times: currentTime
    });
    setNewMessage("");
  };

  const handleShareRoom = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Agastya-Bratha Exclusive!',
        text: `You are invited to join our room. Use code: ${roomName}`,
        url: `${window.location.origin}/room/${roomName}`,
      }).then(() => {
        console.log('Room shared successfully!');
      }).catch((error) => {
        console.error('Error sharing room: ', error);
      });
    } else {
      console.log('Web Share API is not supported in this browser.');
    }
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      setIsUsernameSet(true);
    } else {
      console.log("Username cannot be empty");
    }
  };

  if (loading) {
    return <div className='loader'>
      Hang on!
      <span className='spinner'></span>
    </div>
  }

  if (!isUsernameSet) {
    return (
      <div className="username-container">
        <div className="input-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <label className="input-label">Set a nickname</label>
        </div>
        <button onClick={handleUsernameSubmit} className="btn-submit-username">
          Continue
        </button>
      </div>
    );
  }

  return (
    <>
      <div className='chat-wrapper'>
        <div className='logo'>
          <img src={logo} alt="Logo" height="65vh" />
          <button className='share-btn' onClick={handleShareRoom}>
            <img src={sharebt} alt="Share" />
          </button>
        </div>

        <center>
          <div className="chat">
            <div className="wel-msg">
              <p>Welcome to AgastyaBratha-Exclusive<br />Add your friends by sharing the Room code</p>
            </div>
            {messages.map((message, index) => {
              const previousMessage = messages[index - 1];
              const showUsername = !previousMessage || previousMessage.user_id !== message.user_id;

              return (
                <div key={message.id} className={`message ${message.user_id === user.uid ? 'justify-end' : 'justify-start'}`}>
                  {showUsername && (
                    <div className="user-name">{message.username === username ? "" : message.username}</div>
                  )}
                  <div className="msg-content">{message.text}</div>
                  <span className='msgtimestamp'>{message.times}</span>
                </div>
              );
            })}
          </div>

          <div className='send-msg'>
            <span className='msg-feild-wrap'>
              <textarea className='msg-feild'
                ref={focusType}
                value={newMessage}
                rows={1}
                placeholder="Type an announcement"
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ overflowY: 'hidden', overflowX: 'hidden', outline: 'none', border: 'none', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              />
            </span>
            <button className='send' onClick={sendMessage}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABLElEQVR4nO2WsUoDQRCG10obq3TJzJ7FIYhCmp05TWGK3MyJYApJfAQ738HGF1CwFl/BRvAdtPAhFCxFrDRyB3fESjx1zkB+mG7hG3b/mf2dm6sJQZCNVm+4bApFyg6QdYKkz0hyBpsaG4HluABXJW/AcuVDlhqDtSpgvfWJHkb9/pIpGKsG5CE/16ZByxSMZQOkr0ByGSXpmikYP/vgBoPsOecWDME6XXe1fIA/B5fP8PgtH3iW0W+Ap57hBVjO2zRY/RLeYe12QrYPpEdAegKsF8h6jaz3yPpUs4FiHwDJtqurON5ZXNnajXzQXo0G3zFJh82AQ+H+f3LVnmXciLmwqXHC2VogYrsywfqTAOtvEWyDgNhEH1/OcR72WE7Nwl4upGzdPN7O5f5YH92R4pqmqt7BAAAAAElFTkSuQmCC" alt="send" />
            </button>
          </div>
        </center>
      </div>
    </>
  );
};

export default UserRoom;
