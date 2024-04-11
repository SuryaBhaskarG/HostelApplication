import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:'',
  }
  constructor(private snack:MatSnackBar, private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("Login button clicked");
    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
      this.snack.open("Username is required !!",'OK',{duration:3000});
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
      this.snack.open("Password is required !!",'OK',{duration:3000});
      return;
    }
    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('success');
        console.log(data);

        //Login..
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);

            //redirect ...ADMIN:admin-dashboard
            if(this.login.getUserRole()=="ADMIN"){
              //admin dashboard
              // window.location.href='/admin-dashboard';
              this.login.loginStatusSubject.next(true);
              this.router.navigate(['/admin-dashboard'])
              .then(() => {
                window.location.reload();
              });
            }
            else if(this.login.getUserRole()=="NORMAL"){
              //normal user dashboard
              // window.location.href='/user-dashboard';
              this.login.loginStatusSubject.next(true);
              this.router.navigate(['/user-dashboard'])
              .then(() => {
                window.location.reload();
              });
            }
            else{
              this.login.logout();
            }
          }
        );
      },
      (error)=>{
        console.log('Error!');
        console.log(error);
        this.snack.open('Invalid Details! Try again','OK',{
          duration:3000,
        })
      }
    )
  }
}
