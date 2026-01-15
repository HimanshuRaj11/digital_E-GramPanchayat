import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import logger from '@/lib/logger';
import { logAction } from '@/lib/audit';

export async function POST(req: Request) {
    try {
        const { name, email, password, role, phone, address } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'citizen',
            phone,
            address,
        });

        logger.info(`User registered: ${email}`);
        await logAction('USER_REGISTER', { email, role }, newUser._id.toString());

        return NextResponse.json(
            { message: 'User registered successfully', user: newUser },
            { status: 201 }
        );
    } catch (error: any) {
        logger.error('Registration Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}
