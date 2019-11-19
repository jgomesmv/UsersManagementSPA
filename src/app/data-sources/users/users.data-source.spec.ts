import { TestBed } from '@angular/core/testing';
import { UsersDataSource } from './users.data-source';

describe('UsersDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersDataSource = TestBed.get(UsersDataSource);
    expect(service).toBeTruthy();
  });
});
