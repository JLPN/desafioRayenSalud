import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public titulo: string = 'Home';
  public selectFiltro: any;
  public formulario: FormGroup;
  public tutoriales: Array<any>;
  public filtro: string;
  urlTutoriales: string = 'https://rayentutorialtestapp.azurewebsites.net/tutorials';
  urlDeleteTutoriales: string = 'https://rayentutorialtestapp.azurewebsites.net/deletetutorials';
  urlBuscar: string = 'https://rayentutorialtestapp.azurewebsites.net/tutorial?description=';

  constructor( private fb: FormBuilder, private http: HttpClient, private router: Router) {
   }

  ngOnInit(): void {
    this.formulario = this.fb.group({});
    this.selectFiltro = 'titulo';
    this.filtro = '';

    this.buscarTutoriales().subscribe((res: any) =>{
      this.tutoriales = res || [];
  }, err => {
      if(err.status == 401){
          alert('No hay datos');
      }
      else{
        alert('Algo ha ocurrido, intente nuevamente');
      }
  });

  }

  updateFiltro()
  { const parametro = this.selectFiltro;

    return false;
  }

  buscarTutoriales(){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
     };
    return this.http.get(this.urlTutoriales, options);
}
  async eliminarTodos(){
    this.eliminarTodo().subscribe((res: any) =>{
      this.tutoriales = res || [];
    }, err => {
      if(err.status == 401){
          alert('No hay datos');
      }
      else{
        alert('Algo ha ocurrido, intente nuevamente');
      }
    });
    this.buscarTutoriales();
    return false;
  }
  eliminarTodo(){
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
   };
  return this.http.delete(this.urlDeleteTutoriales, options);
  }
  agregar(){
    this.router.navigate([`/agregar`]);

  }

  valueAscOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): any => {
    return a.value.localeCompare(b.value);
  }

  editar(id: number){
    this.router.navigate([`/editar/` + id]);
  }

  buscar(){
    this.buscarDescripcion().subscribe((res: any) =>{
      this.tutoriales = res || [];
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

  buscarDescripcion(){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
     };
    return this.http.get(this.urlBuscar + this.filtro, options);
}
}
