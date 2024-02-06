import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { Firestore } from '@angular/fire/firestore';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    const mockUpdateDoc = jasmine.createSpy('updateDoc').and.resolveTo();

    // Mock Firestore service
    const mockFirestore = {
      doc: jasmine.createSpy('doc').and.returnValue({}),
      updateDoc: mockUpdateDoc,
    };

    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        { provide: Firestore, useValue: mockFirestore }, // Provide the mock Firestore service here
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
