# Bo Galligan portfolio

A personal portfolio prepared for free hosting on GitHub Pages at https://bobile29.github.io/. Repository: https://github.com/bobile29/bobile29.github.io. The site includes education, internship case studies, work experience, skills, leadership, contact links, and a public résumé PDF.

## Open it now

Double-click `index.html`. The site works directly in a modern browser; no installation, build step, paid service, or API key is required.

To preview through a local server, if Python is installed, open a terminal inside this folder and run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8000`. Press Ctrl+C in that terminal to stop the server.

## Publish free on GitHub Pages

GitHub Pages is included with GitHub Free when the repository is public. Your website and its source files will be publicly accessible. A `github.io` address is included, so you do not need to buy a domain.

1. Sign in to [GitHub](https://github.com/).
2. Create a **public** repository named `YOUR-USERNAME.github.io`, replacing `YOUR-USERNAME` with your actual GitHub username. Enable **Add a README file** when creating it. If that repository already hosts another website, do not replace it; create a repository named `portfolio` instead.
3. In the repository, choose **Add file → Upload files**. Drag the **contents** of this portfolio folder into the upload area. Upload the actual files and `assets` folder, not the ZIP and not an outer `bo-galligan-portfolio` folder. `index.html` must appear directly at the repository root. The supplied `README.md` can replace the initial README.
4. Select **Commit changes** to save the uploaded files to the `main` branch.
5. Open **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**. Select **main** and **/(root)**, then **Save**.
6. Wait for GitHub to finish publishing; it can take up to 10 minutes. The Pages settings screen will show the site URL. For a repository named `YOUR-USERNAME.github.io`, it is `https://YOUR-USERNAME.github.io/`. For `portfolio`, it is `https://YOUR-USERNAME.github.io/portfolio/`.

The relative asset paths and project links work with either address. Future changes committed to `main` are published automatically. You do not need GitHub Pro, a custom GitHub Actions workflow, Vercel, or Netlify for this site.

Official references: [GitHub Pages overview](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [uploading files](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository), [choosing a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Files

```text
bo-galligan-portfolio/
  index.html       Page sections, biography, education, contact, and metadata
  styles.css       Responsive styling, colors, typography, and print styling
  data.js          Project, experience, skill, certification, and leadership data
  app.js           Reusable rendering, project details, and mobile navigation
  assets/
    resume.pdf     Public résumé; replace this file for future résumé updates
    images/        Store future project photos here
    reports/       Store future PDF reports here
  .nojekyll        Tells GitHub Pages to serve these static files directly
  README.md        This guide
```

Plain HTML, CSS, and JavaScript keep editing and publishing simple. There are no external fonts, tracking scripts, package dependencies, or recurring hosting charges. All source files are included.

## Add a project

Open `data.js` and add a new object inside the `projects: [ ... ]` list. Put a comma between objects. Copy an existing project, or use the template below. Replace every TODO before publishing; the template itself is documentation and is not shown on the website.

```javascript
{
  id: "your-project-slug",
  title: "TODO: Project title",
  date: "TODO: Month Year",
  category: "TODO: Engineering / Coursework / Research / Personal",
  organization: "TODO: Course, employer, team, or personal project",
  description: "TODO: One or two factual sentences about the project.",
  technologies: ["TODO: Actual tool or technique"],
  metric: null,
  image: "",
  imageAlt: "",
  github: "",
  demo: "",
  report: "",
  featured: false,
  details: {
    overview: "TODO: What the project is about.",
    objective: "TODO: The problem or objective.",
    role: "TODO: Your own contribution.",
    process: "TODO: Your approach, design, or testing process.",
    calculations: "",
    results: "",
    lessons: "",
    images: [],
    videos: []
  }
}
```

Use a unique `id` with lowercase letters, numbers, and hyphens. Featured projects appear first; the original list order is preserved within each group. Empty optional fields are hidden. A project with no photo uses the site's text card layout.

To show an actual measured outcome, change `metric: null` to something like `metric: { value: "7", label: "procedures established" }` only when it accurately describes your work.

Project details open in an accessible dialog and have a shareable address such as `https://YOUR-USERNAME.github.io/#project/sample-preparation`. You can copy the browser address while a project is open. These links work directly on GitHub Pages without server routes. The structured `details` data can also be reused if you later add standalone project pages.

### Photos, reports, links, and video

Save a photo in `assets/images/`, then set:

```javascript
image: "assets/images/my-project.jpg",
imageAlt: "A concise description of what the photo shows",
report: "assets/reports/my-report.pdf",
github: "https://github.com/YOUR-USERNAME/YOUR-REPOSITORY",
demo: "https://your-actual-demo-address.example"
```

Use actual URLs, or leave those values empty. The example demo address must be replaced. Paths and filenames are case-sensitive on GitHub Pages. Do not use Windows paths such as `C:\Users\...` in the site data.

Additional images go in `details.images`:

```javascript
images: [
  {
    src: "assets/images/my-project-detail.jpg",
    alt: "Describe the relevant visual details",
    caption: "Optional factual caption"
  }
]
```

Small video files can be included in `details.videos`. Provide a WebVTT caption file for spoken content:

```javascript
videos: [
  {
    src: "assets/my-project-demo.mp4",
    title: "Project demonstration",
    captions: "assets/my-project-demo.en.vtt"
  }
]
```

For large videos, use an external video URL in `demo` instead of storing the video in the repository. GitHub browser uploads have a 25 MiB per-file limit.

## Update other information

- **Experience:** Add or edit objects in `data.js` under `experience`. Each object has `organization`, `role`, `dates`, `location`, and a `bullets` list.
- **Skills, certifications, leadership:** Edit their lists in `data.js`.
- **Biography, education, GPA, graduation, email, and LinkedIn:** Edit the corresponding text in `index.html`. Education appears in both the introductory profile and the education section, so update both.
- **Projects section title:** When you add coursework or personal work, replace “From the laboratory.” and its introductory sentence in `index.html` with a broader description such as “Selected projects.”
- **GitHub contact link:** The site links to `https://github.com/bobile29`. Edit that link in `index.html` if your username changes.
- **Résumé:** Replace `assets/resume.pdf` with the new PDF using the same filename. All résumé buttons will use the new file. If you change the filename, update `resume` in `data.js` and the résumé links in `index.html` so the no-JavaScript fallback also works.
- **Colors and spacing:** Edit the variables at the start of `styles.css`.
- **Search and social metadata:** Edit the title, description, and Open Graph text near the top of `index.html`. No social-preview image is included.

The included PDF was reformatted from the supplied Word résumé, with the phone number omitted for the public version. The two case studies describe internship work recorded in that résumé; they do not claim to be separate independent projects. No photos, coursework, or additional achievements were invented.

## Before each update

Open the page locally and check the changed text, mobile menu, project details, email/LinkedIn links, and résumé. Open any newly added report or image. Then upload or commit the changed files to GitHub. If an old version still appears after publishing finishes, refresh the browser.
