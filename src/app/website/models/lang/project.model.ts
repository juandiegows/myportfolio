export interface Project {
  title: string;
  text: string;
  items: Array<{
    url_image: string;
    text: string;
  }>;
  projects: Array<{
    name: string;
    count_star: number;
    url_git: string;
    url_details: string;
    url_preview: string;
    url_images: string[];
  }>;
  btn_text: string;
}
