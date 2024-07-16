import { Component, Inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { TodoService } from './services/todo.service';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent,
    TodoItemsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo';

  currentThemeSubscription$!: Subscription;
  constructor(
    @Inject(TodoService) private todoService: TodoService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {

  }

  ngOnInit(): void {
    this.currentThemeSubscription$ = this.todoService.getUserTheme()
      .subscribe((value) => {
        if (value == 'light') {
          this.renderer.removeClass(this.document.body, 'dark-theme');
          this.renderer.addClass(this.document.body, 'light-theme');
        } else {
          this.renderer.removeClass(this.document.body, 'light-theme');
          this.renderer.addClass(this.document.body, 'dark-theme');
        }
    });
  }

  ngOnDestroy(): void {
    this.currentThemeSubscription$.unsubscribe();
  }
}
