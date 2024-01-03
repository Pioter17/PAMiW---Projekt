import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { PathRoutes } from '@core/constants/routes.const';
import { Director } from '@core/interfaces/director';
import { MovieDialogData } from '@core/interfaces/movie';
import { ApiDirectorService } from '@pages/home/services/api-director.service';
import { ApiMovieService } from '@pages/home/services/api-movie.service';
import { MovieFormCreatorService } from '@pages/home/services/movie-form-creator.service';
import { isEqual } from 'lodash';
import { Observable, map, merge, of } from 'rxjs';

@Component({
  selector: 'app-add-movie-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDialogActions,
    MatSelectModule,
    MatInputModule
  ],
  providers: [
    MovieFormCreatorService,
    ApiDirectorService
  ],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMovieComponent implements OnInit{
  isSame$: Observable<boolean>;
  form: FormGroup;
  isEdit: boolean;
  directors: Director[] = [];
  id: number | undefined;

  private movieFormCreatorService = inject(MovieFormCreatorService);
  private apiDirectorService = inject(ApiDirectorService);
  private api = inject(ApiMovieService);
  private router = inject(Router);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +this.route.snapshot.params['id'];
      console.log(id)
      this.apiDirectorService.getDirectors().subscribe((res) => {
        res.content.forEach((elem) => {
          this.directors.push(elem);
        })
      })
      this.form = this.movieFormCreatorService.getMovieForm();
      if(this.id != undefined) {
        this.api.getMovieById(this.id).subscribe((res)=>{
          this.form.patchValue(res);
          this.isEdit = true;
          if (this.isEdit) {
            const { ...response } = res
            this.isSame$ = merge(
              of(true), this.form.valueChanges.pipe(
                map(() => isEqual(response, this.form.value)),
              ))
          } else {
            this.isSame$ = of(false);
          }
        })
        
      }
    });
    
  }

  onAddClose() {
    const formResult = this.form.value;
    let newMovie : MovieDialogData = {
      name: formResult.name,
      director_id: formResult.director_id,
      producer: formResult.producer,
      rating: formResult.rating,
      length: formResult.length,
      isEdit: this.isEdit
    };

    this.form.reset();
    if (true) {
      this.api.postMovie(newMovie).subscribe(()=>{
        this.router.navigateByUrl(PathRoutes.HOME);
      });
    } else {
      // this.api.putMovie(this.id, newMovie).subscribe(()=>{
      //   this.router.navigateByUrl(PathRoutes.HOME);
      // });
    }
    // this.dialogRef.close(newMovie);
  }

  onCancelClose() {
    this.router.navigateByUrl(PathRoutes.HOME);
  }
}