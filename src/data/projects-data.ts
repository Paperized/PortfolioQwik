import type {Project} from "~/model/project";

const project_list: Project[] = [];
project_list.push({
  name: "Alfred",
  description: "Alfred is a software that allows clients to web scrape any supported website by providing the url and custom data, the supported list of website is easily extendable by adding a new configuration file",
  tags: ["Python", "Web Scraping", "Selenium", "AWS Lambda", "Docker"], project_owner: "Softhrod Srl" });
project_list.push({
  name: "Instant", link: "https://www.instantinnovation.it/",
  description: "Application that allows users to take a picture of a point of interest and receive useful information regarding that point, the description obtained depends on the age of the user which will then be more simple or articulate",
  tags: ["Java", "Spring Boot", "Angular", "Google Maps API", "Microservices"], project_owner: "Arancia ICT" });
project_list.push({
  name: "JobMatch 2020", link: "https://www.arces.it/servizi-per-il-lavoro/jobmatch2020/",
  description: "JobMatch 2020 intends to fight the effects of the loss of competitiveness of the area (flight of human capital, weakening of the productive fabric and increase of low value added activities) by stemming the causes that determined them",
  tags: ["Java", "Spring Boot", "Angular"], project_owner: "Arancia ICT" });
project_list.push({
  name: "SRA",
  description: "SPA that allows employees to keep track of cars added to the system and add shifts, eventually publishing a PDF with all the information or sending e-mails to workers",
  tags: ["Java", "Spring Boot", "Angular"], project_owner: "Arancia ICT" });
project_list.push({
  name: "Registri",
  description: "Registri is a complex application that allows patients to prescribe drugs by taking a questionnaire that will evaluate if the patient is eligible for the drug, if the patient is eligible for the treatment",
  tags: ["Java 1.6", "JSF", "Oracle SQL"], project_owner: "Arancia ICT" });
project_list.push({
  name: "WINSOME", link: "https://github.com/Paperized/WINSOME",
  description: "Social network application using a CLI, it's divided in client and a multithreaded server, uses different communication protocols based on the performed action, each content generates virtual coins that are distribuited between creator and users that interact through likes and comments",
  tags: ["Java", "Multithread", "NIO Sockets", "RMI", "Multicast"], project_owner: "University Project" });
project_list.push({
  name: "FileStorageApplication", link: "https://github.com/Paperized/FileStorageApplication",
  description: "Application that allows users to store files in a server and interact with files in some cases locking them, the server is multithreaded and using local sockets, the client is a CLI that allows users to perform actions such as upload, download, delete and list files, in case of maximum capacity reached the server will delete some files based on a configurable replacement policy (FIFO, LFU, LRU) and send back the deleted files",
  tags: ["C", "Unix", "Multithread", "Makefile"], project_owner: "University Project" });
project_list.push({
  name: "LevelUp", link: "https://github.com/Paperized/LevelUp",
  description: "Android application that allows users to gamify their everyday tasks, there are manual tasks that and automatically tracked ones that interact with sensors or gps, the application also shows a profile stats with the experience acquired",
  tags: ["Java", "Android", "ROOM with LiveData", "Fragments", "GPS/StepCounter/MediaGallery"], project_owner: "University Project" });

export default function getProjects(): Project[] { return [...project_list]; }

const tagsColors: Map<string, string> = new Map();

const langColor = "#3776AB";
const libColor = "#ad677a";
const otherColor = "#b05ec8";

["Python", "Java", "Java 1.6", "C"].forEach((lang) => tagsColors.set(lang, langColor));
["Angular", "Selenium", "Spring Boot", "Google Maps API", "JSF",
  "Android", "ROOM with LiveData", "Fragments", "GPS/StepCounter/MediaGallery"].forEach((lib) => tagsColors.set(lib, libColor));
["Web Scraping", "AWS Lambda", "Docker", "Microservices", "Oracle SQL",
  "Multithread", "NIO Sockets", "RMI", "Multicast", "Unix", "Makefile"].forEach((other) => tagsColors.set(other, otherColor));

export const getTagColor = (tag: string): string => tagsColors.get(tag) || "#000000";