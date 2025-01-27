import { z } from 'zod';

export const GithubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string().url(),
  url: z.string().url(),
  html_url: z.string().url(),
  followers_url: z.string().url(),
  following_url: z.string().url(),
  gists_url: z.string().url(),
  starred_url: z.string(),
  subscriptions_url: z.string().url(),
  organizations_url: z.string().url(),
  repos_url: z.string().url(),
  events_url: z.string().url(),
  received_events_url: z.string().url(),
  type: z.string(),
  site_admin: z.boolean(),
  gravatar_id: z.string(),
  node_id: z.string(),
  user_view_type: z.string(),
});

export const GithubUserArraySchema = z.array(GithubUserSchema);

export type GithubUser = z.infer<typeof GithubUserSchema>;
