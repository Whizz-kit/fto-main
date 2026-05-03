import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "./supabaseAdmin";
import { Label } from "./AdminUI";
import type { Session } from "@supabase/supabase-js";

interface AdminSettingsProps {
    session: Session;
}

export function AdminSettings({ session }: AdminSettingsProps) {
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdatePassword = async () => {
        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) toast.error(error.message);
        else toast.success("Password updated successfully");
        setLoading(false);
        setNewPassword("");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-[#1d1d1f]">Settings</h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-400">
                         {session.user.email?.[0].toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-[#1d1d1f]">Administrator</h3>
                        <p className="text-gray-500">{session.user.email}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-sm text-gray-900 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-green-600" /> Security
                    </h4>
                    <div className="space-y-3">
                        <Label>Update Password</Label>
                        <div className="flex gap-3">
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder="New password"
                                className="h-10"
                            />
                            <Button
                                onClick={handleUpdatePassword}
                                disabled={!newPassword || loading}
                                className="bg-[#1d1d1f] text-white hover:bg-black"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
