import {component$} from '@builder.io/qwik';
import {Link} from "@builder.io/qwik-city";

export default component$((props: { is_admin: boolean }) => {
  return (
    <nav class="bg-transparent">
      <div class="w-full flex flex-wrap items-center justify-between">
        <Link href="/" class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Ivan Lo Greco
        </Link>
        <div class="flex-auto flex-grow-[0.5] relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor"
                 viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Search icon</span>
          </div>
          <input type="text" id="search-navbar"
                 class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Search..."></input>
        </div>
        <div>
          <ul
            class="flex flex-col p-4 md:p-0 mt-4 font-light border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {props.is_admin && (<li>
              <Link href="/blog/posts/new-post"
                    class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                New Post</Link>
            </li>)}
          </ul>
        </div>
      </div>
    </nav>
  );
});
