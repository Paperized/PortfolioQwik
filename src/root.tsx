import {component$, useVisibleTask$} from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import './global.css';
import {sql} from "@vercel/postgres";
import {drizzle} from "drizzle-orm/vercel-postgres";

console.log(process.env);

const ormDb = drizzle(sql);
const sqlDb = sql;
export {ormDb, sqlDb};

export default component$(() => {
  useVisibleTask$(() => {
    const token = localStorage.getItem("token");
    if (token) {
      document.cookie = `token=${token}; expires=; path=/`;
    }
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
