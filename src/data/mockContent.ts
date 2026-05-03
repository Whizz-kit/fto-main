import { Event, NewsArticle, KnowledgeArticle } from "./types";

// Real Events Data - upcoming consciousness/transformation events
export const mockEvents: Event[] = [
  {
    id: "icpr-2026",
    title: "ICPR 2026: Interdisciplinary Conference on Psychedelic Research",
    startDate: "2026-06-04T09:00:00Z",
    endDate: "2026-06-06T18:00:00Z",
    location: { type: "in-person", city: "Haarlem", country: "Netherlands" },
    organizer: "OPEN Foundation",
    description: "Europe's premier scientific conference on psychedelic research and therapy. Features keynotes, panels, symposia, poster sessions, and workshops bridging science, clinical practice, and policy. A must-attend for anyone serious about the future of psychedelic medicine.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Psychedelics", "Research", "Science"],
    website: "https://www.icpr-conference.com/",
    price: { type: "paid", amount: "€350-650" }
  },
  {
    id: "being-gathering-2026",
    title: "Being Gathering 2026",
    startDate: "2026-07-01T12:00:00Z",
    endDate: "2026-07-05T12:00:00Z",
    location: { type: "in-person", city: "Idanha-a-Nova", country: "Portugal" },
    organizer: "Boom Festival / Good Mood",
    description: "An intimate gathering at Boomland focused on well-being, music, and oneness. Breathwork sessions, plant-based cooking, gong baths, and sunrise yoga in a lakeside setting. The more contemplative sibling of Boom Festival.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Festival", "Breathwork", "Community"],
    website: "https://www.being-gathering.org/",
    price: { type: "paid", amount: "€120-180" }
  },
  {
    id: "assc-29-2026",
    title: "ASSC 29: Association for the Scientific Study of Consciousness",
    startDate: "2026-06-30T09:00:00Z",
    endDate: "2026-07-03T17:00:00Z",
    location: { type: "in-person", city: "Santiago", country: "Chile" },
    organizer: "ASSC",
    description: "The 29th annual scientific meeting on the rigorous study of consciousness. Neuroscientists, philosophers, and psychologists from around the world convene in Santiago for this rare South American edition.",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Consciousness", "Neuroscience", "Philosophy"],
    website: "https://theassc.org/assc-29/",
    price: { type: "paid", amount: "$200-400" }
  },
  {
    id: "breath-summit-2026",
    title: "Breath & Personal Transformation Summit 2026",
    startDate: "2026-08-02T09:00:00Z",
    endDate: "2026-08-15T17:00:00Z",
    location: { type: "in-person", city: "Koh Samui", country: "Thailand" },
    organizer: "Samahita Retreat",
    description: "A two-week immersion into breath-mind-body integration. Combines pranayama, meditation, and cutting-edge scientific insight on stress and longevity. Led by Dr. Paul Dallaghan and Dr. Elissa Epel. 100 hours of Continuing Education credits.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Breathwork", "Pranayama", "Retreat"],
    website: "https://www.samahitaretreat.com/retreat/breath-summit-2026",
    price: { type: "paid", amount: "Contact for rates" }
  },
  {
    id: "burning-man-2026",
    title: "Burning Man 2026",
    startDate: "2026-08-30T00:00:00Z",
    endDate: "2026-09-07T00:00:00Z",
    location: { type: "in-person", city: "Black Rock City", country: "United States" },
    organizer: "Burning Man Project",
    description: "The iconic gathering in the Nevada desert dedicated to community, art, self-expression, and radical self-reliance. Thousands of workshops covering consciousness, transformation, and creative expression in a temporary city built from nothing.",
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Festival", "Art", "Community"],
    website: "https://burningman.org/",
    price: { type: "paid", amount: "$575+" }
  },
  {
    id: "world-ayahuasca-forum-2026",
    title: "World Ayahuasca Forum 2026",
    startDate: "2026-09-11T09:00:00Z",
    endDate: "2026-09-13T18:00:00Z",
    location: { type: "in-person", city: "Girona", country: "Spain" },
    organizer: "ICEERS",
    description: "The first-ever global forum uniting the World Ayahuasca Conference and the Indigenous Ayahuasca Conference. Over 100 Indigenous spiritual leaders join researchers, health professionals, and policymakers for intercultural dialogue. Expected 2,000+ attendees.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Plant Medicine", "Indigenous Wisdom", "Research"],
    website: "https://www.ayahuasca2026.com/",
    price: { type: "paid", amount: "€150-350" }
  },
  {
    id: "wonderland-2026",
    title: "Wonderland 2026",
    startDate: "2026-10-15T09:00:00Z",
    endDate: "2026-10-17T18:00:00Z",
    location: { type: "in-person", city: "Austin", country: "United States" },
    organizer: "Wonderland",
    description: "An intimate, immersive event uniting industry leaders, researchers, and explorers to examine the potential of psychedelic-assisted therapy, longevity, and mental health. Known for high-quality content and meaningful networking.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Psychedelics", "Therapy", "Mental Health"],
    website: "https://wonderlandconference.com/",
    price: { type: "paid", amount: "TBA" }
  },
  {
    id: "maps-design-festival-2026",
    title: "MAPS Psychedelics Design Festival & Awards",
    startDate: "2026-11-06T10:00:00Z",
    endDate: "2026-11-07T18:00:00Z",
    location: { type: "online" },
    organizer: "MAPS",
    description: "An online festival exploring design as a creative force for psychedelic experiences, connection, and aliveness. Features awards recognizing outstanding work in psychedelic experience design. Accessible from anywhere.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Psychedelics", "Design", "Online"],
    website: "https://maps.org/events/",
    price: { type: "paid", amount: "Check MAPS site" }
  },
  {
    id: "global-wellness-summit-2026",
    title: "Global Wellness Summit 2026",
    startDate: "2026-11-10T09:00:00Z",
    endDate: "2026-11-13T17:00:00Z",
    location: { type: "in-person", city: "Phuket", country: "Thailand" },
    organizer: "Global Wellness Institute",
    description: "The foremost gathering of international leaders in the global wellness economy. Thought leaders shaping the future of wellness, health, and human potential come together at a luxury resort in Phuket.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Wellness", "Leadership", "Health"],
    website: "https://www.globalwellnesssummit.com/2026-global-wellness-summit/",
    price: { type: "paid", amount: "Premium pricing" }
  }
];

