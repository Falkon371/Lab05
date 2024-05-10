import cron from 'node-cron';
import TokenService from './modules/services/token.service';

const tokenService = new TokenService();

cron.schedule('0 * * * *', async () => {
    try {
        await tokenService.removeExpiredTokens();
    } catch (error) {
        console.error('Błąd podczas usuwania wygasłych tokenów:', error);
    }
});
