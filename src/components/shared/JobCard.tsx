"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Building2, Clock } from "lucide-react";
import { Badge } from "@/components/ui";
import { cn, formatCurrency, timeUntil } from "@/lib/utils";
import type { Job, Company } from "@/types";
import { motion } from "framer-motion";

interface JobCardProps {
    job: Job & { company: Company };
    className?: string;
    index?: number;
}

export function JobCard({ job, className, index = 0 }: JobCardProps) {
    const deadline = timeUntil(job.deadline);
    const isPremium = job.company.isPremium;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className={cn("group relative", className)}
        >
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent group-hover:via-primary/50 transition-colors" />

            <Link href={`/jobs/${job.id}`} className="block p-6 hover:bg-muted/50 transition-colors rounded-2xl">
                <div className="flex flex-col md:flex-row gap-6 md:items-start">
                    {/* Asymmetric Logo Placement */}
                    <div className="md:w-1/4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="relative w-8 h-8 rounded bg-card flex-shrink-0 border border-border p-0.5">
                                {job.company.logoUrl ? (
                                    <Image
                                        src={job.company.logoUrl}
                                        alt={job.company.name}
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <Building2 className="w-full h-full text-muted-foreground p-1.5" />
                                )}
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">{job.company.name}</span>
                        </div>
                        {isPremium && (
                            <Badge variant="premium" className="text-[10px] px-2 py-0.5 h-auto font-serif italic border-amber-200 bg-amber-50">
                                Premier Institute
                            </Badge>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="md:w-2/4">
                        <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                            {job.title}
                            <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                                <MapPin size={12} /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={12} /> {job.duration || "Full-time"}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {job.techStack.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-xs text-muted-foreground bg-card border border-border px-2 py-1 rounded-md">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right Meta (Stipend/CTA) */}
                    <div className="md:w-1/4 flex flex-row md:flex-col justify-between md:items-end md:text-right border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
                        <div>
                            <p className="text-2xl font-light text-foreground">{formatCurrency(job.stipend)}</p>
                            <p className="text-xs text-muted-foreground">per month</p>
                        </div>

                        <div className="flex items-center gap-2">
                            {job.isPPO && (
                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-full">
                                    PPO
                                </span>
                            )}
                            {deadline.isUrgent && (
                                <span className="text-xs font-medium text-rose-500 bg-rose-50 dark:bg-rose-950/30 px-2 py-1 rounded-full">
                                    {deadline.hours}h left
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default JobCard;