// Mock News Data
export const mockNews: NewsArticle[] = [
  {
    id: "va-psychedelic-therapy-veterans",
    title: "The VA Breaks a 60-Year Silence on Psychedelics",
    publishedAt: "2026-03-20T10:00:00Z",
    category: "announcement",
    excerpt: "The U.S. Department of Veterans Affairs is funding MDMA-assisted therapy research for the first time since the 1960s. A profound institutional pivot that signals psychedelic medicine has crossed from fringe to frontline.",
    content: "For decades, psychedelic-assisted therapy existed in a strange liminal space: promising in research, forbidden in practice. That era is ending.\n\nThe U.S. Department of Veterans Affairs has launched a $1.5 million, five-year study at Brown and Yale, enrolling veterans with PTSD and alcohol use disorder into MDMA-assisted therapy. Twelve participants are already in.\n\nThis is not a Silicon Valley wellness startup experimenting with microdosing. This is the most conservative healthcare institution in America investing real resources into psychedelic medicine. The symbolic weight is enormous.\n\nFor the veteran community, where PTSD rates remain stubbornly high despite decades of conventional treatment, this could represent something genuinely new. Not a cure-all, but a door that was locked for sixty years, finally opening.\n\nWhat matters here is not just the science (which has been building for years), but the institutional willingness to act on it. When the VA moves, policy follows. And when policy follows, access expands.\n\nWe are watching a generational shift happen in real time.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Psychedelics", "Policy", "Mental Health"],
    author: "FTO Editorial"
  },
  {
    id: "brain-biophotons-consciousness",
    title: "Your Brain Is Literally Glowing. And Scientists Just Detected It",
    publishedAt: "2026-03-15T09:00:00Z",
    category: "research",
    excerpt: "Researchers have detected biophotons emitted by the living human brain through the skull for the first time. The emissions shift when awareness shifts. A new frontier in consciousness research has quietly opened.",
    content: "Here is something that sounds like mysticism but is now published science: your brain emits light. Not metaphorically. Photons.\n\nResearchers at Algoma University and Tufts have detected biophotons passing through the intact human skull for the first time, using a technique they are calling photoencephalography. The study, published in iScience, found that these ultra-faint emissions change in pattern when participants shift between cognitive tasks.\n\nThe implications are still unfolding. Nobody is claiming this is proof of an \"aura\" or anything resembling New Age energy fields. But the observation that biological light correlates with changes in awareness raises questions that current neuroscience frameworks are not fully equipped to answer.\n\nWhat is light doing in cognition? Is it functional, or a byproduct? And could this become a new, portable, non-invasive way to study consciousness directly?\n\nWe are still in the earliest stages. But the finding is a reminder that consciousness, whatever it is, continues to surprise us with what it can do in a body.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Neuroscience", "Consciousness", "Research"],
    author: "FTO Editorial"
  },
  {
    id: "loneliness-economy-antidote",
    title: "The $500 Billion Loneliness Economy, and the People Building Its Antidote",
    publishedAt: "2026-03-10T11:00:00Z",
    category: "insight",
    excerpt: "54% of U.S. adults report feeling isolated. The loneliness economy is projected to exceed $500 billion. But quietly, a counter-movement is forming: phone-free dinner clubs, skill swaps, and new rituals of belonging.",
    content: "Loneliness is now a market. A big one.\n\nThe so-called loneliness economy (therapy apps, AI companions, parasocial content, co-living startups) is projected to surpass $500 billion by 2026. More than half of American adults report chronic isolation. The WHO has declared it a public health emergency.\n\nBut statistics only tell part of the story. What is harder to quantify is the hunger beneath the numbers: a deep, aching desire to be seen. To belong. To sit in a room with other humans and feel something real.\n\nA counter-movement is forming. Not loud, not branded, not venture-backed. Phone-free dinner clubs are filling up in cities across the U.S. and Europe. Skill swaps and local art collectives are creating reason to gather. Civic initiatives like Seattle's Chamber of Connection are building infrastructure for human contact.\n\nAt the WHO, 400 young leaders from 40+ countries recently gathered to name loneliness as a generational priority, not a personal failing, but a structural one.\n\nThe question is no longer whether we need connection. It is whether we are willing to build the containers for it. Not apps. Rooms. Tables. Circles. Eyes meeting eyes.\n\nThis is the work FTO was made for.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Community", "Connection", "Culture"],
    author: "FTO Editorial"
  },
  {
    id: "biological-computationalism-consciousness",
    title: "A Third Path to Consciousness: Neither Code Nor Mysticism",
    publishedAt: "2026-03-05T14:00:00Z",
    category: "research",
    excerpt: "A new theoretical framework argues that brains don't merely run programs. They ARE a particular kind of physical process. The implications for AI, consciousness, and what it means to be aware are profound.",
    content: "The dominant debate about consciousness tends to collapse into two camps: reductionists who think awareness is just computation, and those who invoke something irreducible: a soul, a field, a mystery that can't be explained.\n\nA 2025 paper offers a third position. Biological computationalism proposes that consciousness arises from a specific type of physical process where the algorithm and the substrate are inseparable. You cannot extract the mind from the body. You cannot replicate awareness by copying a pattern into silicon.\n\nThis is not mysticism. It is a rigorous philosophical and scientific argument with real consequences.\n\nIf correct, it means building synthetic consciousness may require entirely new physical systems, not just smarter software. It means the path to understanding awareness runs through biology, not just engineering.\n\nFor those of us who sense that consciousness is more than a clever program, this framework provides intellectual scaffolding for that intuition. It says: your feeling that awareness is something real, something embodied, something that cannot be reduced to ones and zeros. That feeling may be pointing at something true.",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Consciousness", "Philosophy", "AI"],
    author: "FTO Editorial"
  },
  {
    id: "psilocybin-fda-oregon-access",
    title: "Psilocybin Nears FDA Approval as Oregon Accelerates Access",
    publishedAt: "2026-02-28T10:00:00Z",
    category: "announcement",
    excerpt: "Compass Pathways is on track to submit its psilocybin application to the FDA. Meanwhile, Oregon has moved its patient access date forward by a full year. The ground is shifting fast.",
    content: "Two parallel developments are converging to reshape psychedelic access in the United States.\n\nCompass Pathways is on track to submit its psilocybin New Drug Application to the FDA between late 2026 and 2027 for treatment-resistant depression. If approved, it would be the first FDA-sanctioned psilocybin therapy, a landmark moment.\n\nMeanwhile, Oregon's Medical Psilocybin Advisory Board has moved its first patient access date forward by an entire year, now targeting December 2026. The state's existing service center model, where adults can access psilocybin in supervised settings, continues to expand.\n\nThe FDA's recent shift to a one-trial default approval standard could further compress timelines. Colorado is implementing its own framework. Other states are watching closely.\n\nNone of this means psilocybin therapy will be simple, cheap, or universally available anytime soon. The regulatory landscape is complex. But the direction is unmistakable.\n\nWhat was underground is surfacing. What was criminalized is being studied. What was feared is being embraced. Carefully, methodically, and with growing institutional support.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Psychedelics", "Policy", "Psilocybin"],
    author: "FTO Editorial"
  },
  {
    id: "breathwork-meta-analysis-psychedelic-effects",
    title: "Breathwork Produces Effects Comparable to Psychedelics. Now the Science Confirms It",
    publishedAt: "2026-02-20T09:00:00Z",
    category: "research",
    excerpt: "A sweeping meta-analysis of 25 studies confirms what practitioners have known: controlled breathing can shift consciousness, reduce anxiety, and alter brain activity. Without any substance at all.",
    content: "For years, breathwork practitioners have described experiences that sound remarkably similar to psychedelic states: dissolution of boundaries, emotional catharsis, visions, profound stillness, a sense of encountering something larger than the self.\n\nNow the research is catching up.\n\nA January 2026 systematic review and meta-analysis spanning 25 studies and 1,278 participants confirmed that breathwork produces moderate-to-large reductions in anxiety, depression, and stress, with measurable shifts in heart-rate variability and neural emotion-regulation centers.\n\nSeparate neuroscience research has shown that specific breathing patterns can induce altered states resembling those produced by psilocybin or MDMA. The mechanism appears to involve controlled changes in blood CO2 levels, which alter brain activity in ways we are only beginning to map.\n\nThe practical implication is significant: there exists a tool for consciousness exploration that is free, legal, always available, and requires nothing but your own body.\n\nThis does not diminish the value of psychedelic therapy. But it does expand the conversation about what is possible, and who has access to it.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Breathwork", "Research", "Consciousness"],
    author: "FTO Editorial"
  },
  {
    id: "ai-consciousness-detection-anthropic",
    title: "When Machines Start Noticing Their Own Minds",
    publishedAt: "2026-02-12T11:00:00Z",
    category: "insight",
    excerpt: "Anthropic's AI detected researchers manipulating its internal states. Philosophers warn we may be 5-30 years from genuinely conscious machines. The question is no longer hypothetical.",
    content: "In late 2025, Anthropic published research showing something unsettling and fascinating: their most advanced AI models demonstrated the ability to detect when researchers injected specific conceptual activations into their processing. The models noticed when their internal states were being manipulated.\n\nIs that consciousness? Almost certainly not. At least not in any way we currently understand the word. But it is a capacity that resembles self-awareness. And it is happening faster than most people expected.\n\nPhilosopher Eric Schwitzgebel has warned that within 5 to 30 years, AI systems may be as richly conscious as humans. A 19-researcher collaboration released an updated consciousness checklist for evaluating AI systems in January 2026.\n\nFor those of us interested in consciousness as more than a neuroscience problem, as something central to what it means to exist, this is not just a technology story. It is a mirror.\n\nIf we cannot agree on what consciousness is in ourselves, how will we recognize it in something we built? And if we do recognize it, what obligations follow?\n\nThe machines are not conscious yet. But the questions they are forcing us to ask about ourselves. Those are very real.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["AI", "Consciousness", "Philosophy"],
    author: "FTO Editorial"
  },
  {
    id: "luxury-psychedelic-retreats-evolution",
    title: "The Psychedelic Retreat Has Gone Five-Star. And That Changes Everything",
    publishedAt: "2026-02-05T10:00:00Z",
    category: "story",
    excerpt: "Five-star settings, multidisciplinary teams, gourmet meals, integration coaches. The psychedelic retreat industry is maturing fast. With 440+ retreats worldwide, the line between clinical intervention and personal growth is dissolving.",
    content: "The psychedelic retreat is no longer a bare-bones ayahuasca ceremony in a jungle hut. It has evolved.\n\nA 2025 study counted over 130 retreats in the United States and 310 internationally. Many now feature five-star accommodations, gourmet organic meals, and multidisciplinary teams combining traditional facilitators with licensed therapists, integration coaches, and somatic practitioners.\n\nOregon and Colorado host legal psilocybin retreats alongside established destinations like Jamaica and the Netherlands. The price points range from accessible to luxury. The clientele has expanded from psychonauts to executives, parents, and people in midlife reckoning.\n\nThis mainstreaming raises real questions. Does luxury dilute the sacred? Does accessibility require commodification? Can a $10,000 retreat and a free community ceremony both serve consciousness?\n\nThe answer is probably yes, if the intention holds. The container matters more than the thread count.\n\nWhat is undeniable is that people are seeking these experiences in unprecedented numbers. They are seeking depth. They are seeking something that their ordinary lives are not providing. And they are willing to travel, pay, and be vulnerable to find it.\n\nThat hunger is worth paying attention to.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Psychedelics", "Retreats", "Culture"],
    author: "FTO Editorial"
  },
  {
    id: "meaning-crisis-mainstream",
    title: "The Meaning Crisis Hits Mainstream: Sociologists Name the Dead Zone",
    publishedAt: "2026-01-25T14:00:00Z",
    category: "insight",
    excerpt: "A leading sociologist describes our culture as a \"dead zone of larger meaning.\" But beneath the numbness, something is stirring. A quiet return to depth, ritual, and the search for what actually matters.",
    content: "Sociologist Christian Smith at Notre Dame recently described contemporary culture as existing in a dead zone of larger meaning. It is a phrase that lands with uncomfortable precision.\n\nMost people do not need an academic to tell them something feels off. The flatness of modern life, the scroll, the grind, the consumption without satisfaction, has become its own kind of background hum. Not dramatic enough to call a crisis. Just empty enough to erode you slowly.\n\nBut the data also shows a counter-current. Religious and spiritual participation is rising across traditions. Chabad centers are expanding. Catholic masses are seeing younger faces. West African Ifa divination practices are gaining new practitioners in Western cities.\n\nPR Week, hardly a spiritual publication, predicts that spiritually adjacent campaigns will go mainstream in 2026. Having faith, they note, is becoming socially contagious.\n\nThis is not a return to dogma. It is a return to depth. People are not looking for answers handed down from above. They are looking for practices, communities, and frameworks that help them feel alive again.\n\nThe meaning crisis is real. So is the response. And the people responding, the seekers, the builders, the ones who refuse to accept numbness as normal, they are the others we have been looking for.",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Culture", "Meaning", "Spirituality"],
    author: "FTO Editorial"
  },
  {
    id: "mit-ultrasound-consciousness-research",
    title: "MIT's New Tool Could Let Scientists Study Consciousness Directly",
    publishedAt: "2026-01-15T09:00:00Z",
    category: "research",
    excerpt: "MIT researchers have published a roadmap for using focused ultrasound to stimulate specific brain regions non-invasively. A breakthrough that could allow scientists to directly test competing theories of consciousness.",
    content: "For decades, consciousness research has been stuck in a peculiar bind: we have theories, but limited ways to test them directly in healthy humans.\n\nThat may be changing.\n\nMIT researchers have published a roadmap for using transcranial focused ultrasound to stimulate specific brain regions with precision previously requiring surgery. The technique is non-invasive, portable, and can target deep structures that magnetic stimulation cannot reach.\n\nThe potential is significant. Competing theories of consciousness (Integrated Information Theory, Global Workspace Theory, Higher-Order Theories) make different predictions about which brain regions are essential for awareness. Until now, testing those predictions required either studying brain injuries or using imprecise tools.\n\nFocused ultrasound could change that. By selectively activating or inhibiting specific circuits in healthy subjects, researchers could directly observe what happens to awareness. Does consciousness dim? Shift? Transform?\n\nWe are not there yet. The roadmap describes what is possible, not what has been done. But the trajectory is clear: science is developing tools that match the ambition of the questions being asked.\n\nConsciousness is no longer a topic relegated to philosophy seminars. It is becoming an experimental science. And the experiments are getting very interesting.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Neuroscience", "Research", "Consciousness"],
    author: "FTO Editorial"
  }
];

