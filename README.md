# bc-19-inventory-management

[![Build Status](https://travis-ci.org/ajudensi/bc-19-inventory-management.svg?branch=master)](https://travis-ci.org/ajudensi/bc-19-inventory-management)
[![Code Climate](https://codeclimate.com/github/ajudensi/bc-19-inventory-management/badges/gpa.svg)](https://codeclimate.com/github/ajudensi/bc-19-inventory-management)
[![Issue Count](https://codeclimate.com/github/ajudensi/bc-19-inventory-management/badges/issue_count.svg)](https://codeclimate.com/github/ajudensi/bc-19-inventory-management)

## TASKS
This app should be able to keep inventory of Andela’s assets, mainly electronics e.g. laptop, projector, cables, etc. - The admins for this app, are staff members in the Ops and Facilities Department and the rest are staff members (and fellows)

### What is Inventory management?
[Inventory management is the practice overseeing and controlling of the ordering, storage and use of components that a company uses in the production of the items it sells. Inventory management is also the practice of overseeing and controlling of quantities of finished products for sale. A business's inventory is one of its major assets and represents an investment that is tied up until the item sell](http://www.investopedia.com/terms/i/inventory-management.asp#ixzz4ZaIpXMFu )

### I-Manager ONLINE
[https://bc-19-inventory-manager.herokuapp.com/](https://bc-19-inventory-manager.herokuapp.com/)

### How to use the app

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

```javascript
npm start
```
