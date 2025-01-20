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

- Node.js 18.17 or later
- npm, yarn, pnpm or bun (preferably bun)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/varjovaras/is-vr-late.git
```


3. Install dependencies:
```bash
bun install
# or
npm install
# or
yarn
# or
pnpm install
```

4. Run the development server:
```bash
bun dev
# or
npm run dev
# or
yarn dev
# or
pnpm dev
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
├── backend/           # Backend application (planned for future implementation)
└── types/            # Shared TypeScript type definitions
```


## Acknowledgments

- Data provided by [Digitraffic](https://www.digitraffic.fi/), made available under the [CC 4.0 BY license](https://creativecommons.org/licenses/by/4.0/).
