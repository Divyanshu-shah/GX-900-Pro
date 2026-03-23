
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font/geist), a new font family for Vercel.

# Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js/) – your feedback and contributions are welcome!

# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
The project is organized into the following folders:

* **components**: This folder contains the project's UI components, including buttons, forms, tables, and more.
* **containers**: This folder contains the project's container components, which wrap around the UI components to provide additional functionality.
* **pages**: This folder contains the project's page components, which define the layout and content of each page.
* **public**: This folder contains the project's static assets, including images, fonts, and more.
* **styles**: This folder contains the project's CSS styles, including the global stylesheet and component-specific styles.
* **utils**: This folder contains the project's utility functions, including helpers for authentication, API requests, and more.

For example, the `components` folder contains the following subfolders:
```markdown
components/
|-- Button
|-- Form
|-- Table
|-- ...
```
Each subfolder contains the component's source code, including the JSX file, CSS file, and any other relevant files.

⚙️ How to Run
================
To get started with the NextGen React App, follow these steps:

1. **Setup**: Clone the repository and navigate to the project folder in your terminal.
2. **Environment**: Install the required dependencies by running `npm install` or `yarn install`.
3. **Build**: Run `npm run build` or `yarn build` to build the project.
4. **Deploy**: Run `npm run start` or `yarn start` to start the development server.

Here is an example of the `next.config.ts` file:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // config options here
};

export default nextConfig;
```
This file defines the project's Next.js configuration, including settings for optimization, internationalization, and more.

🧪 Testing Instructions
======================
To run the project's tests, follow these steps:

1. **Install dependencies**: Install the required testing dependencies by running `npm install` or `yarn install`.
2. **Run tests**: Run `npm run test` or `yarn test` to run the project's tests.

The project uses Jest and Cypress for testing, and includes a comprehensive set of tests for each component and feature.
