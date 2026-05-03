import { useState } from "react";
import { CommunityLayout } from "./CommunityLayout";
import { CommunityFeed } from "./CommunityFeed";
import { CommunityChat } from "./CommunityChat";
import { CommunityBookmarks } from "./CommunityBookmarks";
import { CommunityProfile } from "./CommunityProfile";

interface CommunityPageProps {
  onExit: () => void;
}

export function CommunityPage({ onExit }: CommunityPageProps) {
  const [activeTab, setActiveTab] = useState<"feed" | "chat" | "bookmarks" | "profile">("feed");

  return (
    <CommunityLayout activeTab={activeTab} onTabChange={setActiveTab} onExit={onExit}>
      {activeTab === "feed" && <CommunityFeed />}
      {activeTab === "chat" && <CommunityChat />}
      {activeTab === "bookmarks" && <CommunityBookmarks onNavigate={setActiveTab} />}
      {activeTab === "profile" && <CommunityProfile />}
    </CommunityLayout>
  );
}
