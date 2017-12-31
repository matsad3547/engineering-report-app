# Engineering Report App

This app is designed to allow test engineers to use a simple, configurable report interface to record data on mobile devices, enter data offline, and add to a database that can be accessed later. The app will be responsive to work well in mobile and desktop configurations.

## Most Recent Changes

* Team creation
* Improved loading and error notifications
* Optional loading for reports above the initial 10 available
* Team admin functionality
* Users can now select an existing team at signup
* Https redirect (not recognized in audit :confused: )
* Weather using geolocation added to reports
* Email verification for new accounts

### Admin Features

* Add/delete keywords
* Optionally view reports from all team members

## Current Features

* Record values for keywords on a 1-9 scale, record configuration values for each report, and record notes for each report.
* Save new reports to a Firebase database.
* Access the ten most recent reports recorded in the database.
* View each report as a detailed, easy-to-read table.
* Queue and unqueue reports to be downloaded.
* Download a selected list of reports as a .csv file in order from least to most recent.
* An easy-to-use, intuitive mobile interface.
* User create and sign-in with e-mail and password.
* Unauthenticated demo version of the app with full functionality.
* Basic Progressive Web App functionality
* Select reports for downloading

## Next Steps

### Progressive Web App
* Build service worker and PWA structure so that keywords and a certain number of existing reports are cached for immediate access even without internet connection.
* Enable saving of reports without a connection so that cached reports will be pushed to online database when an internet connection is reestablished.

### Authentication
* A configuration system to approve users before signed up users are fully authenticated.

### Interface
* Using user feedback, build a more usable desktop version of the app.
* Visualization package to show trends across selected reports.
