import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import { Message } from './message';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient: Client;
  private connected: boolean = false;

  // Subject pour signaler quand la connexion est établie
  private connectionSubject = new Subject<boolean>();
  private userRegisteredSubject = new Subject<User[]>(); // Émettre la liste d'utilisateurs
  private contentSubject = new Subject<Message>();

  constructor(private userService: UserService) {}

  connect(user: User) {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = new Client({
      webSocketFactory: () => socket as any,
      debug: function (str: any) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.stompClient.onConnect = () => {
      const message: Message = {
        content: `${user.username} joined the chat`,
        sender: user,
        messageType: 'JOIN',
        id: 0
      };

      this.stompClient.publish({
        destination: '/app/chat.registerUser',
        body: JSON.stringify(message),
      });

      console.log('WebSocket connexion is successful !!');
      this.connected = true;
      this.stompClient.subscribe('/topic/public', (msg) => {
        this.onMessageReceived(msg);
      });

      // Notifier les abonnés que la connexion est établie
      this.connectionSubject.next(true);
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.activate();
  }

  private onMessageReceived(payload: IMessage) {
    const message: Message = JSON.parse(payload.body);
    console.log('Message received:', message);
    console.log('Message Type: ' + message.messageType);

    if (message.messageType === 'JOIN') {
      // Ajouter le nouvel utilisateur à la liste
      // Émettre la liste mise à jour
      this.userService
        .getAllUsers()
        .subscribe((users: User[]) => this.userRegisteredSubject.next(users));
      console.log(message.sender.username + ' joined !');
    } else if (message.messageType === 'CHAT') {
      this.contentSubject.next(message);
    }
  }

  sendMessage(content: string, sender: User) {
    if (!this.connected) {
      console.error('WebSocket is not connected');
      return;
    }

    const message: Message = {
      content: content,
      sender: sender,
      messageType: 'CHAT',
      id: 0,
    };

    this.stompClient.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(message),
    });
  }

  // Ajout d'une méthode pour envoyer l'utilisateur enregistré
  registerUser(user: User) {
    if (!this.connected) {
      console.error('WebSocket is not connected');
      return;
    }

    const message: Message = {
      content: `${user.username} joined the chat`,
      sender: user,
      messageType: 'JOIN',
      id: 0,
    };

    this.stompClient.publish({
      destination: '/app/chat.registerUser',
      body: JSON.stringify(message),
    });
  }

  // Permet de s'abonner aux notifications de connexion
  onConnect() {
    return this.connectionSubject.asObservable();
  }

  onUserRegistered() {
    return this.userRegisteredSubject.asObservable();
  }

  getMessage() {
    return this.contentSubject.asObservable();
  }  
}
