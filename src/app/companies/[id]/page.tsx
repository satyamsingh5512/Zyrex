"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Users, Globe, Building2, CheckCircle, ExternalLink } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { JobCard } from "@/components/shared";
import { notFound } from "next/navigation";

// Mock Data (matches listing page)
const companies = {
    c1: {
        id: "c1",
        name: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png",
        banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000",
        industry: "Technology",
        location: "Mountain View, CA",
        employees: "100k+",
        website: "https://google.com",
        description: "Organizing the world's information and making it universally accessible and useful. Google is an American multinational technology company acting as a holding company for Alphabet Inc.",
        culture: [
            "Innovation at scale",
            "Psychological safety",
            "Data-driven decisions",
            "20% Project time"
        ],
        techStack: ["Python", "Golang", "C++", "TensorFlow", "Kubernetes", "Angular"],
        isPremium: true,
        jobs: [
            {
                id: "1",
                companyId: "c1",
                title: "Software Engineer Intern",
                type: "INTERNSHIP",
                location: "Bangalore, India",
                stipend: 80000,
                duration: "6 months",
                techStack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
                deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                isInternalApply: true,
                isPPO: true,
                createdAt: new Date(),
                company: { id: "c1", name: "Google", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png", isPremium: true, createdAt: new Date() },
            },
            {
                id: "101",
                companyId: "c1",
                title: "Product Analyst",
                type: "FULL_TIME",
                location: "Hyderabad, India",
                stipend: 150000,
                duration: "Full-time",
                techStack: ["SQL", "Python", "Tableau"],
                deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                isInternalApply: true,
                isPPO: false,
                createdAt: new Date(),
                company: { id: "c1", name: "Google", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png", isPremium: true, createdAt: new Date() },
            }
        ]
    },
    // Fallback for other IDs (normally fetched from DB)
    default: {
        id: "cx",
        name: "Tech Corp",
        logo: "https://via.placeholder.com/150",
        banner: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=2000",
        industry: "Software",
        location: "San Francisco, CA",
        employees: "500+",
        website: "https://example.com",
        description: "A leading innovator in the software space, building tools for the next generation of developers.",
        culture: ["Remote-first", "Async communication", "Ownership"],
        techStack: ["React", "Node.js", "AWS"],
        isPremium: false,
        jobs: []
    }
};

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
    const company = (companies as any)[params.id] || companies.default;

    if (!company) return notFound();

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Banner */}
            <div className="h-64 md:h-80 relative w-full">
                <Image
                    src={company.banner}
                    alt={`${company.name} office`}
                    fill
                    className="object-cover brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

                <div className="absolute top-6 left-6">
                    <Link href="/companies">
                        <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white group">
                            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Companies
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-24 relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sidebar / Info Card */}
                    <div className="w-full md:w-1/3 space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
                            <div className="w-32 h-32 bg-white rounded-2xl p-4 border border-border shadow-sm mb-6 -mt-20 relative z-20 mx-auto md:mx-0">
                                <Image
                                    src={company.logo}
                                    alt={company.name}
                                    width={128}
                                    height={128}
                                    className="object-contain w-full h-full"
                                />
                            </div>

                            <div className="text-center md:text-left">
                                <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center justify-center md:justify-start gap-2">
                                    {company.name}
                                    {company.isPremium && <Badge variant="premium" className="text-xs">Premium</Badge>}
                                </h1>
                                <p className="text-muted-foreground mb-6">{company.industry}</p>

                                <div className="space-y-4 text-sm text-foreground/80 mb-8 max-w-xs mx-auto md:mx-0">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="text-primary w-5 h-5" />
                                        {company.location}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users className="text-primary w-5 h-5" />
                                        {company.employees} Employees
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Globe className="text-primary w-5 h-5" />
                                        <a href={company.website} target="_blank" className="hover:underline hover:text-primary transition-colors">
                                            Visit Website
                                        </a>
                                    </div>
                                </div>

                                <Button className="w-full rounded-full" size="lg">
                                    Follow Company
                                </Button>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Building2 size={18} className="text-primary" /> Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {company.techStack.map((tech: string) => (
                                    <Badge key={tech} variant="outline" className="bg-background">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full md:w-2/3 space-y-8 mt-10 md:mt-0">
                        {/* About */}
                        <section>
                            <h2 className="text-2xl font-bold font-serif italic mb-4">About {company.name}</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {company.description}
                            </p>
                        </section>

                        {/* Culture */}
                        <section>
                            <h3 className="text-xl font-bold mb-4">Why join us?</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {company.culture.map((item: string) => (
                                    <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                                        <CheckCircle className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                                        <span className="font-medium text-foreground">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Open Positions */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold font-serif italic">Open Positions</h2>
                                <Badge variant="default" className="rounded-full px-3">{company.jobs.length}</Badge>
                            </div>

                            <div className="space-y-4">
                                {(company.jobs as any[]).map((job) => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                                {company.jobs.length === 0 && (
                                    <div className="text-center py-12 bg-card border border-border border-dashed rounded-2xl">
                                        <p className="text-muted-foreground">No open positions at the moment.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
