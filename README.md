# drive-ui
drive-ui is a project demonstrate how the drive media type could be integrated with frontend application.

## Prerequisites
* [drive-api](https://github.com/DigitalRiverConnect/drive-api) as backend application running on your local machine

## Installation steps
* Install Node 6.9.0 or higher, together with NPM 3 or higher. (Install as Administrator on Windows platform
  otherwise error may occurred in next step)
* npm install -g @angular/cli
* ng serve --open

## How it works
drive-ui design as SPA (Single-Page Application) is a Web application that load a single HTML page and dynamically
update page according to different content.

UI flow is defined in Links object of drive, which mean drive-ui request to the endpoint provided in Links object
and render the page by response content. Therefore only one endpoint for entry is known by drive-ui and all the other
endpoint will provided by backend service.

Three main components of drive-ui:
* drive component: The base component, it will render web pages base on the response from drive-api.
* drive-list component: List/main page of drive-ui.
* drive-item component: The page for create and update.

## References
* [drive](https://github.com/DigitalRiverConnect/drive)
* [drive-api](https://github.com/DigitalRiverConnect/drive-api)
