import {$, component$, useVisibleTask$} from '@builder.io/qwik';
import {Link} from "@builder.io/qwik-city";

export default component$(() => {
  const goToAnchor = $((ev: any) => {
    const anchorId = ev.target.getAttribute('href');
    const anchor = document.querySelector(anchorId!);
    if (anchor) {
      anchor.scrollIntoView({behavior: 'smooth'});
    }
  });

  useVisibleTask$(() => {
    document.getElementById('mobile-menu-trigger')?.addEventListener('click', () => {
      document.getElementById('menu')?.classList.toggle('hidden');
    });
  }, {strategy: 'document-ready'});

  return (
    <nav class="bg-transparent">
      <div class="w-full flex flex-wrap items-center justify-between">
        <Link href="/" class="self-center text-2xl font-semibold whitespace-nowrap text-white">
          Ivan Lo Greco
        </Link>
        <div class="flex items-center md:hidden">
          <button id="mobile-menu-trigger" type="button"
                  class="inline-flex items-center p-2 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"></path>
            </svg>
            <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div id="menu" class="basis-full md:basis-auto hidden md:block">
          <ul
            class="flex flex-col p-4 md:p-0 mt-4 font-light border border-[#5861b2] rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-transparent">
            <li>
              <a href="#introduction" preventdefault:click onClick$={goToAnchor}
                 class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 md:text-blue-500"
                 aria-current="page">Introduction</a>
            </li>
            <li>
              <a href="#experiences" preventdefault:click onClick$={goToAnchor}
                 class="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Experiences</a>
            </li>
            <li>
              <a href="#projects" preventdefault:click onClick$={goToAnchor}
                 class="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Projects</a>
            </li>
            <li>
              <a href="#latest-posts" preventdefault:click onClick$={goToAnchor}
                 class="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Latest Posts</a>
            </li>
            <li>
              <Link href="/blog"
                    class="block md:hidden block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">
                See Blog
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/blog" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hidden md:block">
          See Blog
        </Link>
      </div>
    </nav>
  );
});
