import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AuthService } from './auth-service.service';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  authService=inject(AuthService);
  router=inject(Router);
  // injected only so its constructor runs and applies the saved/system theme before first paint
  private themeService=inject(ThemeService);

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
