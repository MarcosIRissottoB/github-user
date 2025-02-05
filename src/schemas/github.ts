import { z } from 'zod';

export const GithubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string().url(),
  url: z.string().url(),
  html_url: z.string().url(),
  type: z.string(),
  site_admin: z.boolean(),
  gravatar_id: z.string().nullable().optional(),
  node_id: z.string(),
  followers_url: z.string().url().optional(),
  following_url: z.string().url().optional(),
  gists_url: z.string().url().optional(),
  starred_url: z.string().optional(),
  subscriptions_url: z.string().url().optional(),
  organizations_url: z.string().url().optional(),
  repos_url: z.string().url().optional(),
  events_url: z.string().url().optional(),
  received_events_url: z.string().url().optional(),
  user_view_type: z.string().optional(),
});

export const GithubUserArraySchema = z.array(GithubUserSchema);

const GithubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  homepage: z.string().url().or(z.string().length(0)).nullable(),
  html_url: z.string().url(),
});

export const GithubRepoArraySchema = z.array(GithubRepoSchema);
