# Wallify – A Modern Wallpaper Web App

Wallify is a sleek, dark-themed wallpaper web application built with React, TypeScript, TailwindCSS, Supabase, and the Unsplash API. It lets users explore stunning royalty-free wallpapers in rich categories like space, dark, lakes, and mountains, while providing smooth interactions, login support, and a personalized experience with favoriting capability.

Upon opening, users are greeted with a minimal navbar that’s transparent on top and becomes fixed on scroll. The left side holds the Wallify logo, while the right features a search bar, a GitHub link, and a “Stars” button for accessing saved wallpapers. Just below, a full-width hero section welcomes users with the app name in large font and the tagline: “Stunning royalty-free images & royalty-free stock.” The homepage displays category chips and an infinite-scroll grid of wallpapers, each with hover effects, a star icon to like, and a download button. Clicking any wallpaper pops it up in an animated modal for fullscreen view without opening a new tab.

The app uses Supabase for login and database. Users can sign up or log in using email/password or social options like Google. Only logged-in users can star wallpapers. Starred images are saved in a secure Supabase table using Row Level Security, and each user sees only their own collection. Supabase triggers also auto-create a user profile with avatar and username on signup.

Wallify is fully responsive. On mobile, the navbar collapses into a hamburger menu with smooth slide-down animation. Cards fade in as they load, and modals animate using Framer Motion. There’s a custom shimmer loader while images fetch, keeping the UX buttery. Pagination support lets users view more wallpapers over time, and the footer at the bottom drops in playful links or random text to complete the aesthetic.

### 🧱 Key Components

- `Navbar.tsx`: Transparent navbar with fixed-on-scroll logic, search, login, and GitHub link.
- `Hero.tsx`: Big bold intro with app name and tagline over a blurred wallpaper background.
- `WallpaperCard.tsx`: Reusable card with Unsplash image, download button, star/like option.
- `WallpaperGrid.tsx`: Renders the masonry-style layout of all wallpapers dynamically.
- `WallpaperModal.tsx`: Animated popup to preview full-resolution wallpapers.
- `Pagination.tsx`: Lets users navigate multiple pages of wallpapers.
- `Footer.tsx`: Random fun, links, and copy to end the page right.
- `wallpapers.ts`: Optionally holds fallback data or featured image metadata.
- `lib/`: Contains API utilities for Unsplash fetch and Supabase integration.

### 🚀 Future Add-ons

- User-uploaded wallpapers with moderation and community sharing.
- AI-generated wallpapers using DALL·E or similar APIs.
- Tag-based filtering with multi-select.
- Trending, most-starred, and recently viewed pages.
- Dark/light theme toggle with local storage.
- Notification system for downloads, login events, or new categories.
- Admin panel for managing categories or curating wallpapers.

### 👨‍🎨 Author

Built with ☕, late-night code, and pixel-perfect love by **@AvPTheGreat**  
BITS Pilani | Full-stack dev | Builder of aesthetic stuff

GitHub: [github.com/AvPTheGreat](https://github.com/AvPTheGreat)

### 📄 License

This project is licensed under the **MIT License** – do whatever you want, just give some credit. Respect the Unsplash API terms when deploying publicly.

---

