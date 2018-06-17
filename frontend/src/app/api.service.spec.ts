import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



describe('ApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ApiService, HttpClientTestingModule
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ApiService, HttpClientTestingModule], (api: ApiService) => {
    expect(api).toBeTruthy();
  }));

  it('should login a user with valid credentials', inject([ApiService, HttpClientTestingModule], (api: ApiService) => {
    let expectedUser = {ID: 1, Email: 'demo@empatica.com', FirstName: "John", LastName: "Doe"};
    api.getUser(22).subscribe(user => expect(user).toEqual(
      expectedUser, 'should return expected user'),
      fail
    );
  }));
});
