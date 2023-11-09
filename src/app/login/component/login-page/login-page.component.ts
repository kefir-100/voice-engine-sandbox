import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.titleService.setTitle('Log In');
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public async onClickLogin() {
    if (this.loginForm.valid) {
      const isAuthUser = this.authService.authUser(this.loginForm.value.userName, this.loginForm.value.password);
      if (isAuthUser) {
        this.router.navigate(['/sandbox']);
      }
    }
  }
}
