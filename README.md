# Practice project

This project will help to learn basic CRUD using Laravel, Vite, Vue, Vue-router.

## Run Locally

Clone the project

```bash
  git clone https://github.com/tcish/laravel-vue-CRUD.git
```

Install dependencies

```bash
npm i
composer i
```

- **Now add .env file**
- **Connect with Database**
- **Run migration to add table**
```bash
php artisan migrate
```
Start the server

```bash
npm run dev
php artisan serve
```
- **Then go to [http://127.0.0.1:8000] and click on GENERATE APP KEY**
## Initial installation from Scratch(only structure)
**Step-1:** Create a fresh laravel project
```bash
  composer create-project laravel/laravel example-app-name-here
```

**Step-2:** Now replace in laravel routes/web.php file
```bash
  Route::get('{any}', function () {
      return view('welcome');
  })->where("any", ".*");
```

**Step-3:** Now install dependecies using npm
```bash
  npm i @vitejs/plugin-vue vue@ext vue-loader vue-router@4
```

**Step-4:** Now create index.js in resources\js\router\index.js, then write
```bash
  import { createRouter, createWebHistory } from "vue-router";
  import Home from "../pages/Component/Home.vue";
  import About from "../pages/Component/About.vue";

  const routes = [
      {
          path: "/",
          name: "home",
          component: Home,
      },
      {
          path: "/about",
          name: "about",
          component: About,
      },
  ];

  const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes,
  });

  export default router;
```

**Step-5:** Now create two files Home.vue, About.vue in resources\js\pages\Component\

In Home.vue
```bash
  <template>
    <router-link to="/about">About</router-link>
  </template>
```

In About.vue
```bash
  <template>
    <router-link to="/">Home</router-link>
  </template>
```

**Step-6:** Now create App.vue in resources\js\pages\App.vue, then write
```bash
  <template>
    <router-view />
  </template>
```

**Step-7:** Now create app.js in resources\js\app.js, then write
```bash
  import "./bootstrap";
  import { createApp } from "vue";
  import App from "./pages/App.vue";
  import router from "./router/index.js";

  const app = createApp(App);
  app.use(router);
  app.mount("#app");
```

**Step-8:** Now replace welcome.blade.php in resources\views\welcome.blade.php
```bash
  <!DOCTYPE html>
  <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>Laravel 9 with vue 3 vite</title>
      @vite('resources/css/app.css')
  </head>

  <body>
      <div id="app"></div>

      @vite('resources/js/app.js')
  </body>

  </html>
```

**Step-9:** Add vue in vite.config.js
```bash
  import { defineConfig } from 'vite';
  import laravel from 'laravel-vite-plugin';
  import vue from '@vitejs/plugin-vue';

  export default defineConfig({
      plugins: [
          vue(),
          laravel({
              input: ['resources/css/app.css', 'resources/js/app.js'],
              refresh: true,
          }),
      ],
  });
```

**Step-10:** Install dependencies and Start the server

```bash
npm i
composer i
npm run dev
php artisan serve
```
- **Don't forget to add .env file**
- **Then go to [http://127.0.0.1:8000] and click on GENERATE APP KEY**
