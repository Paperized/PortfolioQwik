import {$, component$, QRL, useVisibleTask$} from "@builder.io/qwik";
import type {Post} from "~/model/post";

export default component$((props: {
  post: Post,
  event?: { onUpdateContent: QRL<(text: string) => void> | undefined }
}) => {

  useVisibleTask$(() => {
    const updateContentText = $((text: string) => {
      const contentElement = document.getElementById('content-post')!;
      contentElement.innerHTML = text;
      const targetElements = contentElement.querySelectorAll('[unrendered]');

      targetElements.forEach((element) => {
        element.textContent = element.innerHTML;
      });
    });

    if (props.event !== undefined) {
      props.event.onUpdateContent = updateContentText;
    }

    updateContentText(props.post.content);
  }, {strategy: 'document-ready'});

  const sharePost = $(async () => {
    await navigator.share({
      url: '//' + location.host + location.pathname,
      text: "Check out this post!"
    });
  });

  return (
    <div class="w-full flex flex-col">
      {props.post.preview_image && (
        <img class="h-60 object-cover object-center mx-auto" src={props.post.preview_image} alt="Image"/>
      )}

      <div class="md:p-6">
        <p class="text-[1.9rem] font-semibold">{props.post.title}</p>
        <div class="mb-4 flex flex-row items-baseline">
          <span class="text-gray-400">{props.post.timestamp?.toDateString()}</span>
          <button onClick$={sharePost} class="hover:translate-y-1 ml-4 border-[2px] border-[#5ca2ff] rounded-[10px] p-1 flex flex-row color text-[#5ca2ff]">
            Share
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="ml-2 h-6 w-6" viewBox="0 0 16 16">
              <path
                d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
            </svg>
          </button>
        </div>
        <p id="content-post" class="post-content">
        </p>
      </div>
    </div>
  );
});