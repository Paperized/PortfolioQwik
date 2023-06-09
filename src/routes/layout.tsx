import {component$, Slot, useStyles$} from '@builder.io/qwik';
import {routeLoader$, useLocation} from '@builder.io/qwik-city';

import Header from '~/components/header/header';
import Footer from '~/components/footer/footer';

import styles from './styles.css?inline';
import HeaderBlog from "~/components/header/header-blog";
import {ormDb} from "~/root";
import {AdminTokenTable} from "~/model/post";
import {and, eq, gt, sql} from "drizzle-orm";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const useAdminAuthorization = routeLoader$(async (requestEvent) => {
  // get the token from the cookie
  const token = requestEvent.cookie.get('token')?.value;
  if (!token) return false;
  return (await ormDb.select({
    count: sql<number>`count
        (*)`
  })
    .from(AdminTokenTable)
    .where(and(eq(AdminTokenTable.token, token), gt(AdminTokenTable.expiresAt, new Date()))))[0].count > 0;
});

export default component$(() => {
  const loc = useLocation();
  const isAdmin = useAdminAuthorization();

  useStyles$(styles);
  return (
    <div class="flex flex-col min-h-screen">
      <div class="px-2 md:px-20 pt-4 md:pt-6 pb-4">
        {!loc.url.pathname.startsWith("/blog") ? <Header/> : <HeaderBlog is_admin={isAdmin.value}/>}
      </div>
      <main class="flex-auto md:px-0 px-2">
        <Slot/>
      </main>
      <Footer/>
    </div>
  );
});
