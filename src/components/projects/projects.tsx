import {component$, h} from "@builder.io/qwik";
import type {Project} from "~/model/project";
import {getTagColor} from "~/data/projects-data";

export default component$((props: { projects: Project[] }) => {
  return (
    <div class="flex flex-row flex-wrap gap-4 [&>*]:basis-full [&>*]:lg:basis-[calc(50%-1rem)]">
      {props.projects.map((project) => {
        const ProjectTag = (project.link ? 'a' : 'div');
        return (
          <ProjectTag key={project.id} href={project.link ? project.link : undefined} target={project.link ? '_blank' : undefined}
               class={["flex rounded-2xl bg-[#6b5f8d52] border-[1px] border-[#0079ff66] box-border p-5 overflow-hidden",
                 project.link ? 'hover:translate-y-1' : '']}
               style="box-shadow: 2px 1px 13px 2px #0079ff75;">
            {project.preview_image && (
              <img class="object-contain shrink-0 h-40" src={project.preview_image} alt="Project Image"/>
            )}
            <div class={[project.preview_image ? 'md:pl-6' : '']}>
              <div class="flex flex-wrap gap-x-8">
                <span
                   class={[
                     "font-bold text-xl mb-2",
                     project.link ? "bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent" : ""
                   ]}>{project.name}</span>
                <span
                  class="bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{project.project_owner}</span>

              </div>
              <p class="text-base">
                {project.description}
              </p>
              <div class="flex flex-wrap gap-x-2 gap-y-1 pt-1">
                {project.tags.map((tag) => (
                  <span key={tag}
                        class={["rounded-md px-2 py-1 text-xs font-semibold"]}
                        style={`background-color: ${getTagColor(tag)}`}>{tag}</span>
                ))}
              </div>
            </div>
          </ProjectTag>
        )
      })}
    </div>
  );
});