import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input({required: true}) item!: Todo;

  @Output() remove = new EventEmitter<Todo>();

  toggleItemCompletionStatus() {
    this.item.completed = ! this.item.completed;
  }

  removeTodo(item: Todo) {
    this.remove.emit(item);
  }
}
