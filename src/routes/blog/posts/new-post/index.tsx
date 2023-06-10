import {$, component$, QRL, useSignal} from "@builder.io/qwik";
import {Form, routeAction$, z, zod$} from "@builder.io/qwik-city";
import ViewPost from "~/components/view-post/view-post";
import {ormDb, db} from "~/root";
import {PostTable} from "~/model/post";

export const useNewPost = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get('token')?.value;
  if (!token || (await db.sql`SELECT token
                             FROM admin_token
                             WHERE token = ${token}
                               AND expires_at > CURRENT_TIMESTAMP`).rowCount == 0)
    return requestEvent.fail(401, {error: 'Unauthorized'});

  //return ormDb.insert(AdminTokenTable).values({token: token, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)}).returning({id: Admin});
  const res = await ormDb.insert(PostTable).values(data).returning({id: PostTable.id});
  return res[0];
}, zod$({
  preview_image: z.string().url("Preview image must be a valid URL"),
  title: z.string().nonempty("Title cannot be empty"),
  content: z.string().nonempty("Description cannot be empty"),
  preview_content: z.string().nonempty("Preview description cannot be empty"),
}));

export default component$(() => {
  const addPostAction = useNewPost();
  //const nav = useNavigate();
  const previewImage = useSignal('https://info.keylimeinteractive.com/hubfs/qwik%20vs%20react.png');
  const title = useSignal('New Title');
  const content = useSignal('Content');
  const previewContent = useSignal('Preview Content!');
  const event: { onUpdateContent: QRL<(text: string) => void> | undefined } = { onUpdateContent: undefined };

  const refreshPreview = $(() => {
    if(event.onUpdateContent) event.onUpdateContent(content.value);
  });

  return (
    <div class="flex flex-col md:w-10/12 mx-auto md:p-10">
      <h2 class="text-3xl font-semibold mb-4">Create New Post</h2>
      <Form class="shadow-md rounded pt-3 pb-6">
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
          {addPostAction.value?.failed && <p>{addPostAction.value.fieldErrors?.preview_image}</p>}
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
          {addPostAction.value?.failed && <p>{addPostAction.value.fieldErrors?.title}</p>}
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="preview-description">Preview
            Description</label>
          <textarea
            class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="preview_content" placeholder="Enter preview description" bind:value={previewContent}></textarea>
          {addPostAction.value?.failed && <p>{addPostAction.value.fieldErrors?.preview_content}</p>}
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="description">Description</label>
          <textarea
            class="min-h-[10rem] block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="content" placeholder="Enter description" bind:value={content} onChange$={refreshPreview}></textarea>
          {addPostAction.value?.failed && <p>{addPostAction.value.fieldErrors?.content}</p>}
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" onClick$={async () => {
            const {value} = await addPostAction.submit({
              title: title.value, content: content.value,
              preview_content: previewContent.value, preview_image: previewImage.value
            });
            if (value.id !== undefined) {
              window.location.href = "/blog/posts/" + value.id + "/edit";
              //await nav("/blog/posts/" + value.id + "/edit");
            }
          }}>
            Create
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