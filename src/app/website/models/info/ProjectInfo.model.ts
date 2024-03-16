import { FrontPageInfo } from "./FrontPageInfo.model";

export class ProjectInfo {
  id: number = 0;
  client_id: number | null = null;
  principal_project_id: number | null = null;
  front_page: FrontPageInfo = new FrontPageInfo();
  title: string = '';
  short_description: string = '';
  description: string = '';
  view_link: string = '';
  download_link: string = '';
  video_link: string | null = null;
  date: string = '';
  created_at: string = '';
  updated_at: string = '';
}
