import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../user';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../websocket.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-groupchat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './groupchat.component.html',
  styleUrl: './groupchat.component.css'
})
export class GroupchatComponent {
  chatForm: FormGroup;
  username: string | null;
  users: User[] = [];
  auser: User | undefined = new User();
  private messageSubscription: Subscription;

  ngOnInit() {
    this.chatForm = this.fb.group({
      message: ['', Validators.required],
    });
    this.username = this.router.snapshot.paramMap.get('username');
    this.updateUsers();
    this.getInstantMessage();
  }

  constructor(
    private fb: FormBuilder,
    private websocketService: WebsocketService,
    private router: ActivatedRoute,
    private userService: UserService
  ) {}
  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  sendMessageToAllUsers() {
    if (this.chatForm.valid && this.users && this.username) {
      this.auser = this.users.find((user) => this.username == user.username);
      if (this.auser) {
        this.websocketService.sendMessage(
          this.chatForm.controls['message'].value,
          this.auser
        );
        this.chatForm.controls['message'].reset();
      } else {
        console.log('Utilisateur non trouvé');
      }
    } else {
      console.log('Formulaire invalide ou utilisateurs non chargés');
    }
  }

  getInstantMessage() {
    this.messageSubscription = this.websocketService
      .getMessage()
      .subscribe((msg) => {
        const chatMessage = document.getElementById('chat-messages');
        if (msg) {
          let msgElement: HTMLElement = document.createElement('p');
          let usernameText = document.createTextNode(msg.sender.username + ": ");
          msgElement.appendChild(usernameText);
          let msgText = document.createTextNode(msg.content);
          msgElement.appendChild(msgText);
          chatMessage?.appendChild(msgElement);
        }
      });
  }

  updateUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      console.table(this.users);
    });
  }
}
