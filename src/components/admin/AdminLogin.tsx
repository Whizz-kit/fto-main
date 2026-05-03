import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Loader2, Home } from "lucide-react";
import { supabase } from "./supabaseAdmin";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) toast.error(error.message);
    else toast.success("Welcome back!");

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCF8F3] font-sans relative">
      <a
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-[#7935F8] transition-colors group"
      >
        <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#7935F8]/30 group-hover:bg-[#7935F8]/5 transition-all">
          <Home className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium">Back to Home</span>
      </a>

      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#101010]">Admin Access</h1>
            <p className="text-gray-500 text-sm mt-2">Sign in to manage the FTO platform</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 block ml-1">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="rounded-xl h-12 bg-gray-50 border-transparent focus:bg-white focus:border-[#7935F8]/20 transition-all"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 block ml-1">Password</label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="rounded-xl h-12 bg-gray-50 border-transparent focus:bg-white focus:border-[#7935F8]/20 transition-all"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full rounded-xl h-12 bg-[#7935F8] hover:bg-[#6929d6] text-white font-medium shadow-lg shadow-[#7935F8]/20 mt-2" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
