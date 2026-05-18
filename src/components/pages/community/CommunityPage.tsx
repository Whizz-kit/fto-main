import { useState } from "react";
import { SEO } from "../../shared/SEO";
import { CommunityLayout } from "./CommunityLayout";
import { CommunityFeed } from "./CommunityFeed";
import { CommunityChat } from "./CommunityChat";
import { CommunityBookmarks } from "./CommunityBookmarks";
import { CommunityProfile } from "./CommunityProfile";
import { CommunitySubmit } from "./CommunitySubmit";

interface CommunityPageProps {
  onExit: () => void;
}

export function CommunityPage({ onExit }: CommunityPageProps) {
  const [activeTab, setActiveTab] = useState<"feed" | "chat" | "bookmarks" | "profile" | "submit">("feed");
  const [activeChannel, setActiveChannel] = useState("general");

  return (
    <>
    <SEO
      title="Community"
      description="Join the Find The Others community. Connect with consciousness explorers, share experiences, and find your tribe."
      url="/community"
      keywords={["community", "consciousness", "connection", "discord"]}
    />
    <CommunityLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onExit={onExit}
      activeChannel={activeChannel}
      onChannelChange={setActiveChannel}
    >
      {activeTab === "feed" && <CommunityFeed />}
      {activeTab === "chat" && <CommunityChat />}
      {activeTab === "bookmarks" && <CommunityBookmarks onNavigate={setActiveTab} />}
      {activeTab === "profile" && <CommunityProfile />}
      {activeTab === "submit" && <CommunitySubmit />}
    </CommunityLayout>
    </>
  );
}
