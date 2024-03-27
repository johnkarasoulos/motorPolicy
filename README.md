# Web Application Issue Motor Policies 
This sample web application demonstrates how to integrate and connect to an ATP database through ORDS and use custom Business Objects and ATP ORDS to retrieve and store data in both repositories at the same time. 
The application it is used to enter all the required data, to estimate the cost of a motor policy and then issue the insurance polocy. The application uses two tables deployed in a OCI Autonomous Database (ATP) with ORDS enabled.  

### Create database tables 
#### Premium lookup table 
```
CREATE TABLE PMS_PREMIUM ( BODY_TYPE    VARCHAR2 (4000) , BASE_PREMIUM NUMBER (*,0) ) TABLESPACE DATA LOGGING ;
```
Into this table you can insert values like: (BODY_TYPE: Saloon ; BASE_PREMIUM; 1000) and (4x4 ; 2000)

#### Policy Management System table 
```
CREATE TABLE PMS_POLICY 
    ( 
     POLICYNO  NUMBER (8) DEFAULT "ADMIN"."ID_PMS_Policy"."NEXTVAL" , 
     FIRSTNAME VARCHAR2 (30) , 
     DOB       VARCHAR2 (10) , 
     AGE       NUMBER (*,0) , 
     BODYTYPE  VARCHAR2 (20) , 
     HIGHRISK  VARCHAR2 (20) , 
     NOOFPASS  NUMBER (*,0) , 
     PREMIUM   NUMBER (*,0) 
    ) 
    TABLESPACE DATA 
    LOGGING 
;

ALTER TABLE ADMIN.PMS_POLICY 
    ADD PRIMARY KEY ( POLICYNO ) 
    USING INDEX LOGGING ;`
```
Once both table are created then you can enable the REST services for both tables. 

## From github repository to Oracle VisualBuilder application. 
If you wish to deploy the sample source code into your own Visual Builder Platform, you can apply the following steps.
1. Connect to your Oracle Visual Builder Studio Instance
2. Into an existing Project OR Create a new project --> create a new git repository by importing the existing public GitHub repository.
   ![Screenshot 2024-03-25 at 12 33 33](https://github.com/johnkarasoulos/aircraftBlockchain/assets/25766024/235cf9ae-c01f-449a-8764-96fdda1e543b)

3. Create a new Workspace using the button "Clone From Git" where you are selecting the Repository Name, the Branch , the Development Environment and you are providing the name of the Workspace Name.

   <img width="450" alt="Screenshot 2024-03-27 at 19 17 06" src="https://github.com/johnkarasoulos/motorPolicy/assets/25766024/10d702b0-5e12-458b-8241-f24062431761">

5. You are redirected to the new VisualBuilder instance assigned to this workspace and you can start working.  


## Configure REST Endpoints
Once the tables are created and the application is cloned into your own workspace, update the backend server with the ORDS URL as depicted in the following picture: 

<img width="450" alt="Screenshot 2024-03-27 at 19 20 43" src="https://github.com/johnkarasoulos/motorPolicy/assets/25766024/e4a97300-e4bf-495d-917d-58dc0f4cf0fa">

