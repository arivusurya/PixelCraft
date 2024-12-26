"use server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";

// Initialize Firebase Admin (server-side)
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
};

// Ensure Firebase is only initialized once
const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseAdminConfig);

export async function sendOtp(phoneNumber: string) {
  try {
    // Validate phone number (add your specific validation)
    if (!phoneNumber || phoneNumber.length < 10) {
      return { success: false, message: "Invalid phone number" };
    }

    // Create a Firebase phone auth verification
    const auth = getAuth();
    const verificationSession = await auth.createSessionCookie(
      // This is a placeholder. In real implementation, you'd use Firebase Phone Auth
      await auth.createCustomToken(phoneNumber),
      { expiresIn: 60 * 60 * 24 * 5 * 1000 } // 5 days
    );

    // Store verification session in cookies
    (await cookies()).set("verification_session", verificationSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 5, // 5 days
    });

    return {
      success: true,
      message: "OTP sent successfully",
    };
  } catch (error) {
    console.error("OTP Send Error:", error);
    return {
      success: false,
      message: "Failed to send OTP",
    };
  }
}

export async function login(phoneNumber: string, otp: string) {
  "use server";

  try {
    // Validate inputs
    if (!phoneNumber || !otp) {
      return { success: false, message: "Invalid input" };
    }

    const auth = getAuth();

    // Verify the OTP
    // Note: This is a placeholder. Firebase Phone Auth would handle actual OTP verification
    const userRecord = await auth.createUser({
      phoneNumber: phoneNumber,
    });

    // Create a session cookie
    const sessionCookie = await auth.createSessionCookie(
      await auth.createCustomToken(userRecord.uid),
      { expiresIn: 60 * 60 * 24 * 5 * 1000 } // 5 days
    );

    // Set session cookie
    await (
      await cookies()
    ).set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 5, // 5 days
    });

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: "Login failed",
    };
  }
}
