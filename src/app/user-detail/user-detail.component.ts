import { Component, inject } from '@angular/core';
import { doc, docData } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userID: string = '';
  private firestore: Firestore = inject(Firestore);
  private routeSubscription!: Subscription;
  private dbSubscription!: Subscription;
  userDetail: User = new User();

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((paramMap) => {
      this.userID = paramMap.get('id') || '';
      this.getUser();
    });
  }

  getUser() {
    const userDocRef = doc(this.firestore, `users/${this.userID}`);
    this.dbSubscription = docData(userDocRef, { idField: 'id' }).subscribe(
      (user) => {
        console.log(user);
        this.userDetail = new User(user);
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    if (this.dbSubscription) {
      this.dbSubscription.unsubscribe();
    }
  }
  editMenuTop() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = this.userDetail;
  }
  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = this.userDetail;
  }
}
