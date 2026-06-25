import type { MetadataRoute } from 'next'

const baseUrl = 'https://zifro.app'

// AI crawlers explicitly allowed so Zifro stays visible in AI-powered search
const aiBots = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'CCBot',
  'Bytespider',
  'cohere-ai',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
