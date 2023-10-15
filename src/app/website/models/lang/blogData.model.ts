export interface BlogData {
  title: string;
  blogs: BlogEntry[];
  btn_text: string;
}

interface BlogEntry {
  url_image: string;
  date: string;
  title: string;
}
