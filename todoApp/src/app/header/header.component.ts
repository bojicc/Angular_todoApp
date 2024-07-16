import { Component, ChangeDetectionStrategy, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{

  @Input()
  title!: string;

  theme: any = {
    light: {
      icon: 'assets/icon-moon-svg',
      nema: 'Dark Theme'
    },
    dark: {
      icon: '/assets/icon-sun.svg',
      name: 'Light Theme'
    }
  }
  themeToggleDefaults: any;
  userTheme!: string;

  constructor(@Inject(TodoService) private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getUserTheme().subscribe((value) => {
      this.themeToggleDefaults = this.theme[value];
      this.userTheme = value;
    })
  }

  onToggle() {
    if (this.userTheme === 'light') {
      this.themeToggleDefaults = this.theme['dark'];
      this.todoService.setUserTheme('dark');
    } else {
      this.themeToggleDefaults = this.theme['light'];
      this.todoService.setUserTheme('light');
    }
  }
}
