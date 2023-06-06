import {component$, Slot, useStyles$} from '@builder.io/qwik';
import {routeLoader$, useLocation} from '@builder.io/qwik-city';

import Header from '~/components/header/header';
import Footer from '~/components/footer/footer';

import styles from './styles.css?inline';
import HeaderBlog from "~/components/header/header-blog";
import {prismaClient} from "~/root";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const useAdminAuthorization = routeLoader$(async (requestEvent) => {
  // get the token from the cookie
  const token = requestEvent.cookie.get('token')?.value;
  if(!token) return false;
  return await prismaClient.adminToken.count({where: {token: token, expired_at: { gt: new Date() }}}) >= 1;
});

export default component$(() => {
  const loc = useLocation();
  const isAdmin = useAdminAuthorization();

  useStyles$(styles);
  return (
    <div class="flex flex-col min-h-screen">
      <div class="px-20 pt-6 pb-4">
        {!loc.url.pathname.startsWith("/blog") ? <Header /> : <HeaderBlog is_admin={isAdmin.value} />}
      </div>
      <main class="flex-auto">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
