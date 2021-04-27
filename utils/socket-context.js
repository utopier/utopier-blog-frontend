import { createContext } from 'react';

import io from 'socket.io-client';

const socket = io('http://localhost:2025');
export let SocketContext = createContext(socket);
