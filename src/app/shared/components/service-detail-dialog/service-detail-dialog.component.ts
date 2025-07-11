import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ServiceCard } from '../../interfaces/service-card.interface';

@Component({
  selector: 'app-service-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './service-detail-dialog.component.html',
  styleUrls: ['./service-detail-dialog.component.scss']
})
export class ServiceDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ServiceDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceCard
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onContact(): void {
    this.dialogRef.close('contact');
  }
}
