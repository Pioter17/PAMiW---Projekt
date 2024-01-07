import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { LoginFormCreatorService } from '@pages/auth/services/login-form-creator.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent  implements OnInit { 
  form: FormGroup;

  formCreator = inject(LoginFormCreatorService);

  ngOnInit(): void {
    this.form = this.formCreator.getLoginForm();
  }

  register(){
    
  }

}
