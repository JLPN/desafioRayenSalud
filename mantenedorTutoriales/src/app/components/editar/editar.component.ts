import { Tutorial } from './../../models/tutorial.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  public titulo: string = 'Ver';
  public titulo2: string = 'Detalle Tutorial';
  public formulario: FormGroup;
  urlTutoriales: string = 'https://rayentutorialtestapp.azurewebsites.net/tutorials';
  urlAgregar: string = 'https://rayentutorialtestapp.azurewebsites.net/createtutorial';
  urlUpdate: string = 'https://rayentutorialtestapp.azurewebsites.net/updatetutorial';
  urlDelete: string = 'https://rayentutorialtestapp.azurewebsites.net/deletetutorial';
  public tituloTutorial;
  public profesor;
  public materia;
  public fecha;

  public id: number;
  public ver: boolean;
  constructor( private fb: FormBuilder, private http: HttpClient, private router: Router, private rutaActiva: ActivatedRoute) {
   }

  ngOnInit(): void {

    this.ver = true;
    this.id = this.rutaActiva.snapshot.params.id;
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.id = params.id;
      }
    );

    this.buscarTutorial().subscribe(
      (res: Tutorial) => {
          if (res === null) { return false; }
          this.tituloTutorial = res.nombre;
          this.profesor = res.profesor;
          this.materia = res.materia;
          this.fecha = res.fecha;
      },
      (err) => {
        console.log(err);
          alert('Ha ocurrido un error, intente nuevamente' + err.message);
          this.router.navigate([`/home`]);
      }
    );

    this.formulario = this.fb.group({});
    this.tituloTutorial = '';
    this.profesor = '';
    this.materia = '';
    this.fecha = '';
  }


  modificar(){
    if (this.tituloTutorial === '') return false;
    if (this.profesor == '') return false;
    if (this.materia == '') return false;
    if (this.fecha == '' ) return false;

    this.editarTutorial().subscribe(

      (res) => {
          if (res === null) { return false; }
          this.router.navigate([`/home`]);
      },
      (err) => {
        console.log(err);
          alert('Ha ocurrido un error, intente nuevamente' + err.message);
      }
    );
  }

  regresar(){
    this.router.navigate([`/home`]);
  }

  editarTutorial() {
    const datos = {
      "nombre" : this.tituloTutorial.toString(),
      "profesor": this.profesor.toString(),
      "materia": this.materia.toString(),
      "fecha": this.fecha.toString()
  };
    return this.http.put(`${this.urlUpdate}` + '/' + this.id, datos ,
     { headers: new HttpHeaders({
      'Content-Type': 'application/json'}),
     });
  }

  buscarTutorial(){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
     };
    return this.http.get(this.urlTutoriales + '/' + this.id, options);
}
  switchVer(){
    this.ver = false;
    this.titulo = 'Editar';
    this.titulo2 = 'Modificar Tutorial';
    return false;

  }

  async eliminarTutorial(){
    this.eliminar().subscribe((res: any) =>{
          this.regresar();
    }, err => {
      if(err.status == 401){
          alert('No hay datos');
      }
      else{
        alert('Algo ha ocurrido, intente nuevamente');
      }
    });
    return false;
  }

  eliminar(){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
     };
    return this.http.delete(this.urlDelete + '/' + this.id, options);
    }
}
