import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Director } from '@core/interfaces/director';
import { ApiDirectorService } from '@pages/home/services/api-director.service';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-display-directors',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ConfirmationDialogComponent,
    HttpClientModule
  ],
  providers: [
    ApiDirectorService
  ],
  templateUrl: './display-directors.component.html',
  styleUrl: './display-directors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayDirectorsComponent { 
  show = false;
  filtered = false;
  directors: Observable<Director[]>;
  search: string;

  private dialog = inject(MatDialog)

  api = inject(ApiDirectorService);

  showDirectors(){
    this.show = true;
  }

  hideDirectors(){
    this.show = false;
  }

  getDirectors(){
    this.search = "";
    this.filtered = false;
    this.directors = new Observable;
    this.directors = this.api.getDirectors()
    this.showDirectors();
  }

  getFilteredDirectors(){
    this.filtered = true;
    this.directors = this.api.getFilteredDirectors(this.search);
  }

  addDirector(){
    // const dialogRef = this.dialog.open(AddDirectorDialogComponent, {
    //   minWidth: '400px',
    //   minHeight: '300px',
    // });

    // dialogRef.afterClosed().pipe(
    //   filter((res) => !!res),
    // ).subscribe((res) => {
    //   this.api.postDirector(res).subscribe(
    //     (response) => {
    //       let newDirector: Director = response;
    //       this.directors.push(newDirector);
    //     },);
    // });
  }

  updateDirector(id: number, index: number){
    // const dialogRef = this.dialog.open(AddDirectorDialogComponent, {
    //   minWidth: '400px',
    //   minHeight: '300px',
    //   data:{
    //     ...this.directors[index],
    //     isEdit: true,
    //   }
    // });

    // dialogRef.afterClosed().pipe(
    //   filter((res) => !!res),
    // ).subscribe((res) => {
    //   this.api.putDirector(id, res).subscribe(
    //     (response) => {
    //       let newDirector: Director = response;
    //       this.directors[index] = newDirector;
    //       console.log('Film został zedytowany');
    //     }
    //   )
    // });
  }

  deleteDirector(id: number, index: number){
    // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //   minWidth: '200px',
    //   minHeight: '100px',
    // });

    // dialogRef.afterClosed().pipe(
    //   filter((res) => !!res),
    // ).subscribe(() => {
    //   this.api.deleteDirector(id).subscribe(
    //     (response) => {
    //       console.log('Film został usunięty');
    //     },);
    //   // this.directors.splice(index, 1);
    //   this.getDirectors();
    // });
  }
}
