'use server'

import LoginSchema from '@/types/login-schema';
import {createSafeActionClient} from 'next-safe-action'
import { db } from '..';
import { eq } from 'drizzle-orm';
import { users } from '../schema';

const action = createSafeActionClient();

export const EmailSignIn = action(LoginSchema, async ({email, password, code}) => {
    try {
        // console.log(email, password, code);
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email)
        });

        if(!existingUser) return {error: "User not Found"}   

        return {Success :'User Sign in!'};
    } catch (error) {
        
    }
});