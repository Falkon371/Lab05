import { Schema, model } from 'mongoose';
import { IUser } from "../models/user.model";

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Poprawione wartości enum i domyślna wartość
    active: { type: Boolean, default: true },
});

export default model<IUser>('User', UserSchema);
