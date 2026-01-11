# CarrierX - Career Development Portal

A production-ready Career and Competency Development Portal built with Next.js 14, TypeScript, Tailwind CSS, and PostgreSQL.

## Features

- **Jobs & Internships**: Browse, filter, and apply to opportunities
- **Hackathons**: Discover competitions with timeline visualization
- **Preparation Guides**: Unique feature - admin-curated interview prep for each role
- **Premium Institutes**: Special styling for IIT/NIT exclusive opportunities
- **Admin Dashboard**: 5-step wizard for posting jobs with prep guides

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, PostgreSQL, Prisma ORM
- **Auth**: JWT with HTTP-only cookies
- **Testing**: Jest, React Testing Library, Playwright

## Getting Started

### Prerequisites

- Node.js 20+ (required for Prisma)
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/carrierx.git
cd carrierx

# Install dependencies
npm install

# Set up environment variables
cp .env.example.md .env.local
# Edit .env.local with your database URL and JWT secret

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed

# Start development server
npm run dev
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret for JWT signing (min 32 chars) | Yes |
| `AWS_S3_BUCKET` | S3 bucket for file uploads | No |

## Project Structure

```
src/
├── app/
│   ├── (admin)/           # Admin dashboard routes
│   ├── (public)/          # Public landing page
│   ├── api/               # API routes
│   ├── hackathons/        # Hackathon pages
│   ├── jobs/              # Job listing and detail
│   └── layout.tsx         # Root layout
├── components/
│   ├── admin/             # Admin-specific components
│   ├── shared/            # Navbar, Footer, JobCard
│   └── ui/                # Button, Input, Card, Badge
├── lib/
│   ├── auth.ts            # JWT authentication
│   ├── db.ts              # Prisma client
│   └── utils.ts           # Utility functions
├── styles/
│   └── globals.css        # Tailwind + CSS variables
└── types/
    └── index.ts           # TypeScript definitions

prisma/
├── schema.prisma          # Database schema
└── seed.ts                # Seed data
```

## Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Indigo-600) | `#4F46E5` | Jobs, CTAs |
| Secondary (Violet-600) | `#7C3AED` | Hackathons |
| Accent (Emerald-600) | `#059669` | PPO, Success |
| Urgency (Rose-500) | `#F43F5E` | Deadlines |
| Premium (Amber) | `#FEF3C7` | IIT/NIT |

### Typography

- Font: Inter
- H1: `text-2xl md:text-3xl lg:text-4xl font-bold`
- Body: `text-sm text-slate-600`

## Testing

```bash
# Unit tests
npm test

# E2E tests
npx playwright test

# With coverage
npm test -- --coverage
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Set environment variables
4. Deploy

### Manual

```bash
# Build
npm run build

# Start production server
npm start
```

### Database Setup

```bash
# Run migrations on production
DATABASE_URL="your-prod-url" npx prisma migrate deploy

# Seed production (optional)
DATABASE_URL="your-prod-url" npx prisma db seed
```

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User login |
| `/api/auth/me` | GET | Get current user |
| `/api/jobs` | GET | List jobs with filters |
| `/api/jobs` | POST | Create job (admin) |
| `/api/jobs/[id]` | GET/PUT/DELETE | Job CRUD |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Run tests: `npm test`
4. Submit a pull request

## License

MIT
