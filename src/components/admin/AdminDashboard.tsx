import { useState } from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { supabase } from "./supabaseAdmin";
import { NavButton } from "./AdminUI";
import { CMSView } from "./CMSView";
import { AdminSettings } from "./AdminSettings";
import { ImportView } from "./ImportView";
import type { Session } from "@supabase/supabase-js";

interface AdminDashboardProps {
    session: Session;
}

export function AdminDashboard({ session }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'listings' | 'events' | 'news' | 'knowledge' | 'settings' | 'import'>('listings');

  return (
    <div className="h-screen bg-[#F5F5F7] flex font-sans text-[#1d1d1f] overflow-hidden">
      {/* Pane 1: Main Sidebar Navigation */}
      <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col z-20 flex-shrink-0">
        <div className="p-6 pb-2">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-[#7935F8] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#7935F8]/20">
                    <span className="font-bold text-lg">F</span>
                </div>
                <h1 className="text-lg font-bold tracking-tight text-[#1d1d1f]">CMS</h1>
            </div>
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Content</p>
        </div>

        <nav className="space-y-0.5 px-3 flex-1 overflow-y-auto">
          <NavButton active={activeTab === 'listings'} onClick={() => setActiveTab('listings')} icon="users">Directory</NavButton>
          <NavButton active={activeTab === 'events'} onClick={() => setActiveTab('events')} icon="calendar">Events</NavButton>
          <NavButton active={activeTab === 'news'} onClick={() => setActiveTab('news')} icon="news">News</NavButton>
          <NavButton active={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} icon="book">Explore</NavButton>
          <NavButton active={activeTab === 'import'} onClick={() => setActiveTab('import')} icon="upload">Import</NavButton>
        </nav>

        <div className="p-4 border-t border-gray-100">
           <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">System</p>
            <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon="settings">Settings</NavButton>

           <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="px-3 py-2 flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">
                        {session.user.email?.[0].toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="text-xs font-medium text-[#1d1d1f] truncate">{session.user.email}</div>
                        <div className="text-[10px] text-gray-400">Admin</div>
                    </div>
                </div>
               <Button
                variant="ghost"
                className="w-full gap-2 justify-start text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg h-9 text-xs"
                onClick={() => supabase.auth.signOut()}
               >
                 <LogOut className="w-3 h-3" /> Sign Out
               </Button>
           </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {activeTab === 'settings' ? (
            <div className="flex-1 p-12 overflow-y-auto bg-white">
                <AdminSettings session={session} />
            </div>
        ) : activeTab === 'import' ? (
            <div className="flex-1 p-12 overflow-y-auto bg-white">
                <ImportView session={session} />
            </div>
        ) : (
            <CMSView type={activeTab} session={session} />
        )}
      </main>
    </div>
  );
}
