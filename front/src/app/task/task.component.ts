import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../types/task.model';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() taskData!: Task;
  @Input() openDialogDelete!: (taskId: number) => void;
  @Input() openDialog!: (taskId: number, task?: Task) => void;
  @Input() completeTask!: (id: Task) => void;

  ngOnInit(): void {
  }

  open() {
    this.openDialogDelete(this.taskData.taskId);
  }

  openForUpdate() {
    this.openDialog(this.taskData.taskId, this.taskData)
  }

  complete() {
    this.completeTask(this.taskData);
  }
}