import {component$} from "@builder.io/qwik";
import type {Post} from "~/model/post";

export default component$((props: { post: Post }) => {
  return (
    <div class="w-full flex flex-col">
      {props.post.preview_image != null && (
        <img class="h-60 object-cover object-center mx-auto" src={props.post.preview_image} alt="Image"/>
      )}
      <div class="p-6">
        <p class="text-[1.9rem] font-semibold" dangerouslySetInnerHTML={props.post.title}></p>
        <p class="text-gray-400 mb-4">{props.post.timestamp?.toDateString()}</p>
        <p dangerouslySetInnerHTML={props.post.content}></p>
      </div>
    </div>
  );
});