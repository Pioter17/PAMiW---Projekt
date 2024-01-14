import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Director } from '@core/interfaces/director';
import { TranslocoModule } from '@ngneat/transloco';
import { ApiDirectorService } from '@pages/home/services/api-director.service';

@Component({
  selector: 'app-display-directors',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  providers: [
    ApiDirectorService
  ],
  templateUrl: './display-directors.component.html',
  styleUrl: './display-directors.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayDirectorsComponent implements OnInit{
  show = false;
  filtered = false;
  directors: Director[] = [];
  search: string;
  page: number;
  allPages: number = 4;

  api = inject(ApiDirectorService);

  ngOnInit(): void {
    this.page = 1;
    // this.getDirectors();
  }

  getDirectors() {
    this.search = "";
    this.filtered = false;
    this.directors = [];
    this.api.getDirectors(this.page - 1).subscribe((res) => {
      res.content.forEach((elem) => {
        this.directors.push(elem);
      });
      this.allPages = res.totalPages;
    });
  }

  getPreviousDirectors() {
    this.page -= 1;
    this.getDirectors();
  }

  getNextDirectors() {
    this.page += 1;
    this.getDirectors();
  }

  getFilteredDirectors(){
    this.filtered = true;
    this.directors = [];
    this.page = 1;
    this.api.getFilteredDirectors(this.search).subscribe((res) => {
      res.content.forEach((elem) => {
        this.directors.push(elem);
      });
      this.allPages = res.totalPages;
    });
  }
}
