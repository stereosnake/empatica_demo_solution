import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to manipulate token', inject([AuthService], (service: AuthService) => {
    service.setToken("token")
    expect(service.getToken()).toBeTruthy();
    service.deleteToken()
    expect(service.getToken()).toBeNull();
  }));
});
