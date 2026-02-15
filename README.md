# JLA Recovery Solutions Website

A professional static website for JLA Recovery Solutions, LLC - a consulting practice specializing in disaster recovery, CDBG-DR, FEMA programs, and disaster housing.

## Quick Start

To view the site locally, simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if http-server is installed)
npx http-server
```

Then visit `http://localhost:8000`

---

## Deploying to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in (or create an account)
2. Click the **+** icon in the top right → **New repository**
3. Name it: `jlarecoverysolutions.github.io` (for organization) or any name like `jla-website`
4. Set it to **Public**
5. Do NOT initialize with README (we already have files)
6. Click **Create repository**

### Step 2: Upload Your Website Files

**Option A: Using GitHub Web Interface (Easiest)**

1. On your new repository page, click **"uploading an existing file"**
2. Drag all files from the `site` folder into the upload area:
   - `index.html`
   - `services.html`
   - `experience.html`
   - `about.html`
   - `insights.html`
   - `contact.html`
   - `css/` folder (with `styles.css`)
   - `js/` folder (with `main.js`)
   - `images/` folder (if any)
3. Add commit message: "Initial website upload"
4. Click **Commit changes**

**Option B: Using Git Command Line**

```bash
# Navigate to your site folder
cd /path/to/jla-recovery-solutions/site

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial website upload"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (tab at the top)
3. Scroll down to **Pages** in the left sidebar
4. Under "Source", select **Deploy from a branch**
5. Under "Branch", select **main** and **/ (root)**
6. Click **Save**
7. Wait 1-2 minutes for deployment
8. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## Pointing Your Namecheap Domain to GitHub Pages

### Step 1: Add Custom Domain in GitHub

1. In your GitHub repository, go to **Settings** → **Pages**
2. Under "Custom domain", enter: `jlarecoverysolutions.com`
3. Click **Save**
4. Check "Enforce HTTPS" (may need to wait for DNS to propagate first)

### Step 2: Configure DNS in Namecheap

1. Log into [Namecheap](https://www.namecheap.com)
2. Go to **Domain List** → click **Manage** next to your domain
3. Click the **Advanced DNS** tab
4. Delete any existing A Records or CNAME records for @ or www

5. Add the following **A Records** (for apex domain):

   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | A Record | @ | 185.199.108.153 | Automatic |
   | A Record | @ | 185.199.109.153 | Automatic |
   | A Record | @ | 185.199.110.153 | Automatic |
   | A Record | @ | 185.199.111.153 | Automatic |

6. Add a **CNAME Record** (for www subdomain):

   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | CNAME | www | YOUR_USERNAME.github.io. | Automatic |

   (Replace YOUR_USERNAME with your actual GitHub username)

### Step 3: Wait for DNS Propagation

- DNS changes can take 10 minutes to 48 hours to fully propagate
- You can check status at: https://www.whatsmydns.net/#A/jlarecoverysolutions.com
- Once propagated, your site will be live at both:
  - `https://jlarecoverysolutions.com`
  - `https://www.jlarecoverysolutions.com`

### Step 4: Enable HTTPS

1. After DNS propagates, return to GitHub → Settings → Pages
2. Check the box for **Enforce HTTPS**
3. Your site will now redirect all traffic to HTTPS

---

## Setting Up the Contact Form (Formspree)

The contact form uses [Formspree](https://formspree.io) - a simple service that emails form submissions to you.

### Step 1: Create a Formspree Account

1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account (50 submissions/month on free tier)

### Step 2: Create a New Form

1. Click **New Form**
2. Name it "JLA Recovery Solutions Contact"
3. Set the email to: `james.ariail@jlarecoverysolutions.com`
4. Copy your **Form ID** (looks like: `xyzabc123`)

### Step 3: Update Your Website

1. Open `contact.html`
2. Find this line:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID:
   ```html
   <form id="contact-form" action="https://formspree.io/f/xyzabc123" method="POST">
   ```
4. Save the file and push to GitHub

### Step 4: Test the Form

1. Visit your live website
2. Fill out the contact form
3. Check your email for the submission
4. You can also view submissions in your Formspree dashboard

---

## Updating Content

### Updating Text Content

All content is in the HTML files. Open any file in a text editor and modify the text between HTML tags.

**Common updates:**
- Contact email: Search for `james.ariail@jlarecoverysolutions.com`
- Year in copyright: Search for `2026`
- LinkedIn URL: Search for `linkedin.com/in/jamesariail`

### Adding New Experience/Projects

In `experience.html`, copy an existing project block:

```html
<div class="experience-detail">
    <h3>Project Title</h3>
    <p class="meta">Client Name | Year–Year</p>
    <p>Description of the project...</p>
    <ul>
        <li>Achievement 1</li>
        <li>Achievement 2</li>
    </ul>
</div>
```

### Adding Insights/Articles

When you start publishing on Substack:

1. Open `insights.html`
2. Find the `articles-list` section
3. Add new list items with links:

```html
<li>
    <a href="https://yoursubstack.substack.com/p/article-slug" target="_blank" rel="noopener noreferrer">
        Article Title Here
    </a>
    <br><span style="color: var(--color-text-light); font-size: 0.9375rem;">Month Year</span>
</li>
```

### Updating Styles

All styles are in `css/styles.css`. The file is organized into sections:

1. CSS Variables (colors, fonts, spacing) - lines 1-60
2. Typography - search for "TYPOGRAPHY"
3. Components - search for specific component names

To change the primary color, update the `--color-primary` variable at the top of the CSS file.

---

## File Structure

```
site/
├── index.html          # Home page
├── services.html       # Services page
├── experience.html     # Experience/projects page
├── about.html          # About page
├── insights.html       # Insights/articles page (placeholder)
├── contact.html        # Contact page with form
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # JavaScript (mobile menu, form handling)
├── images/             # Images folder (add logo, photos here)
└── README.md           # This file
```

---

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome for Android)

---

## Accessibility

The site follows WCAG 2.1 AA guidelines:
- Semantic HTML structure
- Proper heading hierarchy
- Sufficient color contrast
- Keyboard navigation support
- Skip-to-content link
- ARIA labels where appropriate
- Reduced motion support

---

## Performance

- No external JavaScript libraries (vanilla JS only)
- Single CSS file, well-organized
- System fonts with Google Fonts fallback
- Minimal dependencies
- Fast load times on 3G connections

---

## Support

For technical issues or questions about updating the site, refer to:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Formspree Documentation](https://help.formspree.io/)
- [Namecheap DNS Guide](https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages/)

---

## License

© 2026 JLA Recovery Solutions, LLC. All rights reserved.
