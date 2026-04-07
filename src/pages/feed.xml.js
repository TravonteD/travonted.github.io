import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';


export async function GET() {
  const blogPostFiles = import.meta.glob("./blog/*.md", { eager: true });
  const blogPosts = Object.values(blogPostFiles).map(async (post) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: post.frontmatter.date,
    content: sanitizeHtml(await post.compiledContent()),
    misc: await post.compiledContent(),
  }))
  const posts = await Promise.all(blogPosts)
  console.log(posts)

  return rss({
    title: "Tray Dennis",
    description: "A collection of thoughts by Tray Dennis",
    site: "https://trayd.xyz/blog",
    items: posts
  })
}
