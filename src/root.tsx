import {component$, useVisibleTask$} from '@builder.io/qwik';
import {QwikCityProvider, RouterOutlet, ServiceWorkerRegister} from '@builder.io/qwik-city';
import {RouterHead} from './components/router-head/router-head';

import './global.css';
import {createPool} from "@vercel/postgres";
import {drizzle} from "drizzle-orm/vercel-postgres";
import {QwikPartytown} from "~/components/partytown/partytown";

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
        <link rel="manifest" href="/manifest.json"/>
        <RouterHead/>
        <QwikPartytown forward={['dataLayer.push']}/>
        <script
          async
          type="text/partytown"
          src="https://www.googletagmanager.com/gtag/js?id=G-3ZW74CT0YX"
        />
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '3ZW74CT0YX');`}/>
      </head>
      <body lang="en">
      <RouterOutlet/>
      <ServiceWorkerRegister/>
      </body>
    </QwikCityProvider>
  );
});
