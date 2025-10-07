import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginHistoryComponent } from './user-login-history.component';

describe('UserLoginHistoryComponent', () => {
  let component: UserLoginHistoryComponent;
  let fixture: ComponentFixture<UserLoginHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoginHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLoginHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
