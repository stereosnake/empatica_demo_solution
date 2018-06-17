import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const email = 'demo@empatica.com';
  const password = 'passw0rd';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        MatInputModule,
        HttpClientTestingModule,
        RouterTestingModule,
        OverlayModule,
        BrowserAnimationsModule
      ],
      providers: [ MatSnackBar, OverlayModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Demo App Login');
  }));

  it('should have contain login form', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[name=email]')).toBeTruthy();
    expect(compiled.querySelector('input[name=password]')).toBeTruthy();
    expect(compiled.querySelector('button[type=submit]')).toBeTruthy();
  });
});
