'use server'

import {createSafeActionClient} from 'next-safe-action'
import { db } from '..';
import RegisterSchema from '@/types/register-schema';
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm';
import { users } from '../schema';
import { generateEmailVerificationToken } from './tokens';
import { sendVerificationEmail } from './email';

const action = createSafeActionClient();

export const EmailRegister = action(RegisterSchema, async({email, password, name}) => {
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = await generateEmailVerificationToken(email);

        // Checking if User Already exists
        const existingUser  = await db.query.users.findFirst({
            where: eq(users.email, email)
        });

        // if User Already exists
        if(existingUser){
            if(!existingUser.emailVerified){
                    await sendVerificationEmail(
                        verificationToken![0].email,
                        verificationToken![0].token,
                        name
                    )
                return {success: "Email Comfirmation Resent!"}
            }
            // if User Already exists and Email is Verified
            return {error: "User Already exists"}
        }

        // Create a new user account
            await db.insert(users).values({
                email,
                name,
                password: hashedPassword
            });
                console.log("Verification Token Email",verificationToken![0].email);
                
                await sendVerificationEmail(
                    verificationToken![0].email,
                    verificationToken![0].token,
                    name
                );
            return { success: "Confirmation Email Sent!" }
    }catch (error){
        console.log("During Email Registering!", error);
    }
});