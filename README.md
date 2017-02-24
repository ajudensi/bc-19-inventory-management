# bc-19-inventory-management

[![Build Status](https://travis-ci.org/ajudensi/bc-19-inventory-management.svg?branch=master)](https://travis-ci.org/ajudensi/bc-19-inventory-management)
[![Code Climate](https://codeclimate.com/github/ajudensi/bc-19-inventory-management/badges/gpa.svg)](https://codeclimate.com/github/ajudensi/bc-19-inventory-management)
[![Issue Count](https://codeclimate.com/github/ajudensi/bc-19-inventory-management/badges/issue_count.svg)](https://codeclimate.com/github/ajudensi/bc-19-inventory-management)

## TASKS
This app should be able to keep inventory of Andela’s assets, mainly electronics e.g. laptop, projector, cables, etc. - The admins for this app, are staff members in the Ops and Facilities Department and the rest are staff members (and fellows)

### What is Inventory management?
[Inventory management](http://www.investopedia.com/terms/i/inventory-management.asp#ixzz4ZaIpXMFu) is the practice overseeing and controlling of the ordering, storage and use of components that a company uses in the production of the items it sells. Inventory management is also the practice of overseeing and controlling of quantities of finished products for sale. A business's inventory is one of its major assets and represents an investment that is tied up until the item sell

### I-Manager ONLINE
[https://bc-19-inventory-manager.herokuapp.com/](https://bc-19-inventory-manager.herokuapp.com/)

### How I-Manager works
A super admin regulates access and use of this application.
Admins, have access to regulates the use and assignment of assets to regular uses.
The ability to register other admins separates "super admin" from "admins"
All self registered are "regular" users and cannot perform any administrative TASKS
All regular users can report items assigned to them as lost, or lost but found.
Notifications (email and web) for due items, or items past due date.

##### For all users
1. [Register](https://bc-19-inventory-manager.herokuapp.com/register)
2. Confirm your email address
3. [Login](https://bc-19-inventory-manager.herokuapp.com/login)
4. View items assigned to your
5. Report case of lost item
6. Report case of lost but found items

##### For admins
1. Assign assets to users
2. Unassign assets to users
3. View available and assigned assets

##### For Super admins
1. Register admins
2. Perform all the above functions

### Features
1. Constant feedback (When account is created, account is accessed, assest is assigned, asset is unassigned, a report is made)
2. Notifications for due dates. (Web and mail)

### Developer Usage
First install all dependencies

```javascript
npm install
```
To run application, get create a [firebase project](https://console.firebase.google.com/) to get configuration keys
```javascript
npm start
```

##### Technologies

| Technology                                  | Link|
|_____________________________________________|____________________________|
|Node.js                                        [Nodejs]()
|_____________________________________________|____________________________|
|Express.js                                     [Express.js]()
|_____________________________________________|____________________________|
|firebase                                       [Firebase]()
|_____________________________________________|____________________________|
|Gulp.js                                        [Gulp](http://gulpjs.com/)
|_____________________________________________|____________________________|
|Nodemailer                                     [Nodemailer]()
|_____________________________________________|____________________________|
|BrowserSync                                    [BrowserSnc]()
______________________________________________|____________________________|

## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/ajudensi/bc-19-inventory-management/issues)
