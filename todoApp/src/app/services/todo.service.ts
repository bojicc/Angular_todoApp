import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private userTheme = new BehaviorSubject<string>('dark');
  private items: Todo[] = [];

  constructor() { }

  addToDoItem(name: string): void {
    const todo = new Todo(name);
    this.items = [...this.items, todo];
  }

  removeTodoItem(name: string): void {
    this.items = this.items.filter(value => value.name != name);
  }

  getTodoItems(status = 'all'): Todo[] {
    if (status === 'active') {
      return this.items.filter((value) => !value.completed);
    }
    
    if (status === 'completed') {
      return this.items.filter((value) => value.completed);
    }

    return this.items;
  }

  toggleAllTodo(completed: boolean) {
    this.items.forEach((value) => {
      value.completed = completed;
    })
  }

  clearCompletedItems() {
    this.items = this.items.filter(value => !value.completed);
  }

  getUserTheme() {
    return this.userTheme.asObservable();
  }

  setUserTheme(value: string) {
    this.userTheme.next(value);
  }
}
