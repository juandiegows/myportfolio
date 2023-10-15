import { Component } from '@angular/core';
import { BlogData } from '../../models/lang/blogData.model';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {
  constructor(private setting: SettingService) {

  }
  data: BlogData | null = null

  ngOnInit(): void {
    this.setting.lang$.subscribe(d => {
      this.data = this.setting.data.blog;
    })
  }

}
