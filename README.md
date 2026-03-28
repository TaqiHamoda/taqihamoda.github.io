# [My Little Corner](https://taqihamoda.github.io) of the Internet 🌱

[![Node.js](https://img.shields.io/badge/Node.js-v20-blue.svg)](https://nodejs.org/en/blog/release/v20.20.2)

A lean, mean, data-driven portfolio engine machine 🏍 (built with Gatsby, Chakra UI, and TypeScript).

This engine is designed to help you carve out your own little corner of the internet without making you want to pull your hair out in the process.

---

## 💡 Why I Built This

Most portfolio engines out there (and there are a lot of them, sorry for creating another) feel overly convoluted in their design. They try to do everything leaving the user with unnecessary bells and whistles that make navigating the codebase and customizing it a chore.

I built this project as a way to restore the portfolio websites to their original and true reason of being: **a way for people to have their own little place on the internet to truly express who they are.**

This engine is meant to get out of your way so you can make your own little corner on the internet.

### Wait, I have seen this somewhere before

So if all the other portfolio-engines are so icky, why does the default UI look like it was stolen from [al-folio](https://alshedivat.github.io/al-folio/)?

First of all, shame on you. I didn't steal it. I imitated it! Learn the difference! (Imitation is the greatest form of flattery, amirite fellas 😅).

Secondly, al-folio is an amazing project and I am not really good with UI/UX so I needed to borrow a little bit of inspiration (aka copy the design) from somewhere.

However, once you look past the UI and move into the codebase, you will find where this engine truly shines.

### The Philosophy

* **Keep It Simple Stupid 😘**: The codebase is specifically written with the main goal of being easy to read and understand. No convoluted abstractions, confusing spaghetti code, or esoteric one-liners. Every single line of code was written such that it makes sense. The goal is for this engine to be so easy to modify and customize that anyone can fork it and make it their own.

* **Less Bloat 🤢**: I am extremely averse to third-party libraries and dependency bloat. Outside of the main frameworks (i.e. React, Chakra UI, Gatsby, i18n, MDX.js), you will find that all the functionality present is implemented from scratch instead of being outsources. This keeps the project lean, secure, and easy to grow and maintain.

* **Universal by Design 😶**: It might be hard to believe, but the vast majority of people live in a country where English is not the primary language spoken (I know, I know, crazy stuff). As such, it was a must for the engine to not only support internationalization but to actively promote it in its internal design and usage. After all, if this website is to feel like home, it shouldn't just look cozy, it should also sound familiar.

### ❤️ A Personal Note

This project entered my life during a time for me that was filled with uncertainty and self-doubt. As a recent graduate who struggled to find employment, this project allowed me to dream and plan big when life's doors seemed shut in my face.

The project holds an incredibly dear place in my heart. Although it might not seem extraordinary or impressive to most people, to me, it is the anchor that kept me hopeful when things were difficult.

---

## 🛠️ Make It Your Own

Look, I get it. You want your site up and running without wrestling with the code and messing with it too much. Me too. That's why I built it, believe or not.

To make this your own, you really only need to care about four folders:

1. **`data/` (The Brains):** This is where your actual information lives. Update the simple `.json` files here to swap in your own projects, publications, author details, and social links.
2. **`content/` (The Words):** This holds the `.mdx` files for your pages. Want to change your bio or intro? Edit `index.mdx` (and its translated buddies like `index.es.mdx`).
3. **`locales/` (The Languages):** Want to add French or take out Spanish? Modify the translation files in `locales/translations/` and update your language config. The engine makes supporting new languages ridiculously easy.
4. **`assets/` (The Looks):** Drop your own PDFs and images in here. 

**📸 A Quick Heads-Up on Images:**
To make sure your site doesn't look weird, I suggest you stick to these aspect ratios when replacing images:
* **Profile Picture:** Square (1:1)
* **Project Thumbnails:** Square (1:1)
* **Publication Thumbnails:** Widescreen (16:9)

Nonetheless, you can feel free to ignore my advice. Who am I to tell you what to do anyways.

---

## 💻 How to Test It

Ready to see how your changes look? 

1. Install the dependencies (you only do this once!!!):
   ```bash
   npm install
   ```

2. Fire up the local server (you will do this every single time...):
   ```bash
   npm run develop
   ```
   *Your site should be up and live at `http://localhost:8000`. It hot-reloads, so every time you save a file, the browser updates instantly.*

---

## 🚀 How to Deploy

First and foremost, make sure you follow the [enable GitHub pages](https://docs.github.com/en/pages/quickstart) for your repo beforehand. Read every single little letter, don't you dare skip any parts 😠.

When your portfolio is looking good and you're ready to show it to the world, deploying it to GitHub Pages takes literally one command.

First, just make sure the `siteUrl` field in `gatsby-config.ts` points to your GitHub Pages URL and then run:
```bash
npm run deploy
```
*That's it. The script builds the site and pushes it straight to your `gh-pages` branch.*

---

## 🗺️ Where We're Going (Roadmap)

This is a hobby, passion project. I've got plans to make it even better but I don't really know when or how. Here is what's currently fermeting in the issue tracker:

**Breaking Out of the Single Page:**
* Adding multi-page support (because sometimes one page just isn't enough).
* Allowing papers and CVs/resumes to have their own dedicated standalone pages.
* Ability to create separate pages using `.mdx` files that show up in the banner.
* Adding a "hidden" or unlisted pages feature for stuff you only want to share via direct link.

**Leveling Up the Content:**
* A proper blogging engine with custom embedded web widgets.
* A scrollable News section.
* Advanced filtering, searching, and sorting for publications, news, and blogs (by year, keywords, etc.).
* Adding specific indicators for "Multi-First Author" papers and "Awards" (like Best Oral Presentation).

**Expanding the Scope & Tech:**
* Customizing the homepage to support entirely different use cases (like a website for a whole research lab or a "Team" page).
* Smart UI tweaks, like hiding the language button if a page only exists in one language.
* Exploring a transition to Chakra 3 and upgrading to the latest Node LTS to keep the codebase fresh and fast.

*(Feel free to poke around the issues, submit PRs, or just use this engine to build something awesome.)*
