import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeChangerService } from '@core/services/theme-changer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  theme: Observable<string>;
  themeChangerService = inject(ThemeChangerService);

  ngOnInit(): void {
    this.theme = this.themeChangerService.getTheme();
  }
}
