import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SpaceuserComponent } from './spaceuser/spaceuser.component';
import { GroupchatComponent } from './groupchat/groupchat.component';

export const routes: Routes = [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
    
      {
        path: 'login',
        component: LoginComponent,
      },
    
      {
        path: 'register',
        component: RegisterComponent,
      },
    
      {
        path: ':username/userspace',
        component: SpaceuserComponent,
      },
    
      {
        path: ':username/groupchat',
        component: GroupchatComponent
      }
];
