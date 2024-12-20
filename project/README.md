# KupujemAuto Frontend

Web application for car price estimation and market analysis.

## Getting Started

### Prerequisites
- **Node.js** 18+
- **npm** (comes with Node.js)

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run development server
npm run dev
```

Open your browser and navigate to:

```
http://localhost:3000
```

### Building for Production

```bash
# Create production build
npm run build

# Start production server locally
npm start
```

## Project Structure

```
project/
├── src/
│   ├── app/                    # Pages and routing
│   │   ├── cars/               # Car details pages
│   │   ├── popularno/          # Popular listings page
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── assets/                 # SVG and images
│   ├── components/             # Reusable components
│   │   ├── navigation.tsx      # Navigation component
│   │   └── carCard.tsx         # Car card component
│   ├── data/                   # Data files
│   │   └── brandLogos.ts       # Brand logos mapping
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript types
└── public/                     # Static files
    └── logos/                  # Brand logo SVGs
```

## Development Tools and Technologies

The project leverages the following tools and technologies:

- **Next.js** 14
- **TypeScript**
- **Tailwind CSS**
- **SVG Components**

## Deployment

### Vercel Deployment

1. Build the project locally:
   ```bash
   npm run build
   ```

2. Push the code to GitHub.

3. Connect your repository to [Vercel](https://vercel.com/).

4. Vercel will automatically deploy the `main` branch.

## Notes

- The development server runs on **port 3000**.
- Ensure all SVG logos are in a square format for consistent rendering.
- Image optimization is managed by **Next.js**.

---

Feel free to contribute or report issues via the [GitHub repository](#).
