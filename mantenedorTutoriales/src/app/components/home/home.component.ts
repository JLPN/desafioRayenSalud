import { Tutorial } from './../../models/tutorial.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

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
  urlTutoriales: string = 'https://rayentutorialtestapp.azurewebsites.net/tutorials';
  urlDeleteTutoriales: string = 'https://rayentutorialtestapp.azurewebsites.net/deletetutorials';

  constructor( private fb: FormBuilder, private http: HttpClient, private router: Router) {
   }

  ngOnInit(): void {
    this.formulario = this.fb.group({});
    this.selectFiltro = 'titulo';

    this.buscarTutoriales().subscribe((res: any) =>{
      console.log(res);
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

  updateFiltro(parametro: string)
  {
    console.log(this.selectFiltro);
    console.log(parametro);
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
}
