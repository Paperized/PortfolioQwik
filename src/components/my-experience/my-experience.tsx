import {component$} from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex flex-wrap [&>*]:md:px-4 [&>*]:py-4 [&>*]:basis-full">
      <div class="flex md:!basis-1/2">
        <div class="timeline-badge bg-blue-500"></div>
        <div class="timeline-panel">
          <h4 class="text-lg font-semibold bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text">
            <a href="https://www.softhrod.com/" target="_blank" class="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Softhrod Srl &nbsp;
            </a>
            / 3m / Full-time Remote
          </h4>
          <p class="text-gray-600 pb-2">Oct 2022 - Dec 2022</p>
          <p>Crafted a distinctive Python-based web scraper using Selenium and AWS Lambda, this projects uses
            configuration files to describe pages and uses a custom scripting language to add logic inside those
            files.</p>
        </div>
      </div>
      <div class="flex md:!basis-1/2">
        <div class="timeline-badge bg-blue-500"></div>
        <div class="timeline-panel">
          <h4 class="text-lg font-semibold">
            <a href="https://www.arancia-ict.it/" target="_blank" class="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Arancia ICT &nbsp;
            </a>
            / 1y11m / Full-time
          </h4>
          <p class="text-gray-600 pb-2">Oct 2017 - Aug 2019</p>
          <p>Started and completed 3 projects in small teams using Agile methodology, Spring Boot, Angular and
            microservices in one project.</p>
          <p>Contributed in a complex project called "Registri" used by AIFA (Italian Medicines Agency).</p>
        </div>
      </div>
      <div class="flex">
        <div class="timeline-badge bg-blue-500"></div>
        <div class="timeline-panel">
          <h4 class="text-lg font-semibold">
            <a href="https://www.unipi.it/" target="_blank" class="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              University of Pisa &nbsp;
            </a>
            / Score: 100/110
          </h4>
          <p class="text-gray-600 pb-2">September 2019 - May 2023</p>
          <p>Algorithms and data structures, Computer Networking, Operative Systems, Databases, Software
            Engineering, Mobile Development, Introduction to AI and Machine Learning.</p>
        </div>
      </div>
    </div>
  )
    ;
});