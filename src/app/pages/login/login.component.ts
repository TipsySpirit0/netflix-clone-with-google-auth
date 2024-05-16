declare var google: any;
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{
  private router = inject(Router)
  ngOnInit(): void {
    google.accounts.id.initialize({
        client_id: '684533326474-15rdumg0lcj1e5kuolhotrpsmb3d24hq.apps.googleusercontent.com',
        callback: (resp: any)=>this.handleLogin(resp)
      });
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 280,
      })
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response: any){
    if(response){
      //decrypt
      const payLoad = this.decodeToken(response.credential);
      //store
      sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad));
      //navigate
      this.router.navigate(['browse'])
    }
  }
}
