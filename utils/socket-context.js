import { createContext } from 'react';

import io from 'socket.io-client';

const socket = io('https://www.utopier-api.com');
export let SocketContext = createContext(socket);
