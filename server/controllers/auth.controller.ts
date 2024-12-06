import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { UserModel } from '../models/user.model.js';
import { UserSchema } from '../utils/validation.js';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const validatedData = UserSchema.parse(req.body);
      const hashedPassword = await AuthService.hashPassword(validatedData.password);
      
      const user = await UserModel.create({
        ...validatedData,
        password: hashedPassword
      });

      const token = AuthService.generateToken(user._id.toString());
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ error: 'Invalid registration data' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user || !await AuthService.validatePassword(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = AuthService.generateToken(user._id.toString());
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }
}