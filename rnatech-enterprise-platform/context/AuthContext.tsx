import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { UserRole } from '../types';

type AuthContextType = {
  user: any | null;
  profile: any | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<any>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(() => {
    try {
      const saved = localStorage.getItem('rnatech_profile');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Safety timeout: Ensure loading is never stuck for more than 8 seconds
    const safetyTimeout = setTimeout(() => {
      if (mounted && loading) {
        console.warn("Auth initialization timed out. Forcing loading state to false.");
        setLoading(false);
      }
    }, 8000);

    const initializeAuth = async () => {
      try {
        // 1. Check for session (with 5s safety timeout)
        const { data: { session } } = await Promise.race([
          supabase.auth.getSession(),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Session Timeout")), 5000))
        ]) as any;
        
        if (!mounted) return;

        if (session?.user) {
          setUser(session.user);
          // Background revalidation if we have a cache
          if (profile) {
              setLoading(false);
              fetchProfile(session.user.id);
          } else {
              await fetchProfile(session.user.id);
          }
        } else {
          setUser(null);
          setProfile(null);
          localStorage.removeItem('rnatech_profile');
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && currentUser) {
        if (profile) fetchProfile(currentUser.id);
        else await fetchProfile(currentUser.id);
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
        setLoading(false);
        localStorage.removeItem('rnatech_profile');
      } else if (event === 'TOKEN_REFRESHED' && currentUser) {
          fetchProfile(currentUser.id);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(safetyTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (uid: string) => {
    const withTimeout = (promise: PromiseLike<any>, timeoutMs: number) => {
      return Promise.race([
        Promise.resolve(promise),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Query Timeout")), timeoutMs))
      ]);
    };

    try {
      console.log(`[Auth] Fetching profile for node: ${uid}`);
      
      // 1. Check Admin Table first (with 5s timeout)
      const { data: adminData, error: adminError } = await withTimeout(
        supabase.from('admins').select('*').eq('id', uid).maybeSingle().then(r => r),
        5000
      );

      if (adminError) console.warn("[Auth] Admin check error:", adminError);

      if (adminData) {
        console.log("[Auth] Admin clearance verified.");
        const fullProfile = { ...adminData, role: UserRole.ADMIN };
        setProfile(fullProfile);
        localStorage.setItem('rnatech_profile', JSON.stringify(fullProfile));
        return;
      }

      // 2. Check Customer Profiles (with 5s timeout)
      const { data: customerData, error: customerError } = await withTimeout(
        supabase.from('profiles').select('*').eq('id', uid).maybeSingle().then(r => r),
        5000
      );
      
      if (customerError) console.warn("[Auth] Customer check error:", customerError);

      if (customerData) {
        console.log("[Auth] Customer profile verified.");
        const fullProfile = { ...customerData, role: UserRole.CUSTOMER };
        setProfile(fullProfile);
        localStorage.setItem('rnatech_profile', JSON.stringify(fullProfile));
      } else {
        console.log("[Auth] No profile found for identity.");
        setProfile(null);
        localStorage.removeItem('rnatech_profile');
      }
    } catch (e) {
      console.error("[Auth] Fatal profile fetch error:", e);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
