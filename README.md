# Portfolio Website · Modern Resume 

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![FontAwesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com/)

> **A fully responsive, modern personal portfolio & resume UI — built with vanilla HTML5, CSS3, and JavaScript.**

![Portfolio Preview](https://via.placeholder.com/800x450?text=Modern+Resume+UI+Preview)

## 📌 Project Overview

This repository contains my **personal portfolio website** that doubles as a professional resume interface. Designed with a **dark/light aesthetic**, the project showcases my skills as an aspiring Cloud Engineer and Web Developer. The layout emphasizes clean typography, interactive components, and a print-friendly experience — perfect for sharing with recruiters and potential employers.

### ✨ Key Features

- 🎨 **Fully responsive design** — Seamless experience across desktop, tablet, and mobile devices.
- 🌗 **Modern dark/light aesthetic** — Professional gradient backgrounds with subtle glassmorphism effects.
- 🖨️ **Print-friendly CSS** — Optimized for saving as PDF or printing directly from the browser.
- ⚡ **Interactive UI components** — Animated skill bars, hover effects, and smooth transitions.
- 📱 **Mobile-first approach** — Flexbox, CSS Grid, and fluid layouts ensure accessibility on all screen sizes.
- 🔧 **Vanilla JavaScript** — Lightweight interactivity without external dependencies (except FontAwesome).
- 🧩 **Modular component design** — Easy to customize sections for experience, projects, certifications, and references.

---

## 🛠️ Tech Stack

| Technology       | Purpose                                      |
|------------------|----------------------------------------------|
| **HTML5**        | Semantic document structure & accessibility |
| **CSS3**         | Responsive layouts, Flex/Grid, animations   |
| **JavaScript**   | Skill bar animations, interactive elements  |
| **FontAwesome**  | High-quality icons for contact & tech stack |
| **Google Fonts** | Modern typography (Inter font family)       |

---

## 📂 Project Structure

NeeloByron/
├── index.html # Main portfolio/resume page
├── style.css # Custom styles & responsive breakpoints
├── script.js # Interactive behaviors (animations, print dialog)
└── README.md # Project documentation (you are here)

---


## 🚀 Live Demo

🔗 **[View the live portfolio here](https://github.com/NeeloByron/NeeloByron)**  

---

## 🧩 Sections Included

1. **Hero Header** — Name, title, bio, and contact badges with icons.
2. **Cloud Certifications** — AZ-900, AZ-104 (in progress), and self-taught web dev recognition.
3. **Technical Proficiency** — Visual skill bars (HTML/CSS, JS, Azure, Git, etc.).
4. **Tech Stack Showcase** — Icon-based grid highlighting core tools.
5. **Personal Projects & Labs** — Azure labs, frontend mini-apps, and portfolio itself.
6. **Professional Experience** — Junior Estimator & Technical Support roles.
7. **Education & Learning Path** — National Diploma + self-taught cloud/web journey.
8. **References** — Professional contacts displayed in styled cards.
9. **Footer** — Social/tech icons and update timestamp.


---

## 📱 Responsive Breakpoints

| Device      | Breakpoint | Behavior                                |
|-------------|------------|-----------------------------------------|
| Desktop     | ≥ 1024px   | Two-column layout, full-width hero      |
| Tablet      |768px–1023px| Reduced padding, flexible grid          |
| Mobile      | < 768px    |Single column, centered content, stacked |

---

## 🔧 Customization Guide

Want to adapt this template for your own portfolio? Here's how:

1. **Update personal info** — Replace name, bio, contact details, and links in `index.html`.
2. **Swap skills & percentages** — Modify the `.skill` divs inside the left column.
3. **Change color theme** — Edit the gradient variables in `style.css` (search for `#3b82f6`, `#8b5cf6`).
4. **Add your own projects** — Duplicate the `.exp-item` structure in the "Personal Projects & Labs" section.
5. **Modify certifications** — Update the `.cert-card` elements with your badges and statuses.
6. **Replace FontAwesome icons** — Use any [FontAwesome 6 free icons](https://fontawesome.com/search) by changing the `i` class.
7. **Adjust print styles** — Modify the `@media print` block for PDF preferences.

---

## 🧪 Running Locally

Clone the repository and open `index.html` in your browser:

```bash
git clone https://github.com/NeeloByron/NeeloByron.git
cd NeeloByron
