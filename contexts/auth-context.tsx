"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import { User, AuthSession } from "@/types";

export interface ExtendedUserData extends Partial<User> {
  name?: string;
  role?: "creator" | "consumer" | "client" | "guest" | "admin";
  discipline?: string;
  portfolio_url?: string;
  company_name?: string;
  intent?: string;
  budget?: string;
  industry?: string;
}

export interface AuthContextType {
  session: AuthSession;
  user: User | null;
  role: "creator" | "consumer" | "client" | "guest" | "admin";
  signUp: (email: string, password: string, userData: ExtendedUserData) => Promise<{ error: Error | null; user?: User | null }>;
  signIn: (email: string, password: string, role?: "creator" | "consumer") => Promise<{ error: Error | null; user?: User | null }>;
  switchRole: (newRole: "creator" | "consumer") => void;
  setLocalSession: (user: User) => void;
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

  // Helper to load locally persisted user
  const loadLocalUser = useCallback((): User | null => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("createdot_user") || localStorage.getItem("createdot_demo_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.id || parsed.email)) {
          // Normalize user fields
          const normalized: User = {
            id: parsed.id || "u-local",
            email: parsed.email || "user@createdot.io",
            username: parsed.username || parsed.email?.split("@")[0] || "user",
            full_name: parsed.full_name || parsed.name || "User",
            avatar_url: parsed.avatar_url || (parsed.name?.toLowerCase().includes("abhinav") ? "/images/profile-image-4.png" : null),
            cover_url: parsed.cover_url || null,
            bio: parsed.bio || null,
            website_url: parsed.website_url || parsed.portfolio_url || undefined,
            location: parsed.location || "Global",
            role: parsed.role || "creator",
            verified: parsed.verified ?? true,
            skills: parsed.skills || ["UI/UX", "Design Systems"],
            tools: parsed.tools || ["Figma", "React"],
            social_links: parsed.social_links || {},
            followers_count: parsed.followers_count || 120,
            following_count: parsed.following_count || 45,
            projects_count: parsed.projects_count || 3,
            likes_count: parsed.likes_count || 480,
            created_at: parsed.created_at || new Date().toISOString(),
            updated_at: parsed.updated_at || new Date().toISOString(),
          };
          return normalized;
        }
      }
    } catch (e) {
      console.error("Error reading local user:", e);
    }
    return null;
  }, []);

  // Check session on mount and listen to changes
  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const {
          data: { session: supabaseSession },
        } = await supabase.auth.getSession();

        if (supabaseSession?.user && isMounted) {
          const { data: profileData } = await supabase
            .from("users")
            .select("*")
            .eq("id", supabaseSession.user.id)
            .single();

          const activeUser = profileData || loadLocalUser();
          if (activeUser && isMounted) {
            setUser(activeUser);
            setSession({
              user: activeUser,
              isLoading: false,
              error: null,
            });
            return;
          }
        }

        // Check local storage if Supabase has no active session
        const localUser = loadLocalUser();
        if (localUser && isMounted) {
          setUser(localUser);
          setSession({
            user: localUser,
            isLoading: false,
            error: null,
          });
        } else if (isMounted) {
          setUser(null);
          setSession({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      } catch {
        const localUser = loadLocalUser();
        if (isMounted) {
          setUser(localUser);
          setSession({
            user: localUser,
            isLoading: false,
            error: null,
          });
        }
      }
    };

    checkSession();

    // Supabase auth subscription
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, authSession) => {
      if (authSession?.user && isMounted) {
        try {
          const { data: profileData } = await supabase
            .from("users")
            .select("*")
            .eq("id", authSession.user.id)
            .single();

          const updated = profileData || loadLocalUser();
          setUser(updated);
          setSession({
            user: updated,
            isLoading: false,
            error: null,
          });
        } catch {
          const localUser = loadLocalUser();
          setUser(localUser);
          setSession({ user: localUser, isLoading: false, error: null });
        }
      } else if (!authSession && isMounted) {
        const localUser = loadLocalUser();
        setUser(localUser);
        setSession({ user: localUser, isLoading: false, error: null });
      }
    });

    // Real-time custom event listener for in-app auth changes
    const handleAuthEvent = (e: Event) => {
      const customEvent = e as CustomEvent<User | null>;
      const newUser = customEvent.detail ?? loadLocalUser();
      setUser(newUser);
      setSession({
        user: newUser,
        isLoading: false,
        error: null,
      });
    };

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === "createdot_user" || e.key === "createdot_demo_user") {
        const updated = loadLocalUser();
        setUser(updated);
        setSession({ user: updated, isLoading: false, error: null });
      }
    };

    window.addEventListener("createdot-auth-changed", handleAuthEvent);
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
      window.removeEventListener("createdot-auth-changed", handleAuthEvent);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, [supabase, loadLocalUser]);

  // Set local session directly
  const setLocalSession = useCallback((newUser: User) => {
    try {
      localStorage.setItem("createdot_user", JSON.stringify(newUser));
      localStorage.setItem("createdot_demo_user", JSON.stringify(newUser));
      document.cookie = `createdot_demo_user=true; path=/; max-age=86400`;
      setUser(newUser);
      setSession({ user: newUser, isLoading: false, error: null });
      window.dispatchEvent(new CustomEvent("createdot-auth-changed", { detail: newUser }));
    } catch (e) {
      console.error("setLocalSession error:", e);
    }
  }, []);

  // Switch role in real time (Creator <-> Consumer)
  const switchRole = useCallback((newRole: "creator" | "consumer") => {
    if (!user) return;
    const updatedUser: User = {
      ...user,
      role: newRole,
      updated_at: new Date().toISOString(),
    };
    setLocalSession(updatedUser);
  }, [user, setLocalSession]);

  // Sign up for Creator or Consumer with proper fill format
  const signUp = async (email: string, password: string, userData: ExtendedUserData) => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const role = userData.role || "creator";
      const isCreator = role === "creator";
      const emailPrefix = email.split("@")[0] || "user";
      const fullName = userData.full_name || userData.name || emailPrefix;
      const username = userData.username || emailPrefix.toLowerCase().replace(/[^a-z0-9_]/g, "");

      // Custom avatar if Abhinav or default avatar
      const avatarUrl = fullName.toLowerCase().includes("abhinav")
        ? "/images/profile-image-4.png"
        : userData.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`;

      const newUser: User = {
        id: `u-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        email,
        username,
        full_name: fullName,
        avatar_url: avatarUrl,
        cover_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
        bio: isCreator
          ? userData.bio || `Creative specializing in ${userData.discipline || "UI/UX & Design Systems"}.`
          : userData.bio || `Client / Consumer looking to ${userData.intent || "hire visionary creators"}. Organization: ${userData.company_name || "Independent"}`,
        website_url: userData.portfolio_url || userData.website_url || undefined,
        location: userData.location || "San Francisco, CA",
        role: role,
        verified: true,
        skills: isCreator
          ? (userData.skills && userData.skills.length > 0 ? userData.skills : ["UI/UX Design", "Figma", "React", "Design Systems"])
          : ["Creative Direction", "Talent Acquisition", "Product Strategy"],
        tools: isCreator ? (userData.tools || ["Figma", "TailwindCSS", "Next.js"]) : ["CreateDOT Studio"],
        social_links: userData.social_links || {},
        followers_count: isCreator ? 45 : 0,
        following_count: isCreator ? 20 : 15,
        projects_count: isCreator ? 1 : 0,
        likes_count: isCreator ? 12 : 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Try Supabase auth
      try {
        const { data: sbData } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: fullName,
              full_name: fullName,
              username,
              role,
            },
          },
        });

        if (sbData?.user?.id) {
          newUser.id = sbData.user.id;
          try {
            await supabase.from("users").insert([newUser]);
          } catch {
            // ignore
          }
        }
      } catch (sbErr) {
        // Fallback to local session
        console.warn("Supabase remote signup unavailable, using real-time local session:", sbErr);
      }

      setLocalSession(newUser);
      return { error: null, user: newUser };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Sign up failed";
      setSession((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      return { error: error instanceof Error ? error : new Error(errorMessage) };
    }
  };

  // Sign in for Creator or Consumer
  const signIn = async (email: string, password: string, role?: "creator" | "consumer") => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true, error: null }));

      const effectiveRole = role || (email.includes("client") || email.includes("consumer") ? "consumer" : "creator");
      const isAbhinav = email.toLowerCase().includes("abhinav");

      const emailPrefix = email.split("@")[0] || "user";
      const loggedInUser: User = {
        id: isAbhinav ? "u-abhinav" : `u-${Date.now()}`,
        email,
        username: isAbhinav ? "abhinav" : emailPrefix.toLowerCase().replace(/[^a-z0-9_]/g, ""),
        full_name: isAbhinav ? "Abhinav" : (effectiveRole === "consumer" ? "Aura Studios Client" : "Creative Member"),
        avatar_url: isAbhinav ? "/images/profile-image-4.png" : `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        cover_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
        bio: effectiveRole === "creator"
          ? "Principal Product Designer & Creative Technologist on CreateDOT."
          : "Enterprise Client & Creative Director hiring top design talent on CreateDOT.",
        website_url: "https://createdot.io",
        location: "San Francisco, CA",
        role: effectiveRole,
        verified: true,
        skills: effectiveRole === "creator" ? ["UI/UX", "3D Spatial", "React"] : ["Talent Sourcing", "Art Direction"],
        tools: ["CreateDOT Studio"],
        social_links: {},
        followers_count: effectiveRole === "creator" ? 24500 : 80,
        following_count: 180,
        projects_count: effectiveRole === "creator" ? 3 : 0,
        likes_count: effectiveRole === "creator" ? 142000 : 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      try {
        const { data: sbData, error: sbError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!sbError && sbData?.user) {
          const { data: profileData } = await supabase
            .from("users")
            .select("*")
            .eq("id", sbData.user.id)
            .single();

          if (profileData) {
            setLocalSession(profileData);
            return { error: null, user: profileData };
          }
        }
      } catch (sbErr) {
        console.warn("Supabase remote login offline, proceeding with instant session:", sbErr);
      }

      setLocalSession(loggedInUser);
      return { error: null, user: loggedInUser };
    } catch (error) {
      setSession((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Sign in failed",
        isLoading: false,
      }));
      return { error: error instanceof Error ? error : new Error("Sign in failed") };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut().catch(() => null);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("createdot_user");
        localStorage.removeItem("createdot_demo_user");
        document.cookie = "createdot_demo_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.dispatchEvent(new CustomEvent("createdot-auth-changed", { detail: null }));
      }
      setUser(null);
      setSession({
        user: null,
        isLoading: false,
        error: null,
      });
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error("No user logged in");
    const updated: User = {
      ...user,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    setLocalSession(updated);
    try {
      await supabase.from("users").update(updates).eq("id", user.id);
    } catch {
      // ignore
    }
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/api/auth/callback` },
    });
  };

  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/api/auth/callback` },
    });
  };

  const signInWithMagicLink = async (email: string) => {
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/api/auth/callback` },
    });
  };

  const resetPassword = async (email: string) => {
    await supabase.auth.resetPasswordForEmail(email);
  };

  const confirmPasswordReset = async (token: string, newPassword: string) => {
    await supabase.auth.updateUser({ password: newPassword });
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    await supabase.auth.updateUser({ password: newPassword });
  };

  const verifyEmail = async (token: string) => {
    await supabase.auth.verifyOtp({ token_hash: token, type: "email" });
  };

  const uploadProfilePicture = async (file: File): Promise<string> => {
    if (!user) throw new Error("No user logged in");
    const fakeUrl = URL.createObjectURL(file);
    await updateProfile({ avatar_url: fakeUrl });
    return fakeUrl;
  };

  const uploadCoverPicture = async (file: File): Promise<string> => {
    if (!user) throw new Error("No user logged in");
    const fakeUrl = URL.createObjectURL(file);
    await updateProfile({ cover_url: fakeUrl });
    return fakeUrl;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        role: (user?.role as any) || "guest",
        signUp,
        signIn,
        switchRole,
        setLocalSession,
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
