import { Component, Input } from '@angular/core';
import { User } from '../user';
import { Message } from '../message';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Input() user: User;
  message: Message;
  registerForm: FormGroup;

  isSamePassword(c: AbstractControl): { [key: string]: boolean } | null {
    const passwordControl = c.get('password');
    const confirmPasswordControl = c.get('confirm_password');
    if (passwordControl?.pristine || confirmPasswordControl?.pristine) {
      return null;
    }
    if (passwordControl?.value == confirmPasswordControl?.value) {
      return null;
    } else {
      return { samePass: true };
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required]],
          confirm_password: ['', [Validators.required]],
        },
        { validators: this.isSamePassword }
      ),
    });
  }

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private websocketservice: WebsocketService
  ) {}

  goToLogin() {
    this.route.navigate(['login']);
  }

  goToSpaceUser(username: string) {
    this.route.navigate([`${username}/userspace`]);
  }

  register() {
    //créer un user avec les valeurs des inputs
    //connecter le nouveau user au chat avec webSocket
    //envoyer le user au serveur avec
    this.user = new User();
    this.user.username = this.registerForm.controls['username'].value;
    this.user.password = this.registerForm.get('passwordGroup.password')?.value;
    this.user.role = 'user';

    console.log(this.user);
    this.websocketservice.connect(this.user);
    this.goToSpaceUser(this.user.username);
  }
}
