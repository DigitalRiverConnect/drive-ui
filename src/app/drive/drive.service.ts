import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

/**
 * Service class response for http request
 */
@Injectable()
export class DriveService {

  private static requestWithBody = [ 'post', 'put' ];

  constructor(private http: Http) {}

  /**
   *
   * @param endpoint - endpoint from drive media type
   * @param body - Request body for POST and PUT
   * @returns {Promise<TResult>}
   */
  request(endpoint, body = {}): Promise<any> {
    let headers = new Headers();

    let parameters = [endpoint.href, { headers: headers }];
    let method = endpoint.method ? endpoint.method.toLowerCase() : 'get';

    if (DriveService.requestWithBody.indexOf(method) >= 0) {
      headers.append("Content-Type", "application/json");
      headers.append("X-Session-Data", "offset=0&max=10");
      parameters.splice(1, 0, body);
    }

    let observable = this.http[method].apply(this.http, parameters);
    return observable.toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
}
