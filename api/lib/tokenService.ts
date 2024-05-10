import jwt from 'jsonwebtoken';
import cron from 'node-cron';
import { config } from '../lib/config';
import TokenSchema from '../lib/modules/schemas/token.schema';

class TokenService {
   // ... inne metody
   
   public async verify(token: string) {
       try {
           const decoded = jwt.verify(token, config.JwtSecret);
           return decoded;
       } catch (error) {
           console.error('Błąd weryfikacji tokena:', error);
           throw new Error('Nieprawidłowy token autoryzacyjny');
       }
   }

   public async removeExpiredTokens() {
    try {
        const currentTime = new Date().getTime();
        const result = await TokenSchema.deleteMany({ createDate: { $lt: currentTime } });
        console.log(`${result.deletedCount} wygasłych tokenów zostało usuniętych.`);
    } catch (error) {
        console.error('Błąd podczas usuwania wygasłych tokenów:', error);
        throw new Error('Błąd podczas usuwania wygasłych tokenów');
    }
}

}
