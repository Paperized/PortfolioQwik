import {component$} from "@builder.io/qwik";
import type {PreviewPost} from "~/model/post";
import {Link} from "@builder.io/qwik-city";

export default component$((props: { posts: PreviewPost[], containerClass?: string }) => {
  return (
    <div class={[
      "grid",
      props.containerClass == undefined ? "grid-cols-1 md:grid-cols-3 gap-6" : props.containerClass,
    ]}>
      {props.posts.map((post) => (
        <Link key={post.id} class="hover:translate-y-1" href={"/blog/posts/" + post.id}>
          <div class="overflow-hidden rounded-md bg-slate-800">
            {post.preview_image && (
              <div>
                <img class="w-full h-40 object-cover object-center"
                     src={post.preview_image}
                     alt="Image post" loading="lazy"/>
              </div>
            )}
            <div class="px-3 pt-4 pb-6 text-center"><h2 class="text-xl font-semibold"
                                                        dangerouslySetInnerHTML={post.title}></h2>
              <div class="mt-1 text-xs text-gray-400">{post.timestamp?.toDateString()}</div>
              <div class="mt-2 text-sm" dangerouslySetInnerHTML={post.preview_content}></div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
});