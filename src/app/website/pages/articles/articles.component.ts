import { Component } from '@angular/core';
import { Lang, SettingService } from '../../services/setting.service';
import { ApiService } from '../../services/api.service';
import { PostInfo } from '../../models/info/PostInfo.model';
import { Post } from '../../models/Post.model';
import { BlogData } from '../../models/lang/blogData.model';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
    standalone: false
})
export class ArticlesComponent {
  message: String = '';
  blogs: PostInfo[] = [];
  blogList: Post[] = [];
  data: BlogData | null = null;

  constructor(
    private setting: SettingService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getPosts().subscribe({
      next: (d) => {
        if (d.status != 200) {
          this.blogList = d.data as Post[];
          this.fill();
        } else {
          this.message = 'Error al  intentar traer los datos desde el api.';
        }
      },
      error: (error) => {
        this.message = 'Error al  intentar conectar con el api.';
      },
    });

    this.setting.lang$.subscribe((d) => {
      this.data = this.setting.data.blog;
      this.fill();
    });
  }

  convertDate(date: string): string {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const partesFecha = date.split('-');
    const year = partesFecha[0];
    const month = parseInt(partesFecha[1]) - 1;
    const day = partesFecha[2];

    return `${parseInt(day)} ${months[month]} del ${year}`;
  }

  fill() {
    this.blogs = [];
    this.blogList.forEach((blog) => {
      if (this.setting.lang == Lang.en) {
        this.blogs.push({
          id: blog.id,
          title: blog.title,
          topics: blog.topics,
          url_image: blog.url_image,
          link: blog.link,
          date: blog.date,
          created_at: blog.created_at,
          updated_at: blog.updated_at,
        });
      } else {
        this.blogs.push({
          id: blog.id,
          title: blog.spanish_title,
          topics: blog.topics_spanish,
          url_image: blog.url_image,
          link: blog.link,
          date: blog.date,
          created_at: blog.created_at,
          updated_at: blog.updated_at,
        });
      }
    });
  }
}
