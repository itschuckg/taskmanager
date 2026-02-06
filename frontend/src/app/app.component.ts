import { Component, ViewChild } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar>
      <mat-icon class="toolbar-icon">task_alt</mat-icon>
      <span class="app-title">Task Manager</span>
      <span class="spacer"></span>
      <mat-icon class="toolbar-icon">dashboard</mat-icon>
    </mat-toolbar>
    
    <div class="main-container">
      <div class="hero-section">
        <h1>Manage Your Tasks</h1>
        <p>Stay organized and productive with our beautiful task manager</p>
      </div>
      
      <div class="content-wrapper">
        <div class="form-section">
          <app-task-form (taskCreated)="onTaskCreated()"></app-task-form>
        </div>
        
        <div class="tasks-section">
          <app-task-list #taskList></app-task-list>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .main-container {
      min-height: calc(100vh - 64px);
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    .hero-section {
      text-align: center;
      padding: 40px 20px 20px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }
    
    .hero-section h1 {
      margin: 0;
      color: #333;
      font-size: 2.5rem;
      font-weight: 300;
      margin-bottom: 10px;
    }
    
    .hero-section p {
      margin: 0;
      color: #666;
      font-size: 1.1rem;
      opacity: 0.8;
    }
    
    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }
    
    .form-section, .tasks-section {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      backdrop-filter: blur(10px);
    }
    
    .toolbar-icon {
      margin-right: 8px;
    }
    
    .app-title {
      font-size: 1.3rem;
      font-weight: 500;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    @media (min-width: 968px) {
      .content-wrapper {
        grid-template-columns: 400px 1fr;
      }
      
      .form-section {
        position: sticky;
        top: 20px;
        height: fit-content;
      }
    }
    
    @media (max-width: 768px) {
      .content-wrapper {
        padding: 10px;
        gap: 16px;
      }
      
      .hero-section {
        padding: 20px 10px 10px;
      }
      
      .hero-section h1 {
        font-size: 2rem;
      }
      
      .form-section, .tasks-section {
        padding: 16px;
      }
    }
  `]
})
export class AppComponent {
  @ViewChild('taskList') taskList!: TaskListComponent;

  onTaskCreated() {
    if (this.taskList) {
      this.taskList.refreshTasks();
    }
  }
}