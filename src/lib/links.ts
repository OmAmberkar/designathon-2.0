export const links = {
  social: {
    twitter: "https://x.com/gdgc_ace",
    website: "https://www.gdgcace.in/",
    linkedin:
      "https://www.linkedin.com/company/google-developer-student-club-ace",
    instagram: "https://www.instagram.com/gdgc_ace",
  },
  registration:
    "https://unstop.com/o/w6XZEC2?lb=zGudqiMk&utm_medium=Share&utm_source=gdgccol51602&utm_campaign=Online_coding_challenge",
  downloadGuidelines:
    "https://unstop.com/o/w6XZEC2?lb=zGudqiMk&utm_medium=Share&utm_source=gdgccol51602&utm_campaign=Online_coding_challenge",
  discord: "https://discord.gg/gdgcace",
  gdgcWebsite: "https://www.gdgcace.in/",
} as const;

export type SocialPlatform = keyof typeof links.social;
