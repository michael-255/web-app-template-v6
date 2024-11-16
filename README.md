# web-app-template-v6

This template should help get you started developing with Vue 3 in Vite.

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

   - Navigate to the directory you would like to create the project in
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
   - Create this workflow file in `~/.github/workflows/deploy-github-pages.yml`

4. Install Other Dependencies

## Icons

Use the following site to help with application icons:
<https://realfavicongenerator.net/>

## Credits

Base `Web App Template` created by Michael Joy (michael-255 on GitHub)
