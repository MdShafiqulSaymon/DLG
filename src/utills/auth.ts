import env from 'dotenv';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/envConfig';
env.config();
class AuthUttils {
  public async generateToken(
    user:
      | {
          id: number;
          username: string;
          email: string;
          password: string;
        }
      | undefined
  ) {
    const token = jwt.sign({ user }, ENV.TOKEN_SECRET_KEY ?? '', {
      expiresIn: '3h', // You can adjust the expiration time as needed
    });
    return token;
  }
}
export default AuthUttils;
