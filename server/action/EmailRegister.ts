'use server'

import {createSafeActionClient} from 'next-safe-action'
import { db } from '..';
import RegisterSchema from '@/types/register-schema';
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm';
import { users } from '../schema';
import { generateEmailVerificationToken } from './tokens';

const action = createSafeActionClient();

export const EmailRegister = action(RegisterSchema, async({email, password, name}) => {
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = await generateEmailVerificationToken(email);

        // Checking if User Already exists
        const existingUser  = await db.query.users.findFirst({
            where: eq(users.email, email)
        });

        if(existingUser){
            if(!existingUser.emailVerified){
                // await sendVerificationEmail(
                //     verificationToken[0].email,
                //     verificationToken[0].token
                // )
                return {success: "Email Comfirmation Reset"}
            }
            return {error: "User Already exists"}
        }
        if(!existingUser){
            await db.insert(users).values({
                email,
                name,
                password: hashedPassword
            });
            // await sendVerificationEmail(
            //     verificationToken[0].email,
            //     verificationToken[0].token
            // );
            return { success: "Confirmation Email Sent!" }
        }

        // return {success: "Email Comfirmation Sent"}
    }catch (error){
        console.log("During EmailRegistering", error);
    }
});