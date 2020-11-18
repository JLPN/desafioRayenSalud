import { Tutorial } from './../../models/tutorial.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  public titulo: string = 'Agregar';
  public titulo2: string = 'Agregar Tutorial';
  public selectFiltro: any;
  public formulario: FormGroup;
  public tutoriales: Array<any>;
  urlTutoriales: string = 'https://rayentutorialtestapp.azurewebsites.net/tutorials';
  urlAgregar: string = 'https://rayentutorialtestapp.azurewebsites.net/createtutorial';
  public tituloTutorial;
  public profesor;
  public materia;
  public fecha;
  constructor( private fb: FormBuilder, private http: HttpClient, private router: Router) {
   }

  ngOnInit(): void {
    this.formulario = this.fb.group({});
    this.selectFiltro = 'titulo';
  }


  agregar(){

    this.agregarTutorial().subscribe(

      (res) => {
        console.log('paso');
        console.log(res);
          if (res === null) { return false; }
          this.router.navigate([`/home`]);
      },
      (err) => {
        console.log(err);
          alert('Ha ocurrido un error, intente nuevamente' + err.message);


      }
    );
  }

  agregarTutorial() {
    const datos = {
      "nombre" : this.tituloTutorial.toString(),
      "profesor": this.profesor.toString(),
      "materia": this.materia.toString(),
      "fecha": this.fecha.toString()
  };
  console.log(datos);
    return this.http.post(`${this.urlAgregar}`, datos ,
     { headers: new HttpHeaders({
      'Content-Type': 'application/json'}),
     });
  }

}
