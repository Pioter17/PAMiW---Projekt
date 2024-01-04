import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { PathRoutes } from '@core/constants/routes.const';
import { Director } from '@core/interfaces/director';
import { MovieDTO, MovieDialogData } from '@core/interfaces/movie';
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
  id: any;

  private movieFormCreatorService = inject(MovieFormCreatorService);
  private apiDirectorService = inject(ApiDirectorService);
  private api = inject(ApiMovieService);
  private router = inject(Router);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idParam = params['id?'];
      this.id = idParam!=="" ? +idParam : undefined; 
  
      this.apiDirectorService.getAllDirectors().subscribe((res) => {
        this.directors = res;  
      });
  
      this.form = this.movieFormCreatorService.getMovieForm();
      
      if (this.id !== undefined) {
        this.api.getMovieById(this.id).subscribe((res) => {
          let data: MovieDTO = {
            name: res.name,
            director_id: res.director.id,
            producer: res.producer,
            length: res.length,
            rating: res.rating,
          }
          this.form.patchValue(data);
          this.isEdit = true;
          if (this.isEdit) {
            const { ...response } = res;
            this.isSame$ = merge(
              of(true),
              this.form.valueChanges.pipe(
                map(() => isEqual(response, this.form.value)),
              )
            );
          } else {
            this.isSame$ = of(false);
          }
        });
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
    if (this.id === undefined) {
      this.api.postMovie(newMovie).subscribe(()=>{
        this.router.navigateByUrl(PathRoutes.HOME);
      });
    } else {
      this.api.putMovie(this.id, newMovie).subscribe(()=>{
        this.router.navigateByUrl(PathRoutes.HOME);
      });
    }
  }

  onCancelClose() {
    this.router.navigateByUrl(PathRoutes.HOME);
  }
}