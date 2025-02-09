'use server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const createSession = async (user: object) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables.');
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h'});

    const cookieStore = await cookies()
    cookieStore.set('ClientToken', token, {
        httpOnly: true,
        maxAge: 60 * 60,
        path: '/',
    })

    return { success: true };
};

export const userAuth = async (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        const { id, name, email, image, createdAt } = decoded;
        return { id, name, email, image, createdAt };
    } catch (err: any) {
        return { error: "User doesn't exist: " + err.message };
    }
}