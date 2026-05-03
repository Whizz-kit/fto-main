import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "../admin/supabaseAdmin";
import { AdminLogin } from "../admin/AdminLogin";
import { AdminDashboard } from "../admin/AdminDashboard";
import type { Session } from "@supabase/supabase-js";

export function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
        <Loader2 className="w-8 h-8 animate-spin text-[#7935F8]" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  return <AdminDashboard session={session} />;
}
