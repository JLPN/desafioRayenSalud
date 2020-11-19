import { SortByPipe } from './pipes/sortByPipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AgregarComponent } from './components/agregar/agregar.component';
import { EditarComponent } from './components/editar/editar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AgregarComponent,
    EditarComponent,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
