import {component$} from "@builder.io/qwik";
import {Link, Loader, routeLoader$} from "@builder.io/qwik-city";
import PostList from "~/components/post-list/post-list";
import {withPropertiesFrom} from "~/prisma-utils";
import {PreviewPost} from "~/model/post";
import {prismaClient} from "~/root";

export const usePreviewPosts: Loader<{
  posts: any[],
  page: number,
  count: number
}> = routeLoader$(async (requestEvent) => {
  const currentPage = requestEvent.url.searchParams.get('page') || '1';
  let page = parseInt(currentPage);
  if (page < 1) page = 1;
  const postPerPage = 10;
  const skipCount = (page - 1) * postPerPage;
  const posts = await prismaClient.post.findMany({
    orderBy: {timestamp: 'desc'}, select: withPropertiesFrom(PreviewPost).build(), skip: skipCount, take: postPerPage
  });
  const count = await prismaClient.post.count();
  return {posts, page, count};
});

export default component$(() => {
  const posts = usePreviewPosts();
  const totalPages = Math.ceil(posts.value.count / 10);

  if(posts.value.count === 0) {
    return <div class="flex flex-col md:w-10/12 mx-auto md:p-10">
      <p class="text-center">Currently there are no blog posts :(</p>
    </div>
  }

  return (
    <div class="flex flex-col md:w-10/12 mx-auto md:p-10">
      <PostList posts={posts.value.posts} containerClass="grid grid-cols-2 gap-6"></PostList>
      {posts.value.count && (<nav class="flex">
        <ul class="inline-flex items-center -space-x-px mx-auto mt-5">
          <li>
            <Link href={posts.value.page > 1 ? "/blog?page=" + (posts.value.page - 1) : undefined}
               class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="sr-only">Previous</span>
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
              </svg>
            </Link>
          </li>
          {posts.value.page - 2 > 0 && (<li>
            <Link href={"/blog?page=" + (posts.value.page - 2)}
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{posts.value.page - 2}</Link>
          </li>)}
          {posts.value.page - 1 > 0 && (<li>
            <Link href={"/blog?page=" + (posts.value.page - 1)}
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{posts.value.page - 1}</Link>
          </li>)}
          <li>
            <a aria-current="page"
               class="px-3 py-2 leading-tight text-gray-100 border hover:bg-gray-700  bg-gray-800 border-gray-700 hover:text-white">{posts.value.page}</a>
          </li>
          {posts.value.page + 1 <= totalPages && (<li>
            <Link href={"/blog?page=" + (posts.value.page + 1)}
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{posts.value.page + 1}</Link>
          </li>)}
          {posts.value.page + 2 <= totalPages && (<li>
              <Link href={"/blog?page=" + (posts.value.page + 2)}
                    class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{posts.value.page + 2}</Link>
            </li>
          )}
          <li>
            <Link href={posts.value.page < totalPages ? "/blog?page=" + (posts.value.page + 1) : undefined}
               class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="sr-only">Next</span>
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"></path>
              </svg>
            </Link>
          </li>
        </ul>
      </nav>)}
    </div>
  );
});