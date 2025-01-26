import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NewTask, Task } from '../types/task.model';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-task',
  standalone: true, // Assuming standalone component
  imports: [
    FormsModule,
  ],
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss'], // Correct property
})
export class FormTaskComponent implements OnChanges {
  @Input() newTask!: (data: NewTask) => void;
  @Input() updateTask!: (data: Task) => void;
  @Input() Task?: Task;

  formdata = {
    title: '',
    description: '',
    dueDate: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Task'] && changes['Task'].currentValue) {
      const task = changes['Task'].currentValue as Task;
      console.log(task.dueDate);
  
      this.formdata.title = task.title || '';
      this.formdata.description = task.description || '';
  
      if (task.dueDate) {
        const [day, month, year] = task.dueDate.split('/');
        this.formdata.dueDate = `${year}-${month}-${day}`; 
      } else {
        this.formdata.dueDate = '';
      }
    }
  }

  taskHandler(form: NgForm) {
    if (!this.Task) {
      this.createNewTask(form);
    } else {
      this.updateExistingTask(form);
    }
  }

  createNewTask(form: NgForm) {
    const data: NewTask = form.value;
    this.newTask(data);
  }

  updateExistingTask(form: NgForm) {
    const data: NewTask = form.value;
    const task = this.Task;
    if (task) {
      task.dueDate = data.dueDate;
      task.title = data.title;
      task.description = data.description;
      this.updateTask(task);
    }
  }
}
