import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActiveSessionsComponent } from './user-active-sessions.component';

describe('UserActiveSessionsComponent', () => {
  let component: UserActiveSessionsComponent;
  let fixture: ComponentFixture<UserActiveSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActiveSessionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserActiveSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
