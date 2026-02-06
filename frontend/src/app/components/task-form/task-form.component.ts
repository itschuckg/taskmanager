import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  template: `
    <div class="form-container">
      <div class="form-header">
        <mat-icon class="header-icon">add_task</mat-icon>
        <h2>Create New Task</h2>
        <p>Add a new task to stay organized</p>
      </div>
      
      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="task-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Task Title</mat-label>
          <input matInput formControlName="title" placeholder="What needs to be done?">
          <mat-icon matSuffix>title</mat-icon>
          <mat-error *ngIf="taskForm.get('title')?.hasError('required')">
            Title is required
          </mat-error>
          <mat-error *ngIf="taskForm.get('title')?.hasError('maxlength')">
            Title must be less than 255 characters
          </mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description (Optional)</mat-label>
          <textarea matInput formControlName="description" 
                   placeholder="Add more details about this task..." 
                   rows="4" maxlength="500">
          </textarea>
          <mat-icon matSuffix>description</mat-icon>
          <mat-hint>{{ taskForm.get('description')?.value?.length || 0 }}/500</mat-hint>
        </mat-form-field>
        
        <div class="form-actions">
          <button mat-raised-button color="primary" type="submit" 
                  [disabled]="taskForm.invalid || isSubmitting" class="submit-btn">
            <mat-icon>{{ isSubmitting ? 'hourglass_empty' : 'add_circle' }}</mat-icon>
            {{ isSubmitting ? 'Creating Task...' : 'Create Task' }}
          </button>
          
          <button mat-stroked-button type="button" (click)="resetForm()" 
                  [disabled]="isSubmitting" class="reset-btn">
            <mat-icon>refresh</mat-icon>
            Reset Form
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      background: linear-gradient(135deg, #fff 0%, #f8f9ff 100%);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    
    .form-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 24px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .form-header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      animation: shimmer 3s ease-in-out infinite;
    }
    
    @keyframes shimmer {
      0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(0deg); }
      50% { transform: translateX(100%) translateY(100%) rotate(180deg); }
    }
    
    .header-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      margin-bottom: 8px;
      opacity: 0.9;
    }
    
    .form-header h2 {
      margin: 0 0 8px 0;
      font-size: 1.5rem;
      font-weight: 500;
      position: relative;
      z-index: 1;
    }
    
    .form-header p {
      margin: 0;
      opacity: 0.9;
      font-size: 0.95rem;
      position: relative;
      z-index: 1;
    }
    
    .task-form {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .full-width {
      width: 100%;
    }
    
    .mat-form-field {
      font-size: 1rem;
    }
    
    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 8px;
      flex-wrap: wrap;
    }
    
    .submit-btn {
      flex: 1;
      min-width: 140px;
      height: 48px;
      border-radius: 24px !important;
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    
    .reset-btn {
      min-width: 120px;
      height: 48px;
      border-radius: 24px !important;
      border: 2px solid #e0e0e0 !important;
    }
    
    .submit-btn:disabled {
      opacity: 0.6;
    }
    
    .submit-btn mat-icon,
    .reset-btn mat-icon {
      margin-right: 8px;
    }
    
    /* Animations */
    .form-container {
      animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .task-form .mat-form-field {
      transition: transform 0.2s ease;
    }
    
    .task-form .mat-form-field:focus-within {
      transform: translateY(-2px);
    }
    
    @media (max-width: 480px) {
      .form-actions {
        flex-direction: column;
      }
      
      .submit-btn,
      .reset-btn {
        width: 100%;
      }
    }
  `]
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<void>();
  
  taskForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['']
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.isSubmitting = true;
      
      const newTask = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description || '',
        completed: false
      };

      this.taskService.createTask(newTask).subscribe({
        next: (task) => {
          this.snackBar.open('Task created successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.resetForm();
          this.taskCreated.emit();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error creating task:', error);
          this.snackBar.open('Failed to create task. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          this.isSubmitting = false;
        }
      });
    }
  }

  resetForm() {
    this.taskForm.reset();
    this.taskForm.markAsUntouched();
  }
}