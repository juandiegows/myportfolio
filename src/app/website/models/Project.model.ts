import { FrontPage } from "./FrontPage.model";
import { Topic } from "./Topic.model";

export class Project {
  id: number = 0;
  client_id: number | null = null;
  principal_project_id: number | null = null;
  front_page: FrontPage = new FrontPage();
  title: string = '';
  spanish_title: string = '';
  short_description: string = '';
  spanish_short_description: string = '';
  description: string = '';
  spanish_description: string = '';
  topics: Topic[]=[];
  view_link: string = '';
  download_link: string = '';
  video_link: string | null = null;
  date: string = '';
  created_at: string = '';
  updated_at: string = '';
}
