"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, Building2, MapPin, Users, ArrowRight, Globe } from "lucide-react";
import { Button, Badge, Card, CardContent } from "@/components/ui";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

// Mock Data
const companies = [
    {
        id: "c1",
        name: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png",
        industry: "Technology",
        location: "Mountain View, CA",
        employees: "100k+",
        website: "google.com",
        description: "Organizing the world's information and making it universally accessible and useful.",
        openRoles: 12,
        isPremium: true,
        gradient: "from-blue-500/10 to-green-500/10 dark:from-blue-500/20 dark:to-green-500/20",
    },
    {
        id: "c2",
        name: "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
        industry: "Technology",
        location: "Redmond, WA",
        employees: "200k+",
        website: "microsoft.com",
        description: "Empowering every person and every organization on the planet to achieve more.",
        openRoles: 8,
        isPremium: true,
        gradient: "from-blue-600/10 to-cyan-500/10 dark:from-blue-600/20 dark:to-cyan-500/20",
    },
    {
        id: "c3",
        name: "Netflix",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
        industry: "Entertainment",
        location: "Los Gatos, CA",
        employees: "10k+",
        website: "netflix.com",
        description: "At Netflix, we want to entertain the world. Whatever your taste, and no matter where you live.",
        openRoles: 5,
        isPremium: true,
        gradient: "from-red-600/10 to-rose-500/10 dark:from-red-600/20 dark:to-rose-500/20",
    },
    {
        id: "c4",
        name: "Airbnb",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png",
        industry: "Hospitality",
        location: "San Francisco, CA",
        employees: "5k+",
        website: "airbnb.com",
        description: "Airbnb is a community based on connection and belonging.",
        openRoles: 3,
        isPremium: false,
    },
    {
        id: "c5",
        name: "Stripe",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
        industry: "Fintech",
        location: "San Francisco, CA",
        employees: "4k+",
        website: "stripe.com",
        description: "Financial infrastructure platform for the internet.",
        openRoles: 15,
        isPremium: true,
        gradient: "from-violet-600/10 to-indigo-500/10 dark:from-violet-600/20 dark:to-indigo-500/20",
    },
    {
        id: "c6",
        name: "Uber",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png",
        industry: "Technology",
        location: "San Francisco, CA",
        employees: "20k+",
        website: "uber.com",
        description: "We reimagine the way the world moves for the better.",
        openRoles: 7,
        isPremium: false,
    },
];

export default function CompaniesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCompanies = companies.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 blur-3xl" />
                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-2xl mx-auto mb-16"
                    >
                        <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur">
                            <Building2 size={14} className="mr-2 text-primary" /> Top Employers
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Discover Companies <br />
                            <span className="text-primary font-serif italic">Building the Future</span>
                        </h1>
                        <p className="text-muted-foreground text-lg mb-8">
                            Join teams that are redefining industries. From garage startups to global giants.
                        </p>

                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search by name or industry..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                            />
                        </div>
                    </motion.div>

                    {/* Grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredCompanies.map((company) => (
                            <motion.div key={company.id} variants={fadeUp}>
                                <Link href={`/companies/${company.id}`} className="block h-full">
                                    <div className={`relative h-full rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
                                        {company.isPremium && (
                                            <div className={`absolute inset-0 bg-gradient-to-br ${company.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                        )}

                                        <div className="p-6 relative z-10 flex flex-col h-full">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-16 h-16 rounded-xl bg-white p-2 border border-border shadow-sm flex items-center justify-center">
                                                    <Image
                                                        src={company.logo}
                                                        alt={company.name}
                                                        width={48}
                                                        height={48}
                                                        className="object-contain"
                                                    />
                                                </div>
                                                {company.isPremium && (
                                                    <Badge variant="premium" className="font-serif italic">
                                                        Premium
                                                    </Badge>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                                                {company.name}
                                                <ArrowRight size={16} className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                            </h3>
                                            <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
                                                {company.description}
                                            </p>

                                            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-auto pt-4 border-t border-border/50">
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={14} /> {company.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users size={14} /> {company.employees}
                                                </span>
                                                {company.openRoles > 0 && (
                                                    <span className="ml-auto text-primary bg-primary/10 px-2 py-1 rounded-full">
                                                        {company.openRoles} Jobs
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredCompanies.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            No companies found matching "{searchQuery}"
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
