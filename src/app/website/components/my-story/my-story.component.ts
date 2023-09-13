import { Component } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-my-story',
  templateUrl: './my-story.component.html',
  styleUrls: ['./my-story.component.scss']
})
export class MyStoryComponent {
  data = {
    "title": "Mi Historia"
  };
  constructor(private setting: SettingService) {


  }
  ngOnInit(): void {
    this.setting.lang$.subscribe(d => {
      this.data = this.setting.data.myStory;
    })
  }
}
