# Is VR Late?

A real-time train tracking application that shows delayed VR (Finnish Railways) trains. Built with Next.js and TypeScript.

## Features

- Real-time tracking of delayed trains
- Separate views for commuter and long-distance trains
- Detailed view for individual trains
- Bilingual support (Finnish/English)
- Sorting options for train listings
- Responsive design

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Bun](https://bun.sh/)
- [Digitraffic API](https://www.digitraffic.fi/rautatieliikenne/)

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm, yarn, pnpm or bun (preferably bun)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/varjovaras/is-vr-late.git
```

3. Install dependencies:
```bash
bun frontend:install
# or
npm run frontend:install
# or
yarn frontend:install
# or
pnpm frontend:install
```

4. Run the development server:
```bash
bun fronted:dev
# or
npm run frontend:dev
# or
yarn frontend:dev
# or
pnpm frontend:dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Frontend Project Structure

```
src/
├── frontend/           # Frontend application
│   ├── app/           # Next.js app router
│   ├── components/    # React components
│   ├── lib/          # Utility functions and configurations
│   │   └── i18n/     # Internationalization
│   ├── queries/      # GraphQL queries
│   └── types/        # TypeScript type definitions
│
├── backend/          # Backend application (not used at the moment)
└── types/            # Shared TypeScript type definitions
```


## Acknowledgments

- Data provided by [Digitraffic](https://www.digitraffic.fi/), made available under the [CC 4.0 BY license](https://creativecommons.org/licenses/by/4.0/).
