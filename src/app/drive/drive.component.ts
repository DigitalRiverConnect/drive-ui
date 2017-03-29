import { Component, OnInit } from '@angular/core';
import { DriveService } from './drive.service'
import { environment } from '../../environments/environment';

@Component({
  selector: 'drive',
  templateUrl: './drive.component.html'
})
export class DriveComponent implements OnInit {

  /** drive media type */
  drive;
  page: string = 'list';
  endpoint = {
    href: `${environment.url}${environment.endpoint}?offset=${environment.offset}&max=${environment.max}`
  };
  message: string;
  messageType: string;

  constructor(private driveService: DriveService) { }

  ngOnInit() {
    this.defaultPage();
  }

  /**
   * Receive event from child component
   *
   * @param data
   */
  driveEvent(data) {
    this.drive = data.drive;
    this.page = data.page;
    // this.pagination = this.drivePaginationUtil.getPagination(data.drive, data.query);
    this.message = data.message;
    this.messageType = 'success';
    document.body.scrollTop = 0;
  }

  errorEvent(error) {
    this.page = 'list';
    this.message = `${error.status} ${error.statusText}: ${JSON.parse(error._body)['message']}`;
    this.messageType = 'error';
    this.defaultPage();
  }

  defaultPage() {
    let promise = this.driveService.request(this.endpoint);
    promise.then(data => {
      this.drive = data;
      // this.pagination = this.drivePaginationUtil.getPagination(data);
    })
      .catch(error => {
        const errorBody = JSON.parse(error._body);
        if (errorBody.error_description.match(/^access token expired/i)) {
          sessionStorage.removeItem('access_token');
        }
        this.message = `Status: ${error.status}. ${errorBody.error}, ${errorBody.error_description}`;
        this.messageType = 'error';
      });
  }
}
