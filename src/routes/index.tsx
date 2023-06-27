import {component$, useSignal} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import {routeLoader$} from "@builder.io/qwik-city";

import Projects from '~/components/projects/projects';
import PostList from "~/components/post-list/post-list";
import MyExperience from "~/components/my-experience/my-experience";
import getProjects from "~/data/projects-data";
import {PreviewPost} from "~/model/post";
import {db} from "~/root";

export const useLatestPostsLoader = routeLoader$(async () => {
  const {rows} = await db.sql`SELECT id, title, timestamp, preview_image, preview_content
                              FROM post
                              ORDER BY timestamp DESC
                              LIMIT 6`;

  return rows as PreviewPost[];
});

export default component$(() => {
  const projects = useSignal(getProjects());
  const posts = useLatestPostsLoader();
  return (
    <div class="flex flex-col md:w-10/12 mx-auto lg:p-10">
      <div id="introduction" class="flex flex-col items-center md:flex-row md:justify-between md:gap-x-24 pt-5 pb-20 md:pt-20">
        <div>
          <p class="text-3xl font-bold pb-1">Hi there, I'm
            <span class="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent"> Ivan</span>!
          </p>
          <p class="text-xl leading-9">
            As a software developer with around 1.5 years of experience, I am eager to continue building my skills and
            contributing to impactful projects.
            With a focus on backend development and proficiency in programming languages such as Java, C#, and
            JavaScript, I have a strong foundation in web development and a passion for solving complex problems, I have
            a strong knowledge of C# and I'm currently learning .NET backend technologies.
          </p>
          <div class="ml-3 flex gap-1">
            <a class="hover:translate-y-1" href="https://www.linkedin.com/in/ivan-lo-greco/" target="_blank">
              <img class="h-12 w-12" src="/linkedin-icon.png" alt="Linkedin"/>
            </a>
            <a class="hover:translate-y-1" href="https://github.com/Paperized" target="_blank">
              <img class="h-11 w-11" src="/github-icon.png" alt="Github"/>
            </a>
          </div>
        </div>
        <div class="shrink-0">
          <img class="h-80 w-64" src="/avatar.svg" alt="Image Avatar"/>
        </div>
      </div>
      <div id="experiences" class="py-10">
        <p class="text-3xl font-bold pb-5">
          My &nbsp;
          <span class="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">Experiences</span>
        </p>
        <MyExperience></MyExperience>
      </div>
      <div id="projects" class="py-10">
        <p class="text-3xl font-bold pb-5">
          My &nbsp;
          <span class="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">Projects</span>
        </p>
        <Projects projects={projects.value}></Projects>
      </div>
      <div id="latest-posts" class="py-10">
        <p class="text-3xl font-bold pb-5">Latest &nbsp;
          <span class="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">Posts</span>
        </p>
        <PostList posts={posts.value ?? []}></PostList>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Paperized - Ivan Lo Greco',
  meta: [
    {
      name: 'description',
      content: 'Portfolio and Blog of Paperized (Ivan Lo Greco). Read about my blog posts and projects, everything related to IT, Programming and more.',
    },
    {
      name: 'og:type',
      content: 'website',
    }
  ],
};
