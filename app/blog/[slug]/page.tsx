import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Await params antes de acceder a sus propiedades
  const { slug } = await params;
  
  // Luego usa el slug normalmente
  const post = await getPostBySlug(slug);
  
  if (!post) return {};
  return {
    title: post.metadata.title,
    description: post.metadata.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await params antes de acceder a sus propiedades
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) notFound();

  const { metadata, contentHtml } = post;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white font-sans">
      <main className="flex-1 px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl border border-white/20 hover:shadow-indigo-500/20 transition-shadow duration-300">

          {/* Featured Image */}
          <div className="overflow-hidden rounded-2xl shadow-lg border border-white/10 mb-8 group">
<Image
  src={metadata.image}
  alt={metadata.title}
  width={1200}
  height={630}
  className="w-full h-[180px] sm:h-[240px] md:h-[400px] object-cover object-center md:object-top transition-transform duration-700 group-hover:scale-105"
  priority
/>


          </div>

          {/* Title and Metadata */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
              {metadata.title}
            </h1>
            <div className="flex items-center text-sm text-gray-400">
              <span>{metadata.date}</span>
              <span className="mx-2">•</span>
              <span>
                Escrito por{" "}
                <span className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
                  {metadata.author}
                </span>
              </span>
            </div>
          </div>

          {/* Article Content */}
          <article
            className="max-w-none space-y-6 text-gray-300 text-[18px] leading-8"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}