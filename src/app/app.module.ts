import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DriveComponent } from './drive/drive.component';
import { DriveService } from './drive/drive.service';
import { DriveListComponent } from './drive/drive-list/drive-list.component';
import { PopoverModule } from './popover/popover.modules';
import { KeysPipe} from './pipe/keys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DriveComponent,
    DriveListComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PopoverModule
  ],
  providers: [
    DriveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
