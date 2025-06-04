import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blogAppAngular';
}



// import { NgModule } from '@angular/core';
// import { JwtModule } from '@auth0/angular-jwt';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from './authentication.interceptor';
// import { AppComponent } from './app.component';
// import { TestcomponentComponent } from './testcomponent/testcomponent.component';
// import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule } from '@angular/forms';
// import { HomeComponent } from './home/home.component';

// export function tokenGetter() {
//     return localStorage.getItem('access_token');
// }

// @NgModule({
//     declarations:[
//         AppComponent,
//         TestcomponentComponent,
//         HomeComponent
//     ],
//     imports: [
//         ReactiveFormsModule,
//         BrowserModule,
//         JwtModule.forRoot({
//             config: {
//                 tokenGetter: tokenGetter,
//                 allowedDomains: ['your-api-domain.com'],
//                 disallowedRoutes: ['your-api-domain.com/api/token/'],
//             },
//         }),
//     ],
//     providers: [
//         {
//             provide: HTTP_INTERCEPTORS,
//             useClass: AuthInterceptor,
//             multi: true,
//         },
//     ],
//     bootstrap:[AppComponent]
// })
// export class AppModule {}