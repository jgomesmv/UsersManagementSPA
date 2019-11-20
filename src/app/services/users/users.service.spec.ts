import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  const testUser = {name: 'testUser', previousName: null};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(UsersService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the list of users', () => {
    const expectedUrl = 'https://uitest.free.beeceptor.com/usernames';
    const expectedResponse = [testUser];

    service.get().subscribe(result => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne(expectedUrl);
    req.flush(expectedResponse);
  });
});
