import {component$} from "@builder.io/qwik";
import type {Project} from "~/model/project";

export default component$((props: { projects: Project[] }) => {
  return (
    <div class="flex flex-row flex-wrap gap-4 [&>*]:basis-full [&>*]:lg:basis-[calc(50%-1rem)]">
      {props.projects.map((project) => (
        <div key={project.id} class="flex bg-gray-700 p-5 rounded-2xl overflow-hidden shadow-lg">
          {project.preview_image && (
            <img class="object-contain shrink-0 h-40" src={project.preview_image} alt="Project Image"/>
          )}
          <div class="pl-6">
            <div class="flex">
              <a href={project.link ? project.link : undefined} target="_blank"
                 class={[
                   "font-bold text-xl mb-2",
                    project.link ? "bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent" : ""
                 ]}>{project.name}</a>
              <span
                class="bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 ml-5 mr-2 mb-2">{project.project_owner}</span>

            </div>
            <p class="text-base">
              {project.description}
            </p>
            <div class="flex flex-wrap gap-x-2 gap-y-1 pt-1">
              {project.tags.map((tag) => (
                <span key={tag}
                  class="rounded-md px-2 py-1 text-xs font-semibold bg-fuchsia-400 text-fuchsia-900">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});