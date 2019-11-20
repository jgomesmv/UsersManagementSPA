import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        UserFormComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('creates a formGroup on init', () => {
    component.ngOnInit();
    expect(component.userForm).toBeDefined();
  });

  it('should emit userSubmited onSubmit', () => {
    spyOn(component.userSubmited, 'emit');
    component.ngOnInit();
    component.userForm.get('name').setValue('testUserName');
    expect(component.userForm.valid).toBeTruthy();

    component.onSubmit();
    expect(component.userSubmited.emit).toHaveBeenCalled();
  });

  it('should not emit userSubmited onSubmit when user not valid', () => {
    spyOn(component.userSubmited, 'emit');
    component.ngOnInit();
    expect(component.userForm.valid).toBeFalsy();

    component.onSubmit();
    expect(component.userSubmited.emit).not.toHaveBeenCalled();
  });
});
