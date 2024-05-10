import { Request, Response, NextFunction, Router } from "express";
import { IUser } from "../modules/models/user.model";
import nodemailer from "nodemailer"; // Załóżmy, że używamy nodemailer do wysyłania e-maili

class PasswordResetController {
    public path = '/api/reset-password';
    public router = Router();
    userService: any;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/request`, this.requestPasswordReset);
    }

    private requestPasswordReset = async (request: Request, response: Response, next: NextFunction) => {
        const { email } = request.body;

        try {
            // Tutaj należy pobrać użytkownika na podstawie adresu e-mail z bazy danych
            const user: IUser | null = await this.userService.getUserByEmail(email);

            if (!user) {
                return response.status(404).json({ error: 'User not found' });
            }

            // Tutaj generujesz nowe hasło
            const newPassword = generateNewPassword();

            // Tutaj wysyłasz e-mail z nowym hasłem
            await this.sendPasswordResetEmail(user.email, newPassword);

            response.status(200).json({ message: 'Password reset email sent successfully' });
        } catch (error) {
            console.error(`Error requesting password reset: ${error}`);
            response.status(500).json({ error: 'Internal server error' });
        }
    };

    private async sendPasswordResetEmail(email: string, newPassword: string) {
        // Konfiguracja nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com', // Tutaj podajesz swój adres e-mail
                pass: 'your-password' // Tutaj podajesz hasło do swojego konta e-mail
            }
        });

        // Treść e-maila
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Your new password is: ${newPassword}. Please change it after logging in.`
        };

        // Wysyłanie e-maila
        await transporter.sendMail(mailOptions);
    }
}

// Funkcja generująca nowe hasło - możesz dostosować do swoich potrzeb
function generateNewPassword(): string {
    // Tutaj implementujesz swoją logikę generowania hasła
    return Math.random().toString(36).slice(-8); // Przykładowe generowanie losowego hasła
}

export default PasswordResetController;
