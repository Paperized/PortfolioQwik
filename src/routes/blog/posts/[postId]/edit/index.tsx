import {$, component$, QRL, useSignal, useVisibleTask$} from "@builder.io/qwik";
import {Form, routeAction$, routeLoader$, z, zod$} from "@builder.io/qwik-city";
import {db, ormDb} from "~/root";
import {PostTable} from "~/model/post";
import {eq} from "drizzle-orm";
import ViewPost from "~/components/view-post/view-post";

export const usePost = routeLoader$(async (requestEvent) => {
  const postId = +requestEvent.params.postId;
  const res = await ormDb.select().from(PostTable).where(eq(PostTable.id, postId));
  return res.length > 0 ? res[0] : null;
});

export const useEditPost = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get('token')?.value;
  if (!token || (await db.sql`SELECT token
                              FROM admin_token
                              WHERE token = ${token}
                                AND expires_at > CURRENT_TIMESTAMP`).rowCount == 0)
    return requestEvent.fail(401, {error: 'Unauthorized'});

  const res = await ormDb.update(PostTable).set(data).where(eq(PostTable.id, +requestEvent.params.postId)).returning({id: PostTable.id});
  return res.length > 0 ? res[0] : null;
}, zod$({
  preview_image: z.string().optional(),
  title: z.string().nonempty("Title cannot be empty"),
  content: z.string().nonempty("Description cannot be empty"),
  preview_content: z.string().nonempty("Preview description cannot be empty"),
}));

export const useDeletePost = routeAction$(async (_, requestEvent) => {
  const token = requestEvent.cookie.get('token')?.value;
  if (!token || (await db.sql`SELECT token
                              FROM admin_token
                              WHERE token = ${token}
                                AND expired_at > CURRENT_TIMESTAMP`).rowCount == 0)
    return requestEvent.fail(401, {error: 'Unauthorized'});

  const res = await ormDb.delete(PostTable).where(eq(PostTable.id, +requestEvent.params.postId)).returning({id: PostTable.id});
  return res.length > 0 ? res[0] : null;
});

export default component$(() => {
  const editPostAction = useEditPost();
  const deletePostAction = useDeletePost();
  const post = usePost();

  if (post.value == null) {
    return (
      <div class="flex flex-col md:w-10/12 mx-auto lg:p-10">
        <h2>Post does not exists!</h2>
      </div>
    );
  }

  const previewImage = useSignal(post.value.preview_image ?? '');
  const title = useSignal(post.value.title);
  const content = useSignal(post.value.content);
  const previewContent = useSignal(post.value.preview_content);
  const event: { onUpdateContent: QRL<(text: string) => void> | undefined } = { onUpdateContent: undefined };

  const refreshPreview = $(() => {
    if(event.onUpdateContent) event.onUpdateContent(content.value);
  });

  useVisibleTask$( () => {
    function typeInTextarea(newText: string, el = document.getElementById('content')) {
      if (!el) return;
      const elAsAny = el as any;
      const [start, end] = [elAsAny.selectionStart, elAsAny.selectionEnd];
      elAsAny.setRangeText(newText, start, end, 'select');
    }

    document.onkeydown = (e) => {
      if (e.key === 'q' && e.ctrlKey) {
        e.preventDefault();
        typeInTextarea(
          `<pre><code class="" unrendered>

</code></pre>`)
      }
    }
  }, {strategy: 'document-ready'});

  return (
    <div class="flex flex-col md:w-10/12 mx-auto lg:p-10">
      <div class="flex">
        <h2 class="text-3xl font-semibold mb-4">Edit Post</h2>
        <button onClick$={async () => {
          const {value} = await deletePostAction.submit();
          if (value.id != undefined)
            window.location.href = "/blog";
          //await nav('/blog');
        }}>Delete
        </button>
      </div>
      <Form class="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="preview-image-container">Preview Image URL</label>
          <div id="preview-image-container" class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm4 4l3 3 4-4M6.5 15l4 4L18 9"></path>
              </svg>
            </div>
            <input
              class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="preview_image" type="text" placeholder="Enter preview image URL" bind:value={previewImage}/>
          </div>
          {editPostAction.value?.failed && <p>{editPostAction.value.fieldErrors?.preview_image}</p>}
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="title">Title</label>
          <div id="preview-image-container" class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                   fill="currentColor">
                <path d="M8 3h4v2h2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5c0-1.1.9-2 2-2zm4 2H8v10h8V5h-4V3z"/>
                <path fill-rule="evenodd"
                      d="M3 8a1 1 0 011-1h2.586l9.707-9.707a1 1 0 011.414 0l2.586 2.586a1 1 0 010 1.414L8.414 14H6a1 1 0 01-1-1V8z"
                      clip-rule="evenodd"/>
              </svg>
            </div>
            <input
              class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="title" type="text" placeholder="Enter title" bind:value={title}/>
          </div>
          {editPostAction.value?.failed && <p>{editPostAction.value.fieldErrors?.title}</p>}
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="preview-description">Preview
            Description</label>
          <textarea
            class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="preview_content" placeholder="Enter preview description"
            bind:value={previewContent}></textarea>
          {editPostAction.value?.failed && <p>{editPostAction.value.fieldErrors?.preview_content}</p>}
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="description">Description</label>
          <textarea
            class="min-h-[10rem] block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="content" placeholder="Enter description" bind:value={content}  onChange$={refreshPreview}></textarea>
          {editPostAction.value?.failed && <p>{editPostAction.value.fieldErrors?.content}</p>}
        </div>
        {post.value?.id && <a href={"/blog/posts/" + post.value.id} target="_blank">View Post</a>}
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" onClick$={async () => {
            const {value} = await editPostAction.submit({
              title: title.value, content: content.value,
              preview_content: previewContent.value, preview_image: previewImage.value
            });
            if (value.id !== undefined) {
              window.location.href = "/blog/posts/" + value.id + "/edit";
              //await nav("/blog/posts/" + value.id + "/edit");
            }
          }}>
            Edit
          </button>
        </div>
      </Form>
      <span class="font-medium text-3xl pb-2">Preview Post</span>
      <div class="flex flex-col border-2 border-gray-800 p-2">
        <ViewPost post={{
          id: 0, title: title.value, content: content.value, preview_image: previewImage.value,
          timestamp: new Date(), preview_content: previewContent.value
        }} event={event}></ViewPost>
      </div>
    </div>
  );
});