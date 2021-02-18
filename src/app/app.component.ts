import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public nombreUsuario: string = '';
  public rol;
  public usuarioAdmin: string = 'andres';
  public usuarioCoordin: string = 'walter';
  public informacionCorrecta: boolean = false;
  public logueado: boolean = false;
  title = 'PruebaQuickAndresBorbon';

  chequearInfo() {
    console.log(this.nombreUsuario);
    if (this.rol == 'administrador') {
      if (this.usuarioAdmin.toLowerCase() == this.nombreUsuario.toLowerCase()) {
        this.informacionCorrecta = true;
        return false;
      } else {
        this.informacionCorrecta = false;
      }
    } else if (this.rol == 'coordinador') {
      if (this.usuarioCoordin.toLowerCase() == this.nombreUsuario.toLowerCase()) {
        this.informacionCorrecta = true;
        return false;
      } else {
        this.informacionCorrecta = false;
      }
    } 
  }

  login() {
    this.logueado = true;
  }  

  logout() {
    this.logueado = false;
    this.nombreUsuario = '';
    this.rol = '0';
  }
}

