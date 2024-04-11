import { ComponentFixture, TestBed } from '@angular/core/testing';

import { welcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: welcomeComponent;
  let fixture: ComponentFixture<welcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ welcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(welcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
