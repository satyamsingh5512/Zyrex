"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Mail, BookOpen } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import PostCard from "@/components/blog/PostCard";
import type { BlogPost } from "@/types";

const categories = ["All", "Interview Prep", "Career Tools", "Skills", "Company News", "Career Growth", "Work Culture", "Startups"];

interface BlogData {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    tags: string[];
    publishedAt: string;
    author: {
        name?: string;
        email: string;
    };
}

export default function DynamicBlogsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, [selectedCategory]);

    const fetchBlogs = async () => {
        try {
            const params = new URLSearchParams();
            if (selectedCategory !== "All") {
                params.append("category", selectedCategory);
            }
            
            const response = await fetch(`/api/blogs?${params}`);
            const data = await response.json();

            if (data.success) {
                // Transform database blogs to match our BlogPost interface
                const transformedBlogs: BlogPost[] = data.data.blogs.map((blog: BlogData) => ({
                    id: blog.id,
                    title: blog.title,
                    excerpt: blog.excerpt || "",
                    category: blog.tags[0] || "General", // Use first tag as category
                    author: blog.author.name || blog.author.email,
                    date: new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                    }),
                    imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?auto=format&fit=crop&q=80&w=1000`,
                    slug: blog.slug,
                    readTime: "5 min"
                }));
                setBlogs(transformedBlogs);
            }
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const featuredPosts = blogs.slice(0, 2);
    const latestPosts = blogs.slice(2);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <section className="py-20 px-4 bg-muted/20 border-b border-border">
                    <div className="container mx-auto max-w-6xl text-center">
                        <div className="animate-pulse">
                            <div className="h-8 bg-muted rounded w-48 mx-auto mb-4"></div>
                            <div className="h-16 bg-muted rounded w-96 mx-auto mb-6"></div>
                            <div className="h-6 bg-muted rounded w-80 mx-auto"></div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="py-20 px-4 bg-muted/20 border-b border-border">
                <div className="container mx-auto max-w-6xl text-center">
                    <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                        <BookOpen size={14} className="mr-2" /> CarrierX Resources
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Accelerate Your <span className="text-primary italic font-serif">Career.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Expert guides, industry insights, and preparation roadmaps to fast-track your tech career.
                    </p>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedCategory === cat
                                        ? "bg-foreground text-background"
                                        : "bg-card border border-border text-muted-foreground hover:border-foreground/50"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                {/* Featured Posts */}
                {featuredPosts.length > 0 && (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {featuredPosts.map((post) => (
                            <PostCard key={post.id} post={post} variant="featured" />
                        ))}
                    </section>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">
                                {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
                            </h2>
                        </div>
                        {latestPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {latestPosts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No articles found for this category.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Newsletter */}
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                            <Mail className="w-8 h-8 mx-auto text-primary mb-4" />
                            <h3 className="text-lg font-bold mb-2">Subscribe to CarrierX</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Get the latest career insights and job opportunities delivered to your inbox.
                            </p>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-lg border border-border bg-background mb-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <Button className="w-full">
                                Subscribe
                            </Button>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                            <div className="space-y-3">
                                <a href="/jobs" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                    → Browse Jobs
                                </a>
                                <a href="/hackathons" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                    → Upcoming Hackathons
                                </a>
                                <a href="/companies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                    → Company Directory
                                </a>
                                <a href="/profile" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                                    → My Applications
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}