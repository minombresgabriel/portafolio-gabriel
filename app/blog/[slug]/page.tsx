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
  const { slug } = await params;
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
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { metadata, contentHtml } = post;

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
      <main className="flex-1 px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-10 bg-white rounded-2xl shadow-lg border border-gray-200">

          {/* Imagen Destacada */}
          <div className="mb-8 overflow-hidden rounded-xl shadow-md">
            <Image
              src={metadata.image}
              alt={metadata.title}
              width={1200}
              height={630}
              className="w-full h-[220px] md:h-[400px] object-cover"
              priority
            />
          </div>

          {/* Título y Meta */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
              {metadata.title}
            </h1>
            <div className="text-sm text-gray-600 flex flex-wrap items-center gap-2">
              <span>{metadata.date}</span>
              <span>•</span>
              <span className="font-medium text-indigo-600">
                {metadata.author}
              </span>
            </div>
          </div>

          {/* Contenido */}
          <article
            className="prose prose-lg max-w-none prose-indigo prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
