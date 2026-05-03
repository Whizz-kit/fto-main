import { useState } from "react";
import { CommunityLayoutV2 } from "./CommunityLayoutV2";
import { CommunityFeedV2 } from "./CommunityFeedV2";
import { CommunityChatV2 } from "./CommunityChatV2";
import { CommunityBookmarksV2 } from "./CommunityBookmarksV2";
import { CommunityProfileV2 } from "./CommunityProfileV2";
import { CommunitySubmitV2 } from "./CommunitySubmitV2";

interface CommunityPageProps {
  onExit: () => void;
}

export function CommunityPageV2({ onExit }: CommunityPageProps) {
  const [activeTab, setActiveTab] = useState<"feed" | "chat" | "bookmarks" | "profile" | "submit">("feed");
  const [activeChannel, setActiveChannel] = useState("general");

  return (
    <CommunityLayoutV2
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onExit={onExit}
      activeChannel={activeChannel}
      onChannelChange={setActiveChannel}
    >
      {activeTab === "feed" && <CommunityFeedV2 />}
      {activeTab === "chat" && <CommunityChatV2 />}
      {activeTab === "bookmarks" && <CommunityBookmarksV2 onNavigate={setActiveTab} />}
      {activeTab === "profile" && <CommunityProfileV2 />}
      {activeTab === "submit" && <CommunitySubmitV2 />}
    </CommunityLayoutV2>
  );
}
