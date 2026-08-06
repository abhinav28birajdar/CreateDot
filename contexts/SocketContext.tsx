"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/contexts/auth-context';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null); // To persist socket instance
  const { user } = useAuth();

  useEffect(() => {
    // Only connect if not already connected, client side, and user is authenticated
    if (typeof window !== 'undefined' && !socketRef.current && user) {
      const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://localhost:3001';
      
      const newSocket = io(SOCKET_URL, {
        transports: ['websocket'],
        auth: {
          token: user.id, // Use user ID as authentication token
        },
        autoConnect: true,
      });

      newSocket.on('connect', () => {
        setIsConnected(true);
        console.log('Socket Connected!');
        
        // Join user-specific room for targeted updates
        newSocket.emit('join-user-room', user.id);
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
        console.log('Socket Disconnected!');
      });

      // Handle any specific error events
      newSocket.on('connect_error', (error: Error) => {
        console.error('Socket Connection Error:', error);
      });

      setSocket(newSocket);
      socketRef.current = newSocket; // Store reference

      // Clean up on component unmount
      return () => {
        newSocket.off('connect');
        newSocket.off('disconnect');
        newSocket.disconnect();
        socketRef.current = null;
      };
    }
    
    // Disconnect if user logs out
    if (!user && socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
    }

    return undefined;
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
