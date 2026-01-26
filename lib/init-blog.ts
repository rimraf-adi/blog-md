/**
 * Initialize the blog system with your GitHub repository details
 * Call this once when your app starts (e.g., in your root layout)
 *
 * Example:
 *
 * import { initBlog } from '@/lib/init-blog';
 *
 * initBlog({
 *   owner: 'your-github-username',
 *   repo: 'your-repo-name',
 *   branch: 'main',
 *   blogsPath: 'public'
 * });
 *
 * IMPORTANT: Your repository structure should be:
 * public/
 *   blog-post-1/
 *     index.md
 *     image.jpg
 *   blog-post-2/
 *     index.md
 *     image.jpg
 *
 * Each index.md should have YAML frontmatter:
 *
 * ---
 * title: "My Blog Post Title"
 * date: "2024-01-15"
 * description: "Brief description of the post"
 * author: "Your Name"
 * ---
 *
 * # Your markdown content starts here
 */

import { setGitHubConfig } from './github-blog-loader';

export interface BlogInitConfig {
  owner: string; // GitHub username or organization
  repo: string; // Repository name
  branch?: string; // Branch name (default: 'main')
  blogsPath?: string; // Path to blogs folder in repo (default: 'public')
}

export function initBlog(config: BlogInitConfig) {
  if (!config.owner || !config.repo) {
    console.warn(
      'Blog initialization failed: owner and repo are required. Check your config.'
    );
    return;
  }

  setGitHubConfig({
    owner: config.owner,
    repo: config.repo,
    branch: config.branch || 'main',
    blogsPath: config.blogsPath || 'public',
  });

  console.log(
    `Blog initialized: ${config.owner}/${config.repo} (branch: ${config.branch || 'main'})`
  );
}
