export interface Task {
    id?: string;               
    title: string;           
    descripcion: string;     
    completado: boolean;
    fechaCreacion?: null;      
    fechaActualizacion?: null;
}
