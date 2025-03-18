# Web App Template `v6`

Vue 3 web application template to use as a starting point for new projects.

## `TODO`

- Create fresh project called `Web App Template v9`

- Create `_Base` components for all areas of the template app
- Try using Observable Plot for charting
  - All chart DB access can be in the individual chart components

## Post Cloning Steps

- [ ] Update `package.json`

  - [ ] `name`
  - [ ] `description`
  - [ ] `version`
  - [ ] `repository`
  - [ ] `bugs`
  - [ ] `homepage`

- [ ] Update specific files

  - [ ] `base` in `~/vite.config.ts` to your repository name for deployments
  - [ ] `AppName` and `AppDescription` in `~/src/constants/global.ts`
  - [ ] `name` and `short_name` in `~/public/manifest.json`
  - [ ] `start_url` in `~/public/manifest.json` to deployed website address

- [ ] Update `GitHub` repository settings

  - [ ] Description
  - [ ] Website (Use GitHub Pages)
  - [ ] Topic keywords
  - [ ] Update the `Include in the home page` section

    - [ ] Uncheck `Releases`
    - [ ] Uncheck `Packages`
    - [ ] Keep `Deployments` (for GitHub Pages)

- [ ] Update `README.md`

  - [ ] Change README main heading to your project name
  - [ ] Add detailed project description
  - [ ] Update the `Credits` section as needed
  - [ ] Remove unneeded `Post Cloning Steps` section
  - [ ] Remove unneeded `Project Creation Steps` section

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Project Creation Steps

1. Install Vue

   Create the Vue project directory and initial files.

   - Navigate to the directory you would like to create the project inm run de
   - Run the create Vue command
   - Use the selections you would like for your project
   - Navigate into your project directory and install the dependencies

   ```sh
   npm create vue@latest
   ```

2. Install Quasar

   ```sh
   npm install --save quasar @quasar/extras
   npm install --save-dev @quasar/vite-plugin sass-embedded@^1.80.2
   ```

3. Setup GitHub Pages

   Configure GitHub Pages to deploy using GitHub Actions.

   - Add `base: '/REPO_NAME/'` to `vite.config.ts`
   - In GitHub for this repository, go to `Settings` > `Pages`
   - Under `Build and Deployment` > `Source`, select `GitHub Actions`
   - Create workflow file in `~/.github/workflows/deploy-github-pages.yml`

4. Install Other Dependencies

## Icons

Use the following site to help with application icons:
<https://realfavicongenerator.net/>

## Credits

Base `Web App Template` created by Michael Joy (michael-255 on GitHub)
