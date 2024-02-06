import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  user: User = new User();
  userID: string = '';
  birthDate!: Date;
  loading: boolean = false;
  firestore: Firestore = inject(Firestore);
  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {}

  async saveUser() {
    this.loading = true;
    const userDocRef = doc(this.firestore, `users/${this.userID}`);

    try {
      await updateDoc(userDocRef, this.user.toJSON());
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      this.loading = false;
    }
  }
}
