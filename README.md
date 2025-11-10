#TPRM Backend APIs

- A simple project to implement the TPRM backend APIs to create/view vendors based on permissions.

##UserAPIs

- This section deals with the APIs to create user profiles/update users etc.

##Vendor APIs

This section deals with the APIs related to Vendors such as CreateVendor, ViewVendor & updateVendor etc.

1. CreateVendor : 
- Users with the Admin access only can create Vedors

2. ViewVendor:
- Read access to Vendor profiles will be seggregated based on the user type - external/Internal.
- External users can only see the vendors on which they are assigned as a Vendor Contact.
- Internal Users can read/see/access any vendor profile.

3. BulkUpdateVendor

- By this, I am trying to mimic Data Import feature in Archer where we upload a CSV file with some records
- Each row in the file represents a record on its own
- And the data in the file would replace/overried the data in Target System
- Only Admin can perform this bulk data update for vendors
- Leveraged Multer , CSV parser NPM modules as part of the implementation.






