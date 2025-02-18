import { TestBed } from '@angular/core/testing';

import { Config, DataService } from './data.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('DataService', () => {
  let service: DataService;
  let httpTesting: HttpTestingController;
  const DEFAULT_CONFIG: Config = { name: 'test', value: 'test' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(DataService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that none of the tests make any extra HTTP requests.
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get config shall work', async () => {
    const config$ = service.getConfig<Config>();

    // `firstValueFrom` subscribes to the `Observable`, which makes the HTTP request,
    // and creates a `Promise` of the response.
    const configPromise = firstValueFrom(config$);
    
    // At this point, the request is pending, and we can assert it was made
    // via the `HttpTestingController`:
    const req = httpTesting.expectOne('/api/config', 'Request to load the configuration');
    // We can assert various properties of the request if desired.
    expect(req.request.method).toBe('GET');
    // Flushing the request causes it to complete, delivering the result.
    req.flush(DEFAULT_CONFIG);
    // We can then assert that the response was successfully delivered by the `ConfigService`:
    expect(await configPromise).toEqual(DEFAULT_CONFIG);

    // Logic has been moved to afterEach.
    // // Finally, we can assert that no other requests were made.
    // httpTesting.verify();
  });

  it('get config with backend error', async () => {
    const config$ = service.getConfig<Config>();

    // `firstValueFrom` subscribes to the `Observable`, which makes the HTTP request,
    // and creates a `Promise` of the response.
    const configPromise = firstValueFrom(config$);
    
    // At this point, the request is pending, and we can assert it was made
    // via the `HttpTestingController`:
    const req = httpTesting.expectOne('/api/config', 'Request to load the configuration');
    // We can assert various properties of the request if desired.
    expect(req.request.method).toBe('GET');
    // Error 
    req.flush('Failed!', {status: 500, statusText: 'Internal Server Error'});

    try {
      // We can then assert that the response was failed delivered by the `ConfigService`:
      expect(await configPromise).not.toEqual(DEFAULT_CONFIG);
    }
    catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('get config with network error', async () => {
    const config$ = service.getConfig<Config>();

    // `firstValueFrom` subscribes to the `Observable`, which makes the HTTP request,
    // and creates a `Promise` of the response.
    const configPromise = firstValueFrom(config$);
    
    // At this point, the request is pending, and we can assert it was made
    // via the `HttpTestingController`:
    const req = httpTesting.expectOne('/api/config', 'Request to load the configuration');
    // We can assert various properties of the request if desired.
    expect(req.request.method).toBe('GET');
    // Error
    req.error(new ProgressEvent('network error!'));

    try {
      // We can then assert that the response was failed delivered by the `ConfigService`:
      expect(await configPromise).not.toEqual(DEFAULT_CONFIG);
    }
    catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
