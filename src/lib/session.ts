'use server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const createSession = async (user: object) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables.');
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d'});

    const cookieStore = await cookies()
    cookieStore.set('ClientToken', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    })

    return { success: true };
}

export const createServiceSession = async (service: object) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables.');
    }

    const token = jwt.sign(service, process.env.JWT_SECRET, { expiresIn: '7d'});

    const cookieStore = await cookies()
    cookieStore.set('ServiceToken', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    })

    return { success: true };
}