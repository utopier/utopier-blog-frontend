import { createContext } from 'react';

import io from 'socket.io-client';

const socket = io('https://utopier.ml');
export let SocketContext = createContext(socket);
