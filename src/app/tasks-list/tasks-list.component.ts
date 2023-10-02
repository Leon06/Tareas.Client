import { Task } from './../models/task.model';
import { Component, OnInit } from '@angular/core';
import { TasksListService } from '../services/tasks-list.service';
import { ToastrService } from 'ngx-toastr';
import { PagedTasksResponse } from '../models/pagedTasksResponse.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  taskForm: FormGroup;
  paginaActual: number = 1;
  paginas: number[] = [];
  pagedResponse!: PagedTasksResponse;
  editingTaskId: string | null = null;
  allTask: Task[] = [];  
  addTask: Task = {    
    title: '',
    descripcion: '',
    completado: false      
  };

  constructor(private taskListService: TasksListService, private toastr: ToastrService, private fb: FormBuilder){
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getPagedTasks();
  }

  getAllTask(){
    this.taskListService.getAllTask().subscribe(resp =>{
      this.allTask = resp;      
    });
  }
  
  editTask(task: Task){
    this.taskListService.editTask(task).subscribe(updatedTask =>{
      const index = this.pagedResponse.data.findIndex(t => t.id === updatedTask.id);
      if (index !== -1 )
      {        
        this.pagedResponse.data[index]  = {...updatedTask};
      }
      // limpio el ID de edición para volver a la vista normal
      this.editingTaskId = null;

    });
  }


  startEditing(task: Task) {
    this.editingTaskId = task.id!;
  }
  
  cancel(){
    this.editingTaskId = null;
  }

  deleteTask(taskId: string){    
    if(taskId != null){
      this.taskListService.deleteTaskById(taskId).subscribe(response => {
        if(response){
          this.toastr.success('Tarea eliminada exitosamente.');
          this.pagedResponse.data = this.pagedResponse.data.filter(t => t.id !== taskId); //conservar solo aquellas tareas cuyo ID es diferente del taskId
          this.getPagedTasks();
        }else{
          this.toastr.error('Hubo un error al eliminar la tarea.');
        }
      });
    }

  }

  agregarTarea() {  
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      this.taskListService.saveTask(task).subscribe(data => {  
        this.getPagedTasks();      
        this.taskForm.reset();
      });
    }
  }

  getPagedTasks(pageIndex: number = 1, pageSize: number = 3){
    this.taskListService.getPagedTasks(pageIndex, pageSize).subscribe(resp => {
      this.pagedResponse = resp;

       // Aquí es donde llenamos el arreglo 'paginas' con base en la respuesta.
      this.paginas = Array.from({length: this.pagedResponse.totalPages}, (_, i) => i + 1);
      this.allTask = resp.data;
    });
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina < 1 || nuevaPagina > this.pagedResponse.totalPages) {
        // Si la nueva página está fuera del rango permitido, simplemente regresa.
        return;
    }
    this.paginaActual = nuevaPagina;
    // Llama a la función para obtener las tareas de la nueva página.
    this.getPagedTasks(this.paginaActual, 3);  
  }

  
 

}
