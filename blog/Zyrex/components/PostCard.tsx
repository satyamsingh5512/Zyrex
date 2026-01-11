import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Post } from "@/data/posts";

interface PostCardProps {
    post: Post;
    variant?: "default" | "featured" | "compact";
}

export default function PostCard({ post, variant = "default" }: PostCardProps) {
    if (variant === "featured") {
        return (
            <Link href={`/p/${post.slug}`} className="group relative block w-full h-[400px] overflow-hidden rounded-2xl">
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold bg-primary rounded-full">
                        {post.category}
                    </span>
                    <h2 className="text-3xl font-bold mb-2 leading-tight group-hover:text-primary-foreground/90 transition-colors">
                        {post.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span>{post.author}</span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.date}
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    if (variant === "compact") {
        return (
            <Link href={`/p/${post.slug}`} className="group flex gap-4 items-start">
                <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="flex-1">
                    <span className="text-xs font-medium text-primary mb-1 block">
                        {post.category}
                    </span>
                    <h3 className="font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/p/${post.slug}`} className="group block">
            <div className="relative aspect-video mb-3 rounded-xl overflow-hidden">
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div>
                <span className="text-xs font-semibold text-primary mb-2 block">
                    {post.category}
                </span>
                <h3 className="text-xl font-bold mb-2 leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                </div>
            </div>
        </Link>
    );
}
