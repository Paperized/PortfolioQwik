import {$, component$, QRL, useVisibleTask$} from "@builder.io/qwik";
import type {Post} from "~/model/post";

export default component$((props: { post: Post, event?: { onUpdateContent: QRL<(text: string) => void> | undefined } }) => {

  useVisibleTask$(() => {
    const updateContentText = $((text: string) => {
      console.log(text);
      const contentElement = document.getElementById('content-post')!;
      contentElement.innerHTML = text;
      const targetElements = contentElement.querySelectorAll('[unrendered]');

      targetElements.forEach((element) => {
        console.log(element.innerHTML);
        element.textContent = element.innerHTML;
      });
    });

    if(props.event !== undefined) {
      props.event.onUpdateContent = updateContentText;
    }

    updateContentText(props.post.content);
  }, {strategy: 'document-ready'});

  return (
    <div class="w-full flex flex-col">
      {props.post.preview_image && (
        <img class="h-60 object-cover object-center mx-auto" src={props.post.preview_image} alt="Image"/>
      )}
      <div class="md:p-6">
        <p class="text-[1.9rem] font-semibold">{props.post.title}</p>
        <p class="text-gray-400 mb-4">{props.post.timestamp?.toDateString()}</p>
        <p id="content-post"></p>
      </div>
    </div>
  );
});