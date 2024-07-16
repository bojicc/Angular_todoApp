export class Todo {
    public name: string;
    public completed: boolean;
  
    constructor(name: string, completed = false) {
      this.name = name;
      this.completed = completed;
    }
}