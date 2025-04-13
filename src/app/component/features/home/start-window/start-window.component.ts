import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderHomeComponent } from "../../../shared/header-home/component/shared/header-home/header-home.component";

@Component({
  selector: 'app-start-window',
  imports: [CommonModule, RouterModule, HeaderHomeComponent],
  templateUrl: './start-window.component.html',
  styleUrl: './start-window.component.css'
})
export class StartWindowComponent {
  imgSrc: string = 'assets/images/escudo-cartagena.png';
  featuredItems = [
    {
      title: "Servicios Ciudadanos",
      description: "Accede a todos los servicios disponibles para los ciudadanos de Cartagena.",
      icon: "fa-solid fa-city",
    },
    {
      title: "Trámites en Línea",
      description: "Realiza tus trámites de manera rápida y segura sin salir de casa.",
      icon: "fa-solid fa-file-signature",
    },
    {
      title: "Noticias y Eventos",
      description: "Mantente informado sobre las últimas noticias y eventos en la ciudad.",
      icon: "fa-solid fa-newspaper",
    },
  ]
}
