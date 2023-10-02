import { Task } from "./task.model";

export interface PagedTasksResponse {
    data: Task[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
}
