import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from '../message';
import { User } from '../user';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  message: Message;
  loginForm!: FormGroup;
  @Input() user: User;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private websocketservice: WebsocketService
  ) {}

  login() {
    /* this.user.username = this.loginForm.controls['username'].value;
    this.user.password = this.loginForm.controls['password'].value;
    this.user.role = 'user';
    // si le user existe
    this.message.messageType = 'JOIN';
    this.message.sender = this.user;
    this.websocketservice.connect(this.message);*/
  }

  goToRegister() {
    this.route.navigate(['register']);
  }

  goToSpaceUser(username: string) {
    this.route.navigate([`${username}/userspace`]);
  }
}
