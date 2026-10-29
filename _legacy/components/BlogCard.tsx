import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  slug: string;
  title: string;
  image: string;
  date: string;
  author: string;
}

export default function BlogCard({ slug, title, image, date, author }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="group relative cursor-pointer transition-transform duration-300 hover:scale-105">
        <div className="rounded-xl overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] group-hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] transition-shadow duration-300">
<Image
  src={image}
  alt={title}
  width={800}
  height={400}
  className="object-cover object-top w-full h-48"
  priority
/>




          <div className="p-4">
            <h2 className="text-xl font-bold mb-1 text-black">{title}</h2>
            <p className="text-sm text-gray-700">{date} — Author {author}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
