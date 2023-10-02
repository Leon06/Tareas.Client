import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';

const routes: Routes = [ 
  {
    path: '',
    redirectTo: 'lista-tareas', // Redirige la URL raiz a '/lista-tareas'
    pathMatch: 'full'
  },
  {
    path:'lista-tareas',
    component: TasksListComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
