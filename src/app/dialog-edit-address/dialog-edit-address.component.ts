import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
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
    MatButtonModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  user: User = new User();
  userID: string = '';
  loading: boolean = false;
  firestore: Firestore = inject(Firestore);
  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {}

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
