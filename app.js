"use strict";
(() => {
  const data = window.PORTFOLIO;
  if (!data) return;
  const $ = (selector) => document.querySelector(selector);
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  // Permit web links and local assets; never interpret data as HTML or script URLs.
  const safeURL = (value) => {
    if (!value || typeof value !== "string") return "";
    try {
      const url = new URL(value, window.location.href);
      return ["https:", "http:"].includes(url.protocol) || (url.protocol === "file:" && !/^[a-z]+:/i.test(value)) ? url.href : "";
    } catch { return ""; }
  };
  const tags = (items = []) => {
    const list = make("ul", "tags");
    items.forEach(item => list.append(make("li", "", item)));
    return list;
  };
  const externalLink = (label, href) => {
    const url = safeURL(href);
    if (!url) return null;
    const link = make("a", "text-link", label + " ↗");
    link.href = url; link.target = "_blank"; link.rel = "noopener";
    return link;
  };
  const projectLinks = (project) => {
    const links = make("div", "detail-links");
    [["GitHub", project.github], ["Live demo", project.demo], ["Report / PDF", project.report]].forEach(([label, href]) => {
      const link = externalLink(label, href);
      if (link) links.append(link);
    });
    return links;
  };
  const dialog = $("#project-dialog");
  let projectTrigger = null;
  let previousHash = "#projects";
  let previousOverflow = "";
  const renderDetail = project => {
    const detail = $("#project-detail");
    detail.replaceChildren();
    detail.append(make("p", "eyebrow", project.category));
    const title = make("h2", "", project.title); title.id = "project-dialog-title";
    detail.append(title, make("p", "detail-meta", [project.organization, project.date].filter(Boolean).join(" · ")), tags(project.technologies));
    const fields = [["overview", "Overview"], ["objective", "Objective"], ["role", "My role"], ["process", "Process"], ["calculations", "Calculations"], ["results", "Results"], ["lessons", "Lessons learned"]];
    fields.forEach(([key, heading]) => {
      const text = project.details?.[key];
      if (text) detail.append(make("h3", "", heading), make("p", "", text));
    });
    (project.details?.images || []).forEach(item => {
      const url = safeURL(item.src);
      if (!url) return;
      const figure = make("figure", "detail-figure"), img = make("img", "detail-media");
      img.src = url; img.alt = item.alt || ""; img.loading = "lazy";
      figure.append(img);
      if (item.caption) figure.append(make("figcaption", "", item.caption));
      detail.append(figure);
    });
    (project.details?.videos || []).forEach(item => {
      const url = safeURL(item.src);
      if (!url) return;
      const figure = make("figure", "detail-figure"), video = make("video", "detail-media");
      video.src = url; video.controls = true; video.preload = "metadata";
      video.setAttribute("aria-label", item.title || "Project video");
      if (item.captions && safeURL(item.captions)) {
        const track = make("track"); track.kind = "captions"; track.src = safeURL(item.captions); track.srclang = "en"; track.label = "English"; video.append(track);
      }
      figure.append(video);
      if (item.title) figure.append(make("figcaption", "", item.title));
      detail.append(figure);
    });
    detail.append(projectLinks(project));
  };
  const syncProject = () => {
    let id;
    try { id = decodeURIComponent(location.hash.replace(/^#project\//, "")); } catch { return; }
    const project = location.hash.startsWith("#project/") && data.projects.find(item => item.id === id);
    if (project) {
      renderDetail(project);
      if (!dialog.open) { previousOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; dialog.showModal(); }
      dialog.scrollTop = 0;
    } else if (dialog.open) dialog.close();
  };
  const orderedProjects = [...data.projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  orderedProjects.forEach((project, index) => {
    const card = make("article", "project-card");
    if (safeURL(project.image)) {
      const img = make("img", "project-image"); img.src = safeURL(project.image); img.alt = project.imageAlt || ""; img.loading = "lazy"; card.append(img);
    }
    const top = make("div", "project-card-top");
    top.append(make("span", "project-number", String(index + 1).padStart(2, "0")), make("span", "project-category", project.category));
    const body = make("div", "project-card-body");
    body.append(make("h3", "", project.title), make("p", "project-description", project.description));
    if (project.metric?.value) {
      const metric = make("div", "project-metric"); metric.append(make("strong", "", project.metric.value), make("span", "", project.metric.label)); body.append(metric);
    }
    body.append(tags(project.technologies));
    const links = projectLinks(project);
    if (links.childElementCount) body.append(links);
    const footer = make("div", "project-card-footer"), button = make("button", "project-open", "View project ↗");
    button.type = "button"; button.setAttribute("aria-label", "View project: " + project.title);
    button.addEventListener("click", () => { previousHash = location.hash || "#projects"; projectTrigger = button; location.hash = "project/" + encodeURIComponent(project.id); });
    footer.append(make("span", "", project.date), button);
    card.append(top, body, footer); $("#project-list").append(card);
  });
  data.experience.forEach(item => {
    const article = make("article", "experience-item"), time = make("div", "experience-time"), body = make("div");
    time.append(make("p", "experience-date", item.dates), make("p", "experience-location", item.location));
    body.append(make("h3", "", item.organization), make("p", "experience-role", item.role));
    const list = make("ul"); item.bullets.forEach(text => list.append(make("li", "", text))); body.append(list);
    article.append(time, body); $("#experience-list").append(article);
  });
  data.skills.forEach(item => { const group = make("div", "skill-group"); group.append(make("h3", "", item.category), make("p", "", item.items.join(" · "))); $("#skills-list").append(group); });
  data.certifications.forEach(item => $("#certification-list").append(make("li", "", item)));
  data.leadership.forEach(item => {
    const article = make("article", "leadership-card");
    article.append(make("h3", "", item.organization), make("p", "role", item.role), make("p", "meta", item.dates + " · " + item.location), make("p", "", item.description));
    $("#leadership-list").append(article);
  });
  if (safeURL(data.resume)) document.querySelectorAll('a[href="assets/resume.pdf"]').forEach(link => { link.href = safeURL(data.resume); });
  $("#year").textContent = new Date().getFullYear();
  const menu = $(".menu-toggle"), nav = $("#navigation");
  const closeMenu = () => { nav.classList.remove("is-open"); menu.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-label", "Open navigation"); };
  menu.addEventListener("click", () => { const open = nav.classList.toggle("is-open"); menu.setAttribute("aria-expanded", String(open)); menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation"); });
  nav.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(); menu.focus(); } });
  $(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = previousOverflow;
    if (location.hash.startsWith("#project/")) history.replaceState(null, "", previousHash.startsWith("#project/") ? "#projects" : previousHash);
    if (projectTrigger) { projectTrigger.focus({ preventScroll: true }); projectTrigger = null; }
  });
  window.addEventListener("hashchange", syncProject);
  syncProject();
})();
