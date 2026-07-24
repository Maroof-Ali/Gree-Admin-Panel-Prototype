## Business Requirements

- The application will be used by a company representative to see the analytics, product registrations and contractor registrations.
- The first screen will be the login screen
- After login is success, we will show the dashboard and a side menu
- The login user will have a particular role i.e. Super Admin, Admin, etc
- The Header will have company logo on the top left and logout button on the top right
- The Footer will have generic trademark information
- Business requirment of each option in the side menu is described below

## Side menu options

- Dashboard
- Product Models
- Product Serials
- Product Registrations
- Registered Contractors
- Pending Contractors
- Upload Product Serials
- Users
- Roles
- Add relevant icons with each option

## Dashboard
- The home screen will be a dashboard showing analytics
- most selling products
- top 5 selling contractors
- total number of product registered this year
- for now we can keep these, but later we can add other analytics.

## Product Models
- When this option is clicked a table will be displayed with filters, sortable columns and pagination.
- The table will have following columns Model No, Series Name, Description, Voltage, CH Type, Capacity(BTU), Capacity(Ton)
- The data will be fetched from backend from a paginated query, 50 models will be shown initially.
- The data from backend will include id, model, seriesName, categoryDescription, voltage, chType, capacityBtu, capacityTon, createdAt and map it on each row
- When a row is clicked a new component will be opened in edit mode with all the fields in edit mode and below are save cancel and delete buttons
- When Save is clicked, an API will be called to save product model, cancel is clicked move back to table and when delete is clicked, ask for confirmation and delete the model via API call
- Above Table there will be a Add Produt Model button, on click it will open a form to add new product model
- Manage breadcrumbs like Product Models > Add or Product Models > Edit

## Product Serials

- When this option is clicked a table will be displayed with filters, sortable columns and pagination.
- The table will have following columns Serial No, Customer Serial No, Product Model
- The data will be fetched from backend from a paginated query, 50 serials will be shown initially.
- The data from backend will include id, serialNo, customerSerialNo, productModel, createdAt and map it on each row
- When a row is clicked a new component will be opened in edit mode with all the fields in edit mode and below are save cancel and delete buttons
- When Save is clicked, an API will be called to save product serial, cancel is clicked move back to table and when delete is clicked, ask for confirmation and delete the model via API call
- Above Table there will be a Add Produt Serial button, on click it will open a form to add new product serial
- Manage breadcrumbs like Product Serial > Add or Product Serial > Edit

## Product Registrations
- Follow the same as Product Serials
The database fields are id
first_name
last_name
phone
email
address1
address2
zip_code
city
state
country
different_mailing_address
marketing_promotion
registrant_role
installation_date
installation_type
inactive
product_serial_id
contractor_id
created_at

## Registered Contractors
- Follow the same as Product Serials
The database fields are
id
contractor_name
phone_no
email_address
address
city
zipcode
state
applicant_name
applicant_title
status
approved_by
created_at
updated_at

## Pending Contractors

- Follow the same as Product Serials

The database fields are id
contractor_name
phone_no
email_address
address
city
zipcode
state
applicant_name
applicant_title
status
approved_by
created_at
updated_at

- When row is click a new component is opened, there is button below approve, on clicking an API will be called.


## Upload Product Serials

- A table with filename and upload status, it will fetched from database
- Backedn will process this in an separate thread and update the file status 
- In the last column the report will be downloaded in a excel file
- Above table there will be a file input field for excel and Upload button


## Technical Details

- Implemented as a modern React JS app, client rendered
- Use production grade coding standards and the app should be responsive
- The client side will call the APIs to fetch data from backend
- Manage Role based Auth in the application
- For now add dummy request and responses in the API calls, make it feasible to integrate APIs later
- Add router to manage protected routes based on user roles
- Add a default route of 404
- Use Toast for to show Success and Error of API calls and processes
- separate styles and css and use classes in the components
- Create a production grade software design and folder structure which can be easily managed is application is scaled
- Use same class or category of icons
- The application should be responsive to different screen sizes

## Color Scheme

| Element        | Color     |
| -------------- | --------- |
| Background     | `#F8FAFC` |
| Surface        | `#FFFFFF` |
| Sidebar        | `#0F172A` |
| Primary        | `#2563EB` |
| Primary Hover  | `#1D4ED8` |
| Success        | `#22C55E` |
| Warning        | `#F59E0B` |
| Error          | `#EF4444` |
| Text           | `#1E293B` |
| Secondary Text | `#64748B` |
| Border         | `#E2E8F0` |


## Strategy

1. Write plan with success criteria for each phase to be checked off. Include project scaffolding, including .gitignore.
2. Execute the plan ensuring all critiera are met
4. Only complete when the game is finished and tested, with the server running and ready for the user

1. Analyze the whole flow and create in this order Login screen, Dashboard, Side Menu and so on.
2. Execute the plan ensuring all critiera are met
3. Only complete when the application development is finished and tested, with the server running and ready for the user
4. Each clickable element is working

## Coding standards

1. Use latest versions of libraries and idiomatic approaches as of today
2. Keep it simple - NEVER over-engineer, ALWAYS simplify, NO unnecessary defensive programming. No extra features - focus on simplicity.
3. Be concise. Keep README minimal. IMPORTANT: no emojis ever
