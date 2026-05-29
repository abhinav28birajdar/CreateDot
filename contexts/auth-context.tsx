"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { createSupabaseClient } from "@/lib/supabase";
import { User, AuthSession } from "@/types";

interface AuthContextType {
  session: AuthSession;
  user: User | null;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmPasswordReset: (token: string, newPassword: string) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<string>;
  uploadCoverPicture: (file: File) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession>({
    user: null,
    isLoading: true,
    error: null,
  });
  const [user, setUser] = useState<User | null>(null);

  const supabase = createSupabaseClient();

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session: supabaseSession },
        } = await supabase.auth.getSession();

        if (supabaseSession) {
          // Fetch user profile from database
          const { data: profileData, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", supabaseSession.user.id)
            .single();

          if (error) throw error;

          setUser(profileData);
          setSession((prev) => ({
            ...prev,
            user: profileData,
            isLoading: false,
          }));
        } else {
          setSession((prev) => ({
            ...prev,
            user: null,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setSession((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Auth check failed",
          isLoading: false,
        }));
      }
    };

    checkSession();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, authSession) => {
      if (authSession) {
        const { data: profileData } = await supabase
          .from("users")
          .select("*")
          .eq("id", authSession.user.id)
          .single();

        setUser(profileData);
        setSession((prev) => ({
          ...prev,
          user: profileData,
        }));
      } else {
        setUser(null);
        setSession((prev) => ({
          ...prev,
          user: null,
        }));
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Supabase auth error:", error);
        throw error;
      }

      if (!data.user?.id) {
        throw new Error("No user ID returned from signup");
      }

      // Create user profile
      const { error: profileError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          email,
          username: userData.username || email.split("@")[0],
          full_name: userData.full_name || "",
          ...userData,
        },
      ]);

      if (profileError) {
        console.error("Profile creation error:", profileError);
        // If profile creation fails, delete the auth user
        await supabase.auth.admin.deleteUser(data.user.id);
        throw new Error(`Failed to create profile: ${profileError.message}`);
      }

      setSession((prev) => ({ ...prev, isLoading: false }));
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Sign up failed";
      console.error("Full signup error:", error);
      setSession((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      return { error: error instanceof Error ? error : new Error(errorMessage) };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setSession((prev) => ({ ...prev, isLoading: false }));
      return { error: null };
    } catch (error) {
      setSession((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Sign in failed",
        isLoading: false,
      }));
      return { error: error instanceof Error ? error : new Error("Sign in failed") };
    }
  };

  const signInWithGoogle = async () => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`,
        },
      });

      if (error) {
        console.error("Google sign in error:", error);
        throw error;
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Google sign in failed";
      console.error("Full google signin error:", error);
      setSession((prev) => ({
        ...prev,
        error: errorMsg,
        isLoading: false,
      }));
      throw error;
    }
  };

  const signInWithGitHub = async () => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`,
        },
      });

      if (error) {
        console.error("GitHub sign in error:", error);
        throw error;
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "GitHub sign in failed";
      console.error("Full github signin error:", error);
      setSession((prev) => ({
        ...prev,
        error: errorMsg,
        isLoading: false,
      }));
      throw error;
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      setSession((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      setSession((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Magic link sign in failed",
        isLoading: false,
      }));
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setUser(null);
      setSession((prev) => ({
        ...prev,
        user: null,
        isLoading: false,
      }));
    } catch (error) {
      setSession((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Sign out failed",
        isLoading: false,
      }));
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) throw new Error("No user logged in");

      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();

      if (error) throw error;

      setUser(data);
      setSession((prev) => ({
        ...prev,
        user: data,
        isLoading: false,
      }));
    } catch (error) {
      setSession((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Profile update failed",
        isLoading: false,
      }));
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/reset-password`,
      });

      if (error) throw error;

      setSession((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Password reset failed";
      setSession((prev) => ({
        ...prev,
        error: errorMsg,
        isLoading: false,
      }));
      throw error;
    }
  };

  const confirmPasswordReset = async (token: string, newPassword: string) => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setSession((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Password reset confirmation failed";
      setSession((prev) => ({
        ...prev,
        error: errorMsg,
        isLoading: false,
      }));
      throw error;
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      // Verify old password by attempting to sign in
      const {
        data: { session: currentSession },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !currentSession?.user) {
        throw new Error("No active session found");
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      setSession((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Password change failed";
      setSession((prev) => ({
        ...prev,
        error: errorMsg,
        isLoading: false,
      }));
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await supabase.from("email_verifications").update({ verified_at: new Date() }).eq("token", token);

      if (error) throw error;

      setSession((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Email verification failed";
      setSession((prev) => ({
        ...prev,
        error: errorMsg,
        isLoading: false,
      }));
      throw error;
    }
  };

  const uploadProfilePicture = async (file: File): Promise<string> => {
    try {
      if (!user) throw new Error("No user logged in");

      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-avatar-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, {
        upsert: true,
      });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Update user profile with new avatar URL
      await updateProfile({ avatar_url: publicUrl });

      setSession((prev) => ({ ...prev, isLoading: false }));
      return publicUrl;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Profile picture upload failed";
      setSession((prev) => ({
        ...prev,
        error: errorMsg,
        isLoading: false,
      }));
      throw error;
    }
  };

  const uploadCoverPicture = async (file: File): Promise<string> => {
    try {
      if (!user) throw new Error("No user logged in");

      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-cover-${Date.now()}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("covers").upload(filePath, file, {
        upsert: true,
      });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("covers").getPublicUrl(filePath);

      // Update user profile with new cover URL
      await updateProfile({ cover_url: publicUrl });

      setSession((prev) => ({ ...prev, isLoading: false }));
      return publicUrl;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Cover picture upload failed";
      setSession((prev) => ({
        ...prev,
        error: errorMsg,
        isLoading: false,
      }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithGitHub,
        signInWithMagicLink,
        signOut,
        updateProfile,
        resetPassword,
        confirmPasswordReset,
        changePassword,
        verifyEmail,
        uploadProfilePicture,
        uploadCoverPicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

