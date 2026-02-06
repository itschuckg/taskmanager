import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  template: `
    <div class="task-list-container">
      <div class="list-header">
        <div class="header-content">
          <mat-icon class="header-icon">list_alt</mat-icon>
          <div class="header-text">
            <h2>Your Tasks</h2>
            <p>{{ tasks.length }} task{{ tasks.length !== 1 ? 's' : '' }} total</p>
          </div>
        </div>
        
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search tasks</mat-label>
          <input matInput [formControl]="searchControl" 
                 placeholder="Search by title or description">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>
      
      <mat-tab-group [(selectedIndex)]="selectedTabIndex" 
                     (selectedTabChange)="onTabChange($event)"
                     class="task-tabs">
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">view_list</mat-icon>
            All Tasks
            <span class="task-count">{{ filteredTasks.length }}</span>
          </ng-template>
          <div class="tab-content">
            <ng-container [ngTemplateOutlet]="taskListTemplate" 
                        [ngTemplateOutletContext]="{ tasks: filteredTasks }">
            </ng-container>
          </div>
        </mat-tab>
        
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">schedule</mat-icon>
            Pending
            <span class="task-count pending">{{ pendingTasks.length }}</span>
          </ng-template>
          <div class="tab-content">
            <ng-container [ngTemplateOutlet]="taskListTemplate" 
                        [ngTemplateOutletContext]="{ tasks: pendingTasks }">
            </ng-container>
          </div>
        </mat-tab>
        
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">check_circle</mat-icon>
            Completed
            <span class="task-count completed">{{ completedTasks.length }}</span>
          </ng-template>
          <div class="tab-content">
            <ng-container [ngTemplateOutlet]="taskListTemplate" 
                        [ngTemplateOutletContext]="{ tasks: completedTasks }">
            </ng-container>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
    
    <ng-template #taskListTemplate let-tasks="tasks">
      <div *ngIf="isLoading" class="loading-container">
        <mat-spinner diameter="60"></mat-spinner>
        <p>Loading your tasks...</p>
      </div>
      
      <div *ngIf="!isLoading && tasks.length === 0" class="empty-state">
        <mat-icon class="empty-icon">assignment_turned_in</mat-icon>
        <h3>No tasks here</h3>
        <p>{{ getEmptyStateMessage() }}</p>
      </div>
      
      <div *ngIf="!isLoading && tasks.length > 0" class="tasks-grid">
        <div *ngFor="let task of tasks; trackBy: trackByTaskId" 
             class="task-card" 
             [class.completed]="task.completed">
          
          <div class="task-header">
            <mat-checkbox 
              [checked]="task.completed"
              (change)="toggleTask(task)"
              color="primary"
              class="task-checkbox">
            </mat-checkbox>
            
            <div class="task-status" [class.completed]="task.completed">
              <mat-icon>{{ task.completed ? 'check_circle' : 'radio_button_unchecked' }}</mat-icon>
            </div>
          </div>
          
          <div class="task-body">
            <h4 class="task-title" [class.completed]="task.completed">
              {{ task.title }}
            </h4>
            
            <p class="task-description" *ngIf="task.description">
              {{ task.description }}
            </p>
            
            <div class="task-meta">
              <span class="task-date">
                <mat-icon class="meta-icon">schedule</mat-icon>
                {{ formatDate(task.createdAt) }}
              </span>
            </div>
          </div>
          
          <div class="task-actions">
            <button mat-icon-button 
                    (click)="deleteTask(task)"
                    class="delete-btn"
                    [attr.aria-label]="'Delete task: ' + task.title">
              <mat-icon>delete_outline</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .task-list-container {
      background: linear-gradient(135deg, #fff 0%, #f8f9ff 100%);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      min-height: 500px;
    }
    
    .list-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 24px;
      position: relative;
      overflow: hidden;
    }
    
    .list-header::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 100%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
      animation: float 4s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    .header-content {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
      position: relative;
      z-index: 1;
    }
    
    .header-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      opacity: 0.9;
    }
    
    .header-text h2 {
      margin: 0 0 4px 0;
      font-size: 1.5rem;
      font-weight: 500;
    }
    
    .header-text p {
      margin: 0;
      opacity: 0.9;
      font-size: 0.95rem;
    }
    
    .search-field {
      position: relative;
      z-index: 1;
    }
    
    .search-field .mat-form-field-appearance-outline .mat-form-field-outline-thick {
      color: rgba(255,255,255,0.7) !important;
    }
    
    .search-field .mat-form-field-label {
      color: rgba(255,255,255,0.9) !important;
    }
    
    .search-field input {
      color: white !important;
    }
    
    .task-tabs {
      background: transparent;
    }
    
    .task-tabs .mat-tab-labels {
      background: rgba(255,255,255,0.95);
      border-radius: 0;
    }
    
    .tab-content {
      padding: 24px;
      min-height: 400px;
    }
    
    .tab-icon {
      margin-right: 8px;
      font-size: 1.2rem;
      width: 1.2rem;
      height: 1.2rem;
    }
    
    .task-count {
      margin-left: 8px;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }
    
    .task-count.pending {
      background: rgba(255, 152, 0, 0.1);
      color: #ff9800;
    }
    
    .task-count.completed {
      background: rgba(76, 175, 80, 0.1);
      color: #4caf50;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px;
      text-align: center;
    }
    
    .loading-container p {
      margin-top: 16px;
      color: #666;
      font-size: 1.1rem;
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
      color: #666;
    }
    
    .empty-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      margin-bottom: 20px;
      opacity: 0.4;
      color: #667eea;
    }
    
    .empty-state h3 {
      margin: 0 0 12px 0;
      font-size: 1.3rem;
      color: #333;
    }
    
    .empty-state p {
      margin: 0;
      font-size: 1rem;
      opacity: 0.8;
    }
    
    .tasks-grid {
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
    
    .task-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      border: 1px solid rgba(0,0,0,0.05);
      transition: all 0.3s ease;
      overflow: hidden;
      position: relative;
    }
    
    .task-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
    
    .task-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    }
    
    .task-card:hover::before {
      transform: scaleX(1);
    }
    
    .task-card.completed {
      opacity: 0.8;
      background: #f9f9f9;
    }
    
    .task-card.completed::before {
      background: linear-gradient(90deg, #4caf50, #66bb6a);
      transform: scaleX(1);
    }
    
    .task-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 16px 0;
    }
    
    .task-checkbox {
      transform: scale(1.2);
    }
    
    .task-status {
      color: #ff9800;
      transition: color 0.3s ease;
    }
    
    .task-status.completed {
      color: #4caf50;
    }
    
    .task-body {
      padding: 8px 16px 16px;
      flex: 1;
    }
    
    .task-title {
      margin: 0 0 8px 0;
      font-size: 1.1rem;
      font-weight: 500;
      color: #333;
      line-height: 1.4;
      transition: all 0.3s ease;
    }
    
    .task-title.completed {
      text-decoration: line-through;
      color: #999;
    }
    
    .task-description {
      margin: 0 0 12px 0;
      font-size: 0.9rem;
      color: #666;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .task-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .task-date {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.8rem;
      color: #999;
    }
    
    .meta-icon {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
    }
    
    .task-actions {
      position: absolute;
      top: 8px;
      right: 8px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .task-card:hover .task-actions {
      opacity: 1;
    }
    
    .delete-btn {
      color: #f44336;
      background: rgba(244, 67, 54, 0.1);
      border-radius: 50%;
      width: 32px;
      height: 32px;
    }
    
    .delete-btn:hover {
      background: rgba(244, 67, 54, 0.2);
      transform: scale(1.1);
    }
    
    /* Animations */
    .task-card {
      animation: slideInUp 0.4s ease-out;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Responsive design */
    @media (max-width: 768px) {
      .list-header {
        padding: 16px;
      }
      
      .header-content {
        margin-bottom: 16px;
      }
      
      .tab-content {
        padding: 16px;
      }
      
      .tasks-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      
      .empty-state {
        padding: 40px 20px;
      }
      
      .task-actions {
        opacity: 1;
      }
    }
    
    @media (max-width: 480px) {
      .header-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      
      .header-icon {
        align-self: center;
      }
    }
  `]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];
  
  searchControl = new FormControl('');
  selectedTabIndex = 0;
  isLoading = false;

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {
    this.searchControl.valueChanges.subscribe(value => {
      this.filterTasks(value || '');
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.updateTaskLists();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.snackBar.open('Failed to load tasks', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  private updateTaskLists() {
    const searchTerm = this.searchControl.value || '';
    
    this.filteredTasks = this.filterTasksBySearch(this.tasks, searchTerm);
    this.pendingTasks = this.filterTasksBySearch(
      this.tasks.filter(task => !task.completed), 
      searchTerm
    );
    this.completedTasks = this.filterTasksBySearch(
      this.tasks.filter(task => task.completed), 
      searchTerm
    );
  }

  private filterTasksBySearch(tasks: Task[], searchTerm: string): Task[] {
    if (!searchTerm) return tasks;
    
    const term = searchTerm.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(term) || 
      (task.description && task.description.toLowerCase().includes(term))
    );
  }

  private filterTasks(searchTerm: string) {
    this.updateTaskLists();
  }

  onTabChange(event: any) {
    this.selectedTabIndex = event.index;
  }

  toggleTask(task: Task) {
    if (task.id) {
      this.taskService.toggleTaskCompletion(task.id).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex(t => t.id === task.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
            this.updateTaskLists();
          }
          
          const action = updatedTask.completed ? 'completed' : 'marked as pending';
          this.snackBar.open(`Task ${action}`, 'Close', {
            duration: 2000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          console.error('Error toggling task:', error);
          this.snackBar.open('Failed to update task', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  deleteTask(task: Task) {
    if (task.id && confirm(`Are you sure you want to delete "${task.title}"?`)) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
          this.updateTaskLists();
          this.snackBar.open('Task deleted successfully', 'Close', {
            duration: 2000,
            panelClass: ['success-snackbar']
          });
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this.snackBar.open('Failed to delete task', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  refreshTasks() {
    this.loadTasks();
  }

  trackByTaskId(index: number, task: Task): any {
    return task.id;
  }

  getEmptyStateMessage(): string {
    switch (this.selectedTabIndex) {
      case 1: return "All your pending tasks will appear here";
      case 2: return "Completed tasks will be shown here";
      default: return "Create your first task to get started";
    }
  }
}