import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'citizen' | 'staff' | 'officer' | 'admin';
    phone?: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, select: false }, // Password optional for OAuth, but required for credentials
        role: {
            type: String,
            enum: ['citizen', 'staff', 'officer', 'admin'],
            default: 'citizen',
        },
        phone: { type: String },
        address: { type: String },
    },
    { timestamps: true }
);

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
