import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../header/header.component';
import { TaskComponent } from '../task/task.component';
import { FormTaskComponent } from '../form-task/form-task.component';
import { DialogComponent } from '../dialog/dialog.component';

import { User } from '../types/user.model';
import { Task, NewTask } from '../types/task.model';

import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuhtService } from '../services/auht-service.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    TaskComponent,
    FormTaskComponent,
    DialogComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'

})
export class HomeComponent {
  @ViewChild('dialogTask') dialog!: DialogComponent;
  @ViewChild('dialogTaskDelete') dialogDelete!: DialogComponent;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private toastr: ToastrService,
    private authService: AuhtService
  ) { }

  tasks: Task[] = [];
  user: User = {
    userId: '',
    email: '',
    name: '',
    creationDate: ''
  };
  selectedTaskForUpdate: Task | undefined = undefined;
  selectedTask: number = 0

  ngOnInit(): void {
    this.authService.refrechToken();
    this.getAllTasks();
    this.userService.getUser().subscribe((user: User) => {
      this.user = user;
    })
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe((tasks: Task[]) => {
      const newList = tasks.map(element => {
        const formatedDate = new Date(element.dueDate).toLocaleDateString();
        return { ...element, dueDate: formatedDate };
      });
      const test = newList.sort((a: Task, b: Task) => {
        if (a.isCompleted && !b.isCompleted) return 1;
        if (!a.isCompleted && b.isCompleted) return -1;
        return 0;
      });
      this.tasks = test;
    });
  }


  openDialog(taskId?: number, task?: Task) {
    console.log()
    this.selectedTaskForUpdate = task ? { ...task } : undefined;
    this.selectedTask = taskId ? taskId :  0;
    this.dialog.openDialog();
  }

  openDialogDelete(id: number) {
    if (this.dialogDelete) {
      this.dialogDelete.openDialog();
      this.selectedTask = id;
    } else {
      console.error('dialogTaskDelete is not available');
    }
  }


  handleClose() {
    this.dialogDelete.closeDialog()
  }


  newTask(data: NewTask) {
    this.taskService.postNewTask(data).subscribe((res) => {
      if (res.message == "Task successfully created") {
        this.toastr.success('Task created');
        this.getAllTasks();
      }
    },
      (err) => {
        console.error(err);
        this.toastr.error('something whent wrong');

      })
  }

  updateTask(data: Task) {
    this.taskService.updateTask(data).subscribe(
      (res) => {
        if (res.message === 'Task successfully updated') {
          this.toastr.success('Task updated');
          this.dialog.closeDialog();
          this.getAllTasks();
        }
      },
      (err) => {
        console.error(err);
        this.toastr.error('Something went wrong');
      }
    );
  }



  deleteTask() {
    const id = this.selectedTask
    this.taskService.deleteTask(id).subscribe((res) => {
      if (res.message == "Task successfully deleted") {
        this.toastr.success('Task deleted');
        this.dialogDelete.closeDialog();
        this.getAllTasks();
      }
    },
      (err) => {
        console.error(err);
        this.toastr.error('something whent wrong');

      })
  }

  completeTask(task: Task) {
    console.log(task)
    task.isCompleted = true;
    console.log("task", task)
    this.taskService.updateTask(task).subscribe((res) => {
      if (res.message == "Task successfully updated") {
        this.toastr.success('Task completed');
        this.dialogDelete.closeDialog();
        this.getAllTasks();
      }
    },
      (err) => {
        console.error(err);
        this.toastr.error('something whent wrong');

      })
  }
}
