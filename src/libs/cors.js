import Cors from 'cors';
import initMiddleware from './init-middleware';

// Initialize CORS middleware
export const cors = initMiddleware(
  Cors({
    origin: ['https://parkinglot-dusky.vercel.app'], // Allow your Vercel domain
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  })
);
