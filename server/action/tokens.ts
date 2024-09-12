'use server'

import crypto from 'crypto'
import { db } from '..';
import { eq } from 'drizzle-orm';
import { emailTokens } from '../schema';

// Reading from the email_token model if the provide email exists
export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.query.emailTokens.findFirst({
            where: eq(emailTokens.id, email)
        })
        return verificationToken;
    } catch (error) {
        console.log(error);
        return;
    }
}

// creating a verification token
export const generateEmailVerificationToken =  async (email:string) => {
    try {
        const token = crypto.randomUUID();
        const expires = new Date(new Date().getTime() + 3600 * 1000);
        const existingToken = await getVerificationTokenByEmail(email);

        if(existingToken){
            await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id))
        }

        const verificationToken = await db.insert(emailTokens).values({
            email,
            token,
            expires
        });

        return verificationToken;
    } catch (error) {
        console.log(error);
    }
}