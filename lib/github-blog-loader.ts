import { parseMarkdown, type BlogPost, type BlogFrontmatter } from './markdown';

const GITHUB_API = 'https://api.github.com/repos';
const GITHUB_RAW = 'https://raw.githubusercontent.com';

interface GitHubTreeItem {
  name: string;
  path: string;
  type: 'file' | 'dir';
  url?: string;
}

interface RepoConfig {
  owner: string;
  repo: string;
  branch?: string;
  blogsPath?: string;
}

let config: RepoConfig = {
  owner: '',
  repo: '',
  branch: 'main',
  blogsPath: 'public',
};

/**
 * Set GitHub repository configuration
 * Should be called once at app startup
 */
export function setGitHubConfig(repoConfig: Partial<RepoConfig>) {
  config = {
    ...config,
    ...repoConfig,
  };
}

/**
 * Fetch a single file content from GitHub
 */
async function fetchFileFromGitHub(path: string): Promise<string> {
  const url = `${GITHUB_RAW}/${config.owner}/${config.repo}/${config.branch}/${path}`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3.raw',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch file from GitHub: ${path}`);
  }

  return response.text();
}

/**
 * Get directory contents from GitHub
 */
async function getDirectoryContents(path: string): Promise<GitHubTreeItem[]> {
  const url = `${GITHUB_API}/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch directory from GitHub: ${path}`);
  }

  const data = await response.json();
  return Array.isArray(data)
    ? data.map((item: any) => ({
        name: item.name,
        path: item.path,
        type: item.type === 'dir' ? 'dir' : 'file',
        url: item.url,
      }))
    : [];
}

/**
 * Get all blog posts from the GitHub repo
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!config.owner || !config.repo) {
    console.warn('GitHub config not set. Call setGitHubConfig() first.');
    return [];
  }

  try {
    const items = await getDirectoryContents(config.blogsPath!);
    const blogDirs = items.filter((item) => item.type === 'dir');

    const posts: BlogPost[] = [];

    for (const dir of blogDirs) {
      try {
        const mdFile = await fetchFileFromGitHub(`${config.blogsPath}/${dir.name}/index.md`);
        const { frontmatter, content } = parseMarkdown(mdFile);

        posts.push({
          slug: dir.name,
          frontmatter,
          content,
        });
      } catch (error) {
        console.error(`Failed to load blog post: ${dir.name}`, error);
      }
    }

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

    return posts;
  } catch (error) {
    console.error('Failed to fetch blog posts from GitHub:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!config.owner || !config.repo) {
    console.warn('GitHub config not set. Call setGitHubConfig() first.');
    return null;
  }

  try {
    const mdFile = await fetchFileFromGitHub(`${config.blogsPath}/${slug}/index.md`);
    const { frontmatter, content } = parseMarkdown(mdFile);

    return {
      slug,
      frontmatter,
      content,
    };
  } catch (error) {
    console.error(`Failed to fetch blog post: ${slug}`, error);
    return null;
  }
}

/**
 * Get all available blog post slugs
 */
export async function getBlogPostSlugs(): Promise<string[]> {
  if (!config.owner || !config.repo) {
    return [];
  }

  try {
    const items = await getDirectoryContents(config.blogsPath!);
    return items.filter((item) => item.type === 'dir').map((item) => item.name);
  } catch (error) {
    console.error('Failed to fetch blog post slugs:', error);
    return [];
  }
}
