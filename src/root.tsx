import {component$, useVisibleTask$} from '@builder.io/qwik';
import {QwikCityProvider, RouterOutlet, ServiceWorkerRegister} from '@builder.io/qwik-city';
import {RouterHead} from './components/router-head/router-head';

import './global.css';
import {createPool, VercelPool} from "@vercel/postgres";
import {drizzle, VercelPgDatabase} from "drizzle-orm/vercel-postgres";

let _orm: VercelPgDatabase | null = null;
let _db: VercelPool | null = null;
export function db() {
  if(_db == null)
    return _db = createPool({ connectionString: process.env.POSTGRES_URL });
  else
    return _db;
}
export function ormDb() {
  if(_orm == null)
    return _orm = drizzle(db());
  else
    return _orm;
}

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
