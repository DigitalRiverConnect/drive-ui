import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DriveService } from '../drive.service';
import 'json-editor';

@Component({
  selector: 'drive-item',
  templateUrl: './drive-item.component.html'
})
export class DriveItemComponent implements OnInit {
  @Input() drive;
  @Input() page;
  @Output() driveEvent = new EventEmitter<any>();
  @Output() errorEvent = new EventEmitter<any>();
  jsonEditor: JSONEditor<any>;
  successful_messages = {
    list: 'Create Successfully',
    edit: 'Update Successfully'
  };

  constructor(private driveService: DriveService) {}

  ngOnInit(): void {
    JSONEditor.defaults.options.theme = 'bootstrap3';
    this.renderJSONEditor(this.drive);
  }

  /**
   *
   * @param endpoint - endpoint from drive media type
   * @param page - the page/content like to display. E.g. 'list', 'edit'
   */
  save(endpoint, page: string): void {
    let errors = this.jsonEditor.validate();

    if (errors.length) {
      let message = '';
      for (let error of errors) {
        message += '*' + error.message + '\n';
      }
      alert(`Please fix the errors:\n ${message}`);
    }
    else {
      const body = { definition: this.jsonEditor.getValue()};
      const promise = this.driveService.request(endpoint, body);
      console.log("end promise")
      promise.then(data => {
        console.log("save then")
        console.log("page", page);
        console.log("data", JSON.stringify(data));
        this.driveEvent.emit({page: page, drive: data, message: this.successful_messages[page]})
      })
        .catch(error => {
          console.log("save error")
          this.errorEvent.emit(error)
        });
    }
  }

  /**
   *
   * @param endpoint - endpoint from drive media type
   */
  delete(endpoint): void {
    const promise = this.driveService.request(endpoint);
    promise.then(data => this.driveEvent.emit({page: 'list', drive: data, message: "Delete Successfully"}))
      .catch(error => this.errorEvent.emit(error));
  }

  /**
   *
   * @param endpoint - endpoint from drive media type
   */
  list(endpoint): void {
    let promise = this.driveService.request(endpoint);
    promise.then(data => this.driveEvent.emit({page: 'list', drive: data}))
      .catch(error => this.errorEvent.emit(error));
  }

  /**
   *
   * @param drive - drive media type content
   */
  private renderJSONEditor(drive) {
    const options = {
      schema: drive.schema,
      no_additional_properties: true,
      disable_properties: true,
      disable_edit_json: true
    };

    if (drive.data) {
      options['startval'] = drive.data;
      options['no_additional_properties'] = false;
    }

    this.jsonEditor = new JSONEditor(document.getElementById('editor_holder'), options);
  }
}
