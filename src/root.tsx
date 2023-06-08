import {component$, useVisibleTask$} from '@builder.io/qwik';
import {QwikCityProvider, RouterOutlet, ServiceWorkerRegister} from '@builder.io/qwik-city';
import {RouterHead} from './components/router-head/router-head';

import './global.css';
import {createPool} from "@vercel/postgres";
import {drizzle} from "drizzle-orm/vercel-postgres";

export const db = createPool({connectionString: process.env['POSTGRES_URL']});
export const ormDb = drizzle(db);

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
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <link rel="manifest" href="/manifest.json"/>
        <RouterHead/>
      </head>
      <body lang="en">
      <RouterOutlet/>
      <ServiceWorkerRegister/>
      </body>
    </QwikCityProvider>
  );
});
