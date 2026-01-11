import Link from "next/link";
import { Trophy, Calendar, Users, Gift, Clock, ChevronRight, Zap } from "lucide-react";
import { Button, Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import type { Event, EventRound, Company } from "@/types";

// Mock hackathon data
const mockHackathons: (Event & { company: Company })[] = [
    {
        id: "h1",
        companyId: "c1",
        title: "Google Code Jam 2024",
        type: "HACKATHON",
        description: "The ultimate coding competition for programmers around the world.",
        rounds: [
            { id: "r1", name: "Qualification", description: "Online coding round", startDate: new Date("2024-04-01"), endDate: new Date("2024-04-02"), mode: "ONLINE", isActive: true },
            { id: "r2", name: "Round 1", description: "Top 1500 qualifiers", startDate: new Date("2024-04-15"), endDate: new Date("2024-04-15"), mode: "ONLINE" },
            { id: "r3", name: "Finals", description: "Top 25 compete live", startDate: new Date("2024-05-01"), endDate: new Date("2024-05-01"), mode: "OFFLINE" },
        ],
        teamSizeMin: 1,
        teamSizeMax: 1,
        prizePool: "$15,000",
        deadline: new Date("2024-03-25"),
        createdAt: new Date(),
        company: { id: "c1", name: "Google", isPremium: true, createdAt: new Date() },
    },
    {
        id: "h2",
        companyId: "c2",
        title: "HackMIT 2024",
        type: "HACKATHON",
        description: "Build something amazing in 24 hours at MIT.",
        rounds: [
            { id: "r1", name: "Application", description: "Submit your application", startDate: new Date("2024-03-01"), endDate: new Date("2024-03-15"), mode: "ONLINE" },
            { id: "r2", name: "Hackathon", description: "24 hours of hacking", startDate: new Date("2024-04-20"), endDate: new Date("2024-04-21"), mode: "OFFLINE", isActive: true },
        ],
        teamSizeMin: 2,
        teamSizeMax: 4,
        prizePool: "$10,000",
        deadline: new Date("2024-03-15"),
        createdAt: new Date(),
        company: { id: "c2", name: "MIT", isPremium: true, createdAt: new Date() },
    },
];

function HackathonCard({ hackathon }: { hackathon: Event & { company: Company } }) {
    const activeRound = hackathon.rounds.find(r => r.isActive);

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-secondary-100 hover:border-secondary-200">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-secondary to-secondary-700 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-white/20 text-white border-white/30">
                        {hackathon.company.name}
                    </Badge>
                    {hackathon.company.isPremium && (
                        <Badge variant="premium">🏛️ Premium</Badge>
                    )}
                </div>
                <h3 className="text-xl font-bold mb-2">{hackathon.title}</h3>
                <p className="text-white/80 text-sm line-clamp-2">{hackathon.description}</p>
            </div>

            <CardContent className="p-5">
                {/* Stats Row */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className="flex items-center gap-1 text-secondary">
                        <Gift size={16} />
                        {hackathon.prizePool}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                        <Users size={16} />
                        {hackathon.teamSizeMin === hackathon.teamSizeMax
                            ? `Solo`
                            : `${hackathon.teamSizeMin}-${hackathon.teamSizeMax} members`}
                    </span>
                </div>

                {/* Timeline Preview */}
                <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">ROUNDS</p>
                    <div className="flex items-center gap-2">
                        {hackathon.rounds.slice(0, 3).map((round, i) => (
                            <div key={round.id} className="flex items-center">
                                <div className={`w-2 h-2 rounded-full ${round.isActive ? 'bg-secondary animate-pulse' : 'bg-muted'}`} />
                                <span className={`text-xs ml-1 ${round.isActive ? 'text-secondary font-medium' : 'text-muted-foreground'}`}>
                                    {round.name}
                                </span>
                                {i < Math.min(hackathon.rounds.length - 1, 2) && (
                                    <div className="w-4 h-px bg-border mx-1" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Round Highlight */}
                {activeRound && (
                    <div className="bg-secondary-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 text-secondary text-sm font-medium mb-1">
                            <Zap size={14} />
                            Active: {activeRound.name}
                        </div>
                        <p className="text-xs text-muted-foreground">{activeRound.description}</p>
                    </div>
                )}

                {/* CTA */}
                <Link href={`/hackathons/${hackathon.id}`}>
                    <Button variant="secondary" className="w-full">
                        View Details <ChevronRight size={16} className="ml-1" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}

export default function HackathonsPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-secondary via-secondary-600 to-secondary-700 text-white py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white/20 text-white border-white/30 mb-4">
                        <Trophy size={14} className="mr-1" />
                        150+ Active Hackathons
                    </Badge>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Compete. Build. Win.
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                        Join hackathons from top companies and universities. Build innovative projects,
                        win prizes, and boost your career.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="xl" className="bg-white text-secondary hover:bg-white/90">
                            Find Hackathons
                        </Button>
                        <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                            Host a Hackathon
                        </Button>
                    </div>
                </div>
            </section>

            {/* Hackathons Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">Upcoming Hackathons</h2>
                            <p className="text-muted-foreground">Find your next challenge</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <Button variant="outline" size="sm">All</Button>
                            <Button variant="ghost" size="sm">Coding</Button>
                            <Button variant="ghost" size="sm">Design</Button>
                            <Button variant="ghost" size="sm">AI/ML</Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockHackathons.map((hackathon) => (
                            <HackathonCard key={hackathon.id} hackathon={hackathon} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Finder CTA */}
            <section className="py-12 bg-muted/30">
                <div className="container mx-auto px-4">
                    <Card className="p-8 md:p-12 bg-gradient-to-r from-secondary-50/50 to-card border-secondary-200 dark:border-secondary-900/50">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-2">Looking for Teammates?</h2>
                                <p className="text-muted-foreground">
                                    Find skilled teammates or join a team for upcoming hackathons.
                                </p>
                            </div>
                            <Button variant="secondary" size="lg">
                                <Users size={18} className="mr-2" />
                                Find Team
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}
