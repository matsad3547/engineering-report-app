#Engineering Report App

This app is designed to allow test engineers to use a simple, configurable report interface to record data on mobile devices, enter data offline, and add to a database that can be accessed later. The app will be responsive to work well in mobile and desktop configurations.

##Current Features

* Record values for keywords on a 1-9 scale, record configuration values for each report, and record notes for each report.
* Save new reports to a Firebase database.
* Access the ten most recent reports recorded in the database.
* View each report as a detailed, easy-to-read table.
* Queue and unqueue reports to be downloaded.
* Download a selected list of reports as a .csv file in order from least to most recent.
* An easy-to-use, intuitive mobile interface.

##Next Steps
###Authentication
* Authentication to limit access to the app data to only approved users
* An accompanying unauthenticated demo version of the app.
* Authentication-controlled database partitions to allow team leaders to configure the report format keywords while keeping these keywords private from other teams or unauthenticated users.
* A configuration interface page to allow administrators to control the ability to define test parameter keywords and approve users for their teams.
###interface
* Using user feedback, build a more usable desktop version of the app.
