# CDAC CCEE Learning Portal

This is a Jekyll site designed to host learning materials and MCQ tests for the CDAC CCEE course. It uses the `just-the-docs` theme for easy navigation.

## Project Structure

- `docs/`: Contains the learning content organized by modules.
  - `docs/module-1/`: Example module structure.
  - `docs/module-1/practice/`: Contains practice tests.
- `_data/`: Contains the JSON files for MCQ questions (e.g., `m1_mcq1.json`).
- `assets/js/mcq.js`: Logic for rendering questions and calculating scores.
- `_layouts/mcq.html`: The layout for MCQ test pages.
- `_config.yml`: Jekyll configuration.

## How to Add Content

1. Create a new directory in `docs/` for your module (e.g., `docs/module-2`).
2. Add an `index.md` file with `has_children: true` and a `nav_order`.
3. Add content markdown files inside that directory, specifying the `parent` module.

## How to Add MCQ Tests

1. Create a JSON file in `_data/` (e.g., `m2_test1.json`) following this format:
   ```json
   [
     {
       "question": "Question text",
       "options": ["Option A", "Option B", "Option C"],
       "answer": 0
     }
   ]
   ```
2. Create a markdown file in your module's practice folder (e.g., `docs/module-2/practice/test1.md`).
3. Use the `mcq` layout and reference your data file:
   ```yaml
   ---
   layout: mcq
   title: Test 1
   parent: Practice
   grand_parent: Module 2
   mcq_data: m2_test1
   ---
   ```

## Local Development

1. Install Jekyll and Bundler: `gem install jekyll bundler`
2. Install dependencies: `bundle install`
3. Serve the site: `bundle exec jekyll serve`
4. Visit `http://127.0.0.1:4000/cdac-ccee/`

## Deployment

The site is configured to be deployed to `https://yadnyeshkolte.github.io/cdac-ccee`. Ensure GitHub Pages is enabled for your repository.
