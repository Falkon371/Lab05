import { Request, Response, NextFunction } from 'express';
import { IUser } from '../modules/models/user.model';

export function authorize(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IUser; 

        if (!user) {
            return res.status(401).json({ message: 'Brak uwierzytelnienia.' });
        }

        if (user.role !== role) {
            return res.status(403).json({ message: 'Brak odpowiednich uprawnień.' });
        }

        next();
    };
}
