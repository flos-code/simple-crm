import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  const mockActivatedRoute = {
    paramMap: of(new Map([['id', '123']])), // Example: Mock paramMap observable if your component uses it
    // Add other properties and methods as needed based on your component's usage of ActivatedRoute
  };

  beforeEach(async () => {
    const mockUpdateDoc = jasmine.createSpy('updateDoc').and.resolveTo();

    // Mock Firestore service
    const mockFirestore = {
      doc: jasmine.createSpy('doc').and.returnValue({}),
      updateDoc: mockUpdateDoc,
    };

    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide the mock ActivatedRoute
        { provide: Firestore, useValue: mockFirestore }, // Provide the mock Firestore service here
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
