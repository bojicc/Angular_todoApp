import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-items',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    TodoItemComponent,
    AsyncPipe,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './todo-items.component.html',
  styleUrl: './todo-items.component.scss'
})
export class TodoItemsComponent implements OnInit {
  item!: string;
  statusFilter: string = 'all';
  public todoService: TodoService = inject(TodoService);
  fb = inject(FormBuilder);

  itemsSubscription$!: Subscription;

  todoInputForm = this.fb.group({
    name: new FormControl('', [Validators.minLength(2), Validators.required])
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  get todos(): Todo[] {
    return this.todoService.getTodoItems();
  }

  get activeTodos(): Todo[] {
    return this.todoService.getTodoItems('active');
  }

  get filteredTodos(): Todo[] {
    return this.todoService.getTodoItems(this.statusFilter);
  }

  get completedTodos(): Todo[] {
    return this.todoService.getTodoItems('completed');
  }

  onSubmit() {
    // if (this.item !== ''  && this.item.length > 1) {
    //     this.todoService.addToDoItem(this.item);
    //     //this.todoItems = [...this.todoItems, {name: this.item, completed: false}];
    //     this.item = '';
    // } 

    if (this.todoInputForm.invalid) return;

    this.todoService.addToDoItem(this.todoInputForm.controls['name'].value as string);
    this.todoInputForm.reset({name: ''});
  }

  removeTodo(value: Todo) {
    //this.todoItems = this.todoItems.filter(item => item.name === item.name);
    this.todoService.removeTodoItem(value.name);
  }

  ngOnDestroy(): void {
    this.itemsSubscription$.unsubscribe();
  }

  toggleAll(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.todoService.toggleAllTodo(input.checked);
  }
}
