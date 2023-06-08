import {component$} from "@builder.io/qwik";
import {Link, routeLoader$} from "@builder.io/qwik-city";
import ViewPost from "~/components/view-post/view-post";
import {ormDb, db} from "~/root";
import {PostTable} from "~/model/post";
import {eq} from "drizzle-orm";

export const useAdminAuthorization = routeLoader$(async (requestEvent) => {
  // get the token from the cookie
  const token = requestEvent.cookie.get('token')?.value;
  if (!token) return false;
  return (await db.sql`SELECT COUNT(*) FROM admin_token WHERE token=${token} AND expired_at > CURRENT_TIMESTAMP`).rowCount >= 1;
});

export const usePost = routeLoader$(async(requestEvent) => {
  const postId = +requestEvent.params.postId;
  const res = await ormDb.select().from(PostTable).where(eq(PostTable.id, postId));
  return res.length > 0 ? res[0] : null;
});

export default component$(() => {
  const post = usePost();
  if (post.value == null) {
    return (
      <div class="flex flex-col md:w-10/12 mx-auto md:p-10">
        <h2>Post does not exists!</h2>
      </div>
    );
  }

  const isAdmin = useAdminAuthorization();

  return (
    <div class="flex flex-col md:w-10/12 mx-auto md:p-10">
      {isAdmin.value &&
          <Link href={"/blog/posts/" + post.value.id + "/edit"}
              class="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full floating-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24"
                   height="24"
                   viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                   stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                  <path d="M13.5 6.5l4 4"></path>
              </svg>
          </Link>}
      <ViewPost post={post.value}></ViewPost>
    </div>
  );
});