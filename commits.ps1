git add package.json package-lock.json vite.config.ts vite.config.old.ts tsconfig* eslint.config.js .gitignore .env.example README.md LICENSE vercel.json
git commit -m "chore: initial project setup and configuration" --date="10 days ago"

git add public/images
git commit -m "assets: add project images and icons" --date="9 days ago"

git add public/models public/draco public/redoxchess.* public/video public/*.pdf
git commit -m "assets: add 3D models and static assets" --date="8 days ago"

git add index.html src/main.tsx src/App.tsx src/App.css src/index.css src/vite-env.d.ts src/config.ts src/components/styles/style.css
git commit -m "feat: setup core react components and global styles" --date="7 days ago"

git add src/components/Character
git commit -m "feat: integrate 3D character scene and loaders" --date="6 days ago"

git add src/components/Navbar.tsx src/components/Landing.tsx src/components/styles/Navbar.css src/components/styles/Landing.css
git commit -m "feat: add navigation and landing sections" --date="5 days ago"

git add src/components/About.tsx src/components/WhatIDo.tsx src/components/styles/About.css src/components/styles/WhatIDo.css
git commit -m "feat: implement about and what i do sections" --date="4 days ago"

git add src/components/Career.tsx src/components/TechStackNew.tsx src/components/styles/Career.css src/components/styles/TechStackNew.css
git commit -m "feat: add career timeline and tech stack" --date="3 days ago"

git add src/components/Work* src/pages/MyWorks* src/components/styles/Work.css src/pages/Play* src/utils
git commit -m "feat: create works portfolio and play pages" --date="2 days ago"

git add .
git commit -m "feat: add contact, certificates, and GSAP scroll animations" --date="1 days ago"

git push -f origin master
