import axios from 'axios';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  has_pages: boolean;
}

const url = 'https://api.github.com/user/repos';
const token = import.meta.env.VITE_APP_TOKEN_GIT;
const nameCurrentRepo = 'viniciusteixeiradias.github.io'

async function getRepositories(): Promise<Repository[]> {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
    params: { page: 1, per_page: 100 }
  });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch repositories: ${response.status}`);
  }

  const repositories = response.data as Repository[];

  const repositoriesWithPages = repositories.filter(r => r.has_pages && r.name !== nameCurrentRepo);

  return repositoriesWithPages;
}

export { getRepositories }
export type { Repository }