# Potato (Potato.G) — Creative Web Developer Portfolio

A modern, dark-themed personal portfolio website showcasing web development work, UI/UX sensibilities, and services. Built with semantic HTML, custom CSS, and small JavaScript enhancements for interactivity and smooth animations.

---

**Project**: `Potato` (a.k.a. `Potato.G`)

**Live demo**: Not published yet — local preview instructions below.

**Built with**:
- HTML5
- CSS3 (custom, responsive design)
- Vanilla JavaScript
- Bootstrap (CDN for base utilities)
- Font Awesome (icons)
- Google Fonts


**Features**:
- Responsive hero section with image and animated entrance
- Fixed, accessible navigation with mobile hamburger menu
- Loading screen with subtle animation
- Services, Work, About, and Contact sections with reusable card components
- Smooth scrolling for anchor links and on-scroll reveal animations
- CSS variables for easy color / theme adjustments


**Repository structure** (root of this project):

- `index.html` : Main HTML page
- `style.css`  : Site styles and responsive rules
- `images/`    : Project images and assets (example: `k.png` used in hero)
- `README.md`  : This file


**Local setup & preview (Windows PowerShell)**

Open PowerShell and run these commands from the project folder (where `index.html` lives):

```powershell
# Change to project directory
cd "c:\Users\kojin\OneDrive\Desktop\NEXT\PORTFOLIO"

# Option A: Use Python (if Python 3 is installed)
python -m http.server 8000; Start-Process "http://localhost:8000"

# Option B: Use VS Code Live Server extension
# 1. Open folder in VS Code
# 2. Install 'Live Server' extension and click 'Go Live' in the status bar

# Option C: Use node 'serve' if you have Node.js installed
# npm install -g serve
# serve -s . -l 5000
```

Then open the served URL (e.g. `http://localhost:8000`) in your browser.


**How to customize**
- Edit colors via CSS variables at the top of `style.css` (e.g. `--primary-color`, `--accent-color`).
- Replace `images/k.png` in the `images/` folder with your own hero image; keep the same filename or update the `src` in `index.html`.
- Add or remove sections in `index.html` as needed; follow existing structure for consistent styling.
- Tweak typography by changing Google Fonts links in the `<head>` of `index.html`.


**Deployment**
- GitHub Pages: push the repository to GitHub and enable Pages from the `main` branch (root). The site will be served at `https://<your-username>.github.io/<repo>/`.
- Netlify / Vercel: Drag-and-drop the static site folder or connect the repository for automated deploys.


**Contributing**
- Small fixes, improvements, and accessibility tweaks are welcome.
- Please open an issue or a pull request with a descriptive title and changes.


**License**
This project is provided as-is. Add a license file if you want explicit permissions (MIT recommended).


**Contact**
- Email: `hello@potatog.dev`
- Portfolio name: `Potato.G`


**Credits**
- Fonts: Google Fonts (Plus Jakarta Sans, Monoton, etc.)
- Icons: Font Awesome

---

If you'd like, I can:
- Add a `LICENSE` file (MIT) and commit it
- Create a simple `deploy` workflow for GitHub Actions
- Publish the site to GitHub Pages for you (if you provide repo access/permission)

Tell me which of these you'd like next.