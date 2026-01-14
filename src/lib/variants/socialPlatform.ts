/**
 * Social platform color configurations
 * Note: Brand colors are intentionally hardcoded as they are official brand identities
 */
export const socialPlatformConfig = {
  twitter: {
    name: "Twitter",
    color: "bg-[#1DA1F2]/10 text-[#1DA1F2]",
    hoverColor: "hover:bg-[#1DA1F2]/20",
  },
  facebook: {
    name: "Facebook",
    color: "bg-[#1877F2]/10 text-[#1877F2]",
    hoverColor: "hover:bg-[#1877F2]/20",
  },
  instagram: {
    name: "Instagram",
    color: "bg-[#E4405F]/10 text-[#E4405F]",
    hoverColor: "hover:bg-[#E4405F]/20",
  },
  linkedin: {
    name: "LinkedIn",
    color: "bg-[#0A66C2]/10 text-[#0A66C2]",
    hoverColor: "hover:bg-[#0A66C2]/20",
  },
  youtube: {
    name: "YouTube",
    color: "bg-[#FF0000]/10 text-[#FF0000]",
    hoverColor: "hover:bg-[#FF0000]/20",
  },
  github: {
    name: "GitHub",
    color: "bg-[#333333]/10 text-[#333333] dark:bg-[#ffffff]/10 dark:text-[#ffffff]",
    hoverColor: "hover:bg-[#333333]/20 dark:hover:bg-[#ffffff]/20",
  },
  discord: {
    name: "Discord",
    color: "bg-[#5865F2]/10 text-[#5865F2]",
    hoverColor: "hover:bg-[#5865F2]/20",
  },
  tiktok: {
    name: "TikTok",
    color: "bg-[#000000]/10 text-[#000000] dark:bg-[#ffffff]/10 dark:text-[#ffffff]",
    hoverColor: "hover:bg-[#000000]/20 dark:hover:bg-[#ffffff]/20",
  },
} as const;

export type SocialPlatform = keyof typeof socialPlatformConfig;
