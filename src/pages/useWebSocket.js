import { useEffect, useState } from 'react';

const useWebSocket = (url) => {
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setActiveUsers(data.activeUsers);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return activeUsers;
};

export default useWebSocket;
