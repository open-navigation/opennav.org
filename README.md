# Open Navigation Website

The official website for [Open Navigation LLC](https://opennav.org), built with Astro and Tailwind CSS.

## Features

- Modern, responsive design
- Static site generation for fast performance
- Animated hero section with Nav2 balloon
- News/blog system with Markdown content
- Contact form with Google Sheets integration
- Automatic deployment to GitHub Pages

## Prerequisites

- [Node.js](https://nodejs.org/) 20.0 or higher
- npm (comes with Node.js)

## Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/opennav-website.git
   cd opennav-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Visit [http://localhost:4321](http://localhost:4321)

## Available Commands

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start development server at `localhost:4321`     |
| `npm run build`   | Build production site to `./dist/`               |
| `npm run preview` | Preview production build locally                 |

## Project Structure

```
├── public/              # Static assets (images, videos, favicon)
│   ├── images/
│   └── videos/
├── src/
│   ├── components/      # Reusable Astro components
│   ├── content/         # Markdown content (news articles)
│   │   └── news/
│   ├── layouts/         # Page layouts
│   ├── pages/           # Page routes
│   │   └── news/
│   └── styles/          # Global CSS
├── scripts/             # Utility scripts (Google Apps Script)
├── astro.config.mjs     # Astro configuration
├── tailwind.config.cjs  # Tailwind CSS configuration
└── package.json
```

## Adding News Articles

1. Create a new `.md` file in `src/content/news/`
2. Add frontmatter with required fields:

   ```yaml
   ---
   title: "Your Article Title"
   description: "Brief description for previews"
   pubDate: 2024-01-15
   author: "Author Name"
   tags: ["tag1", "tag2"]
   ---
   ```

3. Write your content in Markdown below the frontmatter

## Contact Form Setup

The contact form sends submissions to Google Sheets and sends email notifications.

### Setup Instructions

1. **Create a Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet
   - Add headers: `Timestamp | Name | Email | Subject | Message | Interests`

2. **Create Apps Script**
   - In your sheet, go to Extensions > Apps Script
   - Copy the code from `scripts/google-apps-script.js`
   - Update `SPREADSHEET_ID` with your sheet's ID
   - Update `NOTIFICATION_EMAIL` with your email

3. **Deploy as Web App**
   - Click Deploy > New deployment
   - Select "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Deploy and copy the URL

4. **Update the Contact Form**
   - Open `src/components/ContactForm.astro`
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with your deployed URL

## Deployment

### Automatic (GitHub Pages)

The site automatically deploys to GitHub Pages on every push to `main`:

1. Push your changes to the `main` branch
2. GitHub Actions will build and deploy automatically
3. Your site will be available at `https://your-org.github.io/repo-name`

### Custom Domain

To use a custom domain (e.g., opennav.org):

1. Add a `CNAME` file to `public/` with your domain:
   ```
   opennav.org
   ```

2. Configure DNS with your domain registrar:
   - Add a CNAME record pointing to `your-org.github.io`
   - Or add A records pointing to GitHub's IP addresses

3. Enable HTTPS in GitHub Pages settings

## Technology Stack

- **[Astro](https://astro.build/)** - Static site generator
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Static hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Copyright Open Navigation LLC. All rights reserved.
