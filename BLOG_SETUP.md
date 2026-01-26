# Dynamic Blog Setup Guide

This is a dynamic blogging platform that reads markdown files directly from your GitHub repository. Each blog post is stored as a folder with an `index.md` file and associated assets.

## Quick Start

### 1. Configure Your GitHub Repository

Edit `/app/layout.tsx` and update the blog initialization:

```tsx
initBlog({
  owner: 'your-github-username',    // Your GitHub username
  repo: 'your-repo-name',            // Your repository name
  branch: 'main',                    // The branch where blogs are stored
  blogsPath: 'public'                // Folder containing blog posts
});
```

### 2. Create Your Repository Structure

In your GitHub repository, create the following structure:

```
your-repo/
├── public/
│   ├── first-blog-post/
│   │   ├── index.md
│   │   ├── hero-image.jpg
│   │   └── other-assets.png
│   └── second-blog-post/
│       ├── index.md
│       └── image.jpg
```

### 3. Write Blog Posts with YAML Frontmatter

Create `public/your-blog-post/index.md` with this structure:

```markdown
---
title: "My Amazing Blog Post"
date: "2024-01-15"
description: "A brief summary of this post"
author: "Your Name"
---

# Your content starts here

This is markdown content. You can use:
- **Bold text**
- *Italic text*
- `Code snippets`
- [Links](https://example.com)
- Lists and more!

## Subheadings

Standard markdown formatting is supported.
```

## Supported Markdown Features

- **Headings**: `# H1`, `## H2`, `### H3`
- **Bold**: `**text**` or `__text__`
- **Italic**: `*text*` or `_text_`
- **Code**: `` `inline code` ``
- **Code blocks**: Triple backticks
- **Links**: `[text](url)`
- **Lists**: `- item` or `1. item`
- **Blockquotes**: `> quote`

## YAML Frontmatter Fields

The frontmatter at the top of each markdown file supports:

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Blog post title |
| `date` | Yes | Publication date (YYYY-MM-DD format) |
| `description` | No | Short summary (used on blog list) |
| `author` | No | Author name |
| Any custom field | No | Add any other fields you need |

## File Organization

### Folder Naming

- Folder names become the blog post URL slug
- Example: `public/my-awesome-post/` → `/blog/my-awesome-post`
- Use kebab-case (lowercase with hyphens): `my-blog-post`

### Assets

Place images and other assets in the same folder as `index.md`:

```
public/my-post/
├── index.md
└── images/
    ├── featured.jpg
    └── diagram.png
```

Reference them in your markdown with relative paths:

```markdown
![Alt text](./images/featured.jpg)
```

## API Reference

### Core Functions

#### `initBlog(config)`

Initialize the blog system. Call this once in your root layout.

```tsx
import { initBlog } from '@/lib/init-blog';

initBlog({
  owner: 'username',
  repo: 'repo-name',
  branch: 'main',
  blogsPath: 'public'
});
```

#### `getAllBlogPosts()`

Get all published blog posts, sorted by date (newest first).

```tsx
import { getAllBlogPosts } from '@/lib/github-blog-loader';

const posts = await getAllBlogPosts();
posts.forEach(post => {
  console.log(post.slug, post.frontmatter.title);
});
```

#### `getBlogPostBySlug(slug)`

Get a specific blog post by its slug.

```tsx
import { getBlogPostBySlug } from '@/lib/github-blog-loader';

const post = await getBlogPostBySlug('my-blog-post');
if (post) {
  console.log(post.frontmatter.title);
  console.log(post.content);
}
```

#### `getBlogPostSlugs()`

Get all available blog post slugs for static generation.

```tsx
import { getBlogPostSlugs } from '@/lib/github-blog-loader';

const slugs = await getBlogPostSlugs();
```

### Utility Functions

#### `formatDate(dateString)`

Format a date string to readable format.

```tsx
import { formatDate } from '@/lib/markdown';

const date = formatDate('2024-01-15'); // "January 15, 2024"
```

#### `getExcerpt(content, length?)`

Get the first N characters of markdown content as a preview.

```tsx
import { getExcerpt } from '@/lib/markdown';

const preview = getExcerpt(post.content, 200);
```

#### `parseMarkdown(fileContent)`

Parse markdown with YAML frontmatter.

```tsx
import { parseMarkdown } from '@/lib/markdown';

const { frontmatter, content } = parseMarkdown(markdownString);
```

## Routes

The blog system automatically creates these routes:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `app/page.tsx` | Blog homepage with all posts |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Individual blog post |

## Environment Requirements

The blog system fetches from GitHub's public API. For better reliability:

- Public repositories require no authentication
- Private repositories require a GitHub personal access token (set `GITHUB_TOKEN` env var)

## Customization

### Styling

The blog uses Tailwind CSS and shadcn/ui components. Customize the styling:

1. Blog list: Edit `/app/page.tsx`
2. Blog post: Edit `/app/blog/[slug]/page.tsx`
3. Markdown rendering: Edit `/components/markdown-renderer.tsx`

### Markdown Renderer

The `<MarkdownRenderer>` component handles markdown-to-HTML conversion. You can:

- Extend it to support more markdown features
- Add syntax highlighting for code blocks
- Support embedded media (YouTube, etc.)

Example of adding a custom feature:

```tsx
// In components/markdown-renderer.tsx
if (trimmed.startsWith('!youtube ')) {
  // Handle custom YouTube embedding
}
```

## Troubleshooting

### "Configuration Required" Error

Make sure you've updated `initBlog()` in `/app/layout.tsx` with your actual GitHub repository details.

### Blog posts not showing

1. Check that folders exist in `public/` directory
2. Verify each folder has an `index.md` file
3. Check the markdown frontmatter has `title` and `date` fields
4. Ensure the repository is public or you have a GitHub token

### Images not loading

- Use relative paths from the markdown file: `./images/photo.jpg`
- Ensure images are committed to GitHub
- Check that the image path is correct

### Markdown not rendering correctly

- Use standard markdown syntax
- Check for typos in the frontmatter (must be valid YAML)
- Use proper spacing around markdown syntax

## Example Blog Post

```markdown
---
title: "Getting Started with Next.js"
date: "2024-01-20"
description: "Learn the basics of building with Next.js 16"
author: "Jane Doe"
---

# Getting Started with Next.js

Next.js is a powerful React framework that makes building web applications easier.

## Why Next.js?

- **Fast**: Optimized for performance
- **Flexible**: Supports multiple rendering strategies
- **Scalable**: Perfect for projects of any size

## Installation

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

For more information, check the [Next.js documentation](https://nextjs.org/docs).
```

## Performance Tips

1. **Use short descriptions** in frontmatter (200 chars max) instead of generating excerpts
2. **Optimize images** before committing to GitHub
3. **Cache blog metadata** if you have many posts
4. **Use CDN** for image serving in production

## FAQ

**Q: Can I use a private repository?**
A: Yes, but you'll need to set the `GITHUB_TOKEN` environment variable with a personal access token.

**Q: Can I customize the blog styling?**
A: Absolutely! Edit the components in `/app/page.tsx`, `/app/blog/[slug]/page.tsx`, and `/components/markdown-renderer.tsx`.

**Q: How are posts ordered?**
A: By date, newest first. The system parses the `date` field from the frontmatter.

**Q: Can I add categories or tags?**
A: Yes! Add custom fields to the frontmatter and modify the home page component to filter and display them.

**Q: How do I preview changes before publishing?**
A: Create a draft branch and point the blog to that branch in the config.
