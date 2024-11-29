import { Component } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-spaceuser',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './spaceuser.component.html',
  styleUrl: './spaceuser.component.css'
})
export class SpaceuserComponent {
  users: User[];
  user: User = new User();
  username: string | null;

  constructor(
    private websocketService: WebsocketService,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.username = this.router.snapshot.paramMap.get('username');
  }
  ngOnInit() {
    this.onUserRegistered();
  }

  onUserRegistered() {
    this.websocketService.onUserRegistered().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  goToGroupChat() {
    this.route.navigate([`${this.username}/groupchat`]);
  }
}
