import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DriveService } from '../drive.service'
import 'rxjs/add/operator/toPromise'

@Component({
  selector: 'drive-list',
  templateUrl: './drive-list.component.html'
})
export class DriveListComponent implements OnChanges {

  @Input() drive;
  @Input() url;
  @Output() driveEvent = new EventEmitter<any>();
  @Output() errorEvent = new EventEmitter<any>();
  query: string;

  constructor(private driveService: DriveService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.drive = changes['drive']['currentValue']
  }

  /**
   *
   * @param endpoint - endpoint from drive media type
   * @param page - the page/content like to display. E.g. 'creation', 'edit'
   */
  gotoItem(endpoint, page): void {
    let promise = this.driveService.request(endpoint);
    promise.then(data => this.driveEvent.emit({page: page, drive: data}))
      .catch(error => this.errorEvent.emit(error));
  }

  /**
   *
   * @param endpoint - endpoint from drive media type
   */
  request(endpoint): void {
    const promise = this.driveService.request(endpoint);
    promise.then(data => {
      this.driveEvent.emit({page: 'list', drive: data, query: this.query})
    })
      .catch(error => this.errorEvent.emit(error));
  }

  /**
   *
   * @param endpoint - endpoint from drive media type
   * @param options - message after deletion
   */
  delete(endpoint, options = { message: null }): void {
    const promise = this.driveService.request(endpoint);
    promise.then(data => this.driveEvent.emit({page: 'list', drive: data, message: options.message}))
      .catch(error => this.errorEvent.emit(error));
  }

  search(endpoint): void {
    const body = { terms: { name: this.query } };
    const promise = this.driveService.request(endpoint, body);
    promise.then(data => this.driveEvent.emit({page: 'list', drive: data, query: this.query}))
      .catch(error => this.errorEvent.emit(error));
  }

  highlightCurrentPage(pageNum) {
    let styles = {};

    if (this.drive.data.thisPage == pageNum) {
      styles['background-color'] = '#eee'
    }

    return styles;
  }

  onKeyPress(event: any, endpoint) {
    if (event.code === 'Enter') {
      this.search(endpoint)
    }
  }
}
