import { GithubUser } from '@/types/github';

export const mockGithubUser: GithubUser = {
  id: 123,
  login: 'testuser',
  avatar_url: 'https://fake-avatar.com/avatar.jpg',
  url: 'https://fake-url.com/user',
  html_url: 'https://github.com/testuser',
  type: 'User',
  site_admin: false,
  node_id: 'node123',
  gravatar_id: null,
  user_view_type: '',
  following_url: '',
  followers_url: '',
  gists_url: '',
  organizations_url: '',
  repos_url: '',
  events_url: '',
  received_events_url: '',
  starred_url: '',
  subscriptions_url: '',
};
