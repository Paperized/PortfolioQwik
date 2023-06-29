import {component$} from '@builder.io/qwik';
import {Link} from "@builder.io/qwik-city";

export default component$((props: { is_admin: boolean }) => {
  return (
    <nav class="bg-transparent">
      <div class="w-full flex flex-wrap items-center justify-between">
        <Link href="/" class="self-center text-2xl font-semibold whitespace-nowrap text-white">
          Ivan Lo Greco
        </Link>
        <div class="flex-auto md:basis-auto basis-full md:flex-grow-[0.5] relative md:order-none order-1">
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
                 class="block w-full p-2 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Search..."></input>
        </div>
        <div>
          <ul
            class="flex md:p-0 font-light rounded-lg space-x-0 md:space-x-8 md:mt-0 border-0 border-gray-700">
            {props.is_admin && (<li>
              <Link href="/blog/posts/new-post"
                    class="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">
                New Post</Link>
            </li>)}
            <li>
              <Link href="/blog"
                    class="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">
                All Posts</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});
