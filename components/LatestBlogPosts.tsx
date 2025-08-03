// components/LatestBlogPosts.tsx
import { getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";

export default async function LatestBlogPosts() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 3); // Solo los 3 más recientes

  return (
 <section className="p-6 sm:p-8 bg-white bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900"
 id="LatestBlogPosts">
<h2 className="text-5xl md:text-5xl font-extrabold text-center mb-10 mt-6 md:my-20 text-white tracking-tight select-none ">
    Latest Blog Articles
  </h2>      
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {latest.map(({ slug, metadata }) => (
      <BlogCard
        key={slug}
        slug={slug}
        title={metadata.title}
        image={metadata.image}
        date={metadata.date}
        author={metadata.author}
      />
    ))}
  </div>
</section>

  );
}
