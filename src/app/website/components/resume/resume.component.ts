import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  standalone: false
})
export class ResumeComponent {
  pdfSrc: string = 'https://api.juandiegows.com/resume/es/juandiegows/preview'; // URL del PDF

}
