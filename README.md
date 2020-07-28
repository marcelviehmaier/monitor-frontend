# Monitor-Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.4.

## Purpose of this project

The project provides a frontend to display departures for a stop. By default the departures of the station Pforzheim Wildpark are displayed.
The following information are displayed in form of a table:
* Transportation Type: Image
* Transportation Number: Text
* Time: Text
* Destination: Text
In the header are the name of the station and the date is displayed.

## Development server

To run this project yout first need to start the backend, which provides the data that sgould be displayed with this project. The backend is accessible via the following link:
https://github.com/marcelviehmaier/abfahrtsmonitor.
After starting the backend, run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
