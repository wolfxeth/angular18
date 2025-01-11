import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AuthService } from './auth-service.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  authService=inject(AuthService);
  router=inject(Router);

  ngOnInit(): void {
    this.authService.$user.subscribe(user=>{
      if(user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!
      });  
    }else{
      this.authService.currentUserSig.set(null);
    }
    console.log(this.authService.currentUserSig());
  });
}

// logout(){
//   this.authService.logoutcall().subscribe({
//     next: () => {
//       this.router.navigate(['/login']);
//       console.log('Logged out');

//     },
//     error: (error) => {
//       console.error('Logout failed:', error);
//     },
//   });
// }

}
