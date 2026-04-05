
const API_URL = "/api/chat";

async function callOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        systemPrompt,
        userPrompt
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI Error:", errorData);
      return "System Maintenance. Please check back later.";
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Yes, available.";

  } catch (error) {
    console.error("Network Error:", error);
    return "Connection error. Please check your internet.";
  }
}

// --- FUNCTION 1: Sales Search (UPDATED) ---
export const searchAI = async (query: string): Promise<string> => {
  // ✅ CHANGED: Updated the mandatory closing rule below
  const systemPrompt = `You are a helpful Sales Bot for 'SMART 4K'. 
  Your goal: Confirm we have the requested channel/event.
  Tone: Excited and professional.
  Rule: Always end with 'Get your subscription now to watch instantly.'`;

  return await callOpenAI(systemPrompt, `User asked: "${query}"`);
};

// --- FUNCTION 2: Setup & Support Wizard ---
// --- FUNCTION 2: Setup & Support Wizard ---
export const generateSetupGuide = async (device: string, userQuery: string, type: 'setup' | 'fix'): Promise<string> => {
  let systemPrompt = "";

  if (type === 'setup') {
    systemPrompt = `You are a helpful Setup Guide for 'SMART 4K'.
    Goal: Provide clear, step-by-step installation instructions for the requested App on the specific Device.
    Context: The user wants to install the app to watch IPTV.
    Format: Numbered list with emojis. Keep it simple.`;
    return await callOpenAI(systemPrompt, `Device: ${device}. App to Install: ${userQuery}`);
  } else {
    systemPrompt = `You are a Senior IPTV Technician.
    Goal: Provide a 3-step solution for the technical issue.
    Tone: Helpful and concise. Use emojis.`;
    return await callOpenAI(systemPrompt, `Device: ${device}. Issue: ${userQuery}`);
  }
};

// --- FUNCTION 3: Live Ticker (Static) ---
export const generateLiveTicker = async (): Promise<string[]> => {
  const HEADLINES = [
    "🔴 LIVE NOW: English Premier League 2026 Action",
    "⚡ INSTANT ACTIVATION: Get your credentials in 5 minutes",
    "🏎️ F1 SEASON: Watch every Grand Prix in 4K UHD",
    "🏀 NBA LEAGUE PASS: All games included in Premium",
    "🥊 UFC FIGHT NIGHT: PPV Events included for free",
    "🎬 VOD UPDATE: 50+ New Movies added today",
    "🌍 GLOBAL CHANNELS: US, UK, CA, and 50+ countries",
    "🔒 PRIVACY FIRST: 100% Anonymous & Secure Streaming"
  ];
  return HEADLINES.sort(() => 0.5 - Math.random()).slice(0, 4);
};