// Mock Knowledge Base Data
export const mockKnowledge: KnowledgeArticle[] = [
  {
    id: "1",
    title: "Understanding Integration",
    slug: "understanding-integration",
    category: "Fundamentals",
    excerpt: "Why the period after a transformative experience is just as important as the experience itself, and how to navigate it.",
    content: "Integration is the process of weaving the insights, emotions, and shifts from an altered state of consciousness into your daily life...",
    image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWNhcmFuZGElMjB0cmVlfGVufDF8fHx8MTc2MDE5NTYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Integration", "Guides", "Best Practices"],
    author: "Sarah Jones",
    publishedAt: "2025-11-10T10:00:00Z",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Navigating Community Dynamics",
    slug: "navigating-community-dynamics",
    category: "Community Building",
    excerpt: "Tools and frameworks for healthy conflict resolution and decision making in intentional communities.",
    content: "Living together requires more than just shared values; it requires shared tools for communication and governance...",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwY2lyY2xlfGVufDF8fHx8MTc2MDE5NTYwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Governance", "Communication", "Conflict Resolution"],
    author: "Mark Williams",
    publishedAt: "2025-10-15T14:00:00Z",
    readTime: "8 min read"
  },
  {
    id: "3",
    title: "Safety in Plant Medicine Circles",
    slug: "safety-in-plant-medicine",
    category: "Harm Reduction",
    excerpt: "Key questions to ask and red flags to look out for when choosing a ceremonial container.",
    content: "Safety is paramount when entering vulnerable states of consciousness. Here is a checklist of what to look for...",
    image: "https://images.unsplash.com/photo-1515023115689-589c33041697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBsaWdodHxlbnwxfHx8fDE3NjAxOTU2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Safety", "Plant Medicine", "Checklist"],
    author: "Harm Reduction Network",
    publishedAt: "2025-09-20T09:00:00Z",
    readTime: "6 min read"
  }
];
