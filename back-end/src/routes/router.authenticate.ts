import express from 'express';
import { AuthenticateUserController } from '../controller';

export const authenticated = express.Router();

const authenticateUserController = new AuthenticateUserController();

authenticated.post('/sessions', authenticateUserController.handle)
