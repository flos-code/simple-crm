import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEditAddressComponent } from './dialog-edit-address.component';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogEditAddressComponent', () => {
  let component: DialogEditAddressComponent;
  let fixture: ComponentFixture<DialogEditAddressComponent>;

  beforeEach(async () => {
    const mockDialogRef = {
      close: jasmine.createSpy('close'),
    };

    const mockUpdateDoc = jasmine.createSpy('updateDoc').and.resolveTo();

    // Mock Firestore service
    const mockFirestore = {
      doc: jasmine.createSpy('doc').and.returnValue({}),
      updateDoc: mockUpdateDoc,
    };

    await TestBed.configureTestingModule({
      imports: [
        DialogEditAddressComponent,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: Firestore, useValue: mockFirestore }, // Provide the mock Firestore service here
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
