import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

export const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);

export async function performAuthenticatedAction(action: (token: string) => Promise<unknown>) {
    let { data: { session } } = await supabase.auth.getSession();

    const now = Math.floor(Date.now() / 1000);
    const isExpired = session?.expires_at && session.expires_at < (now + 120);

    if (!session?.access_token || isExpired) {
         const { data: { session: refreshed }, error } = await supabase.auth.refreshSession();
         if (error || !refreshed) {
             throw new Error("No active session. Please sign in.");
         }
         session = refreshed;
    }

    try {
        return await action(session.access_token);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        if (message.includes('401') || message.includes('Invalid JWT')) {
            const { data: { session: refreshed } } = await supabase.auth.refreshSession();

            if (refreshed?.access_token) {
                 return await action(refreshed.access_token);
            } else {
                throw new Error("No active session. Please sign in.");
            }
        }
        throw err;
    }
}
