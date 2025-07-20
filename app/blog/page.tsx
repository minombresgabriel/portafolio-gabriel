import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

// Generación de rutas estáticas
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Tipo para las props
interface PageProps {
  params: Promise<{ slug: string }>; // Use Promise for params to satisfy Next.js
}

export default async function BlogPostPage({ params }: PageProps) {
  // Await params to resolve the Promise
  const { slug } = await params; // Key fix: await params
  
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const { metadata, contentHtml } = post;

  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{metadata.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {metadata.date} — por {metadata.author}
      </p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}