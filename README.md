
# JWEB Developer Code Challenge

## Setup

Get the project up and running locally.

1. Clone the API repo
2. Create a new branch called 'firstName-lastName'
3. Start the app using the 'start' script.
4. Troubleshoot any startup issues....


## Challange 1: Fix the DB issue

There are 3 users in the database. Jeff, Karina, and Jason.  When running the endpoint
```
http://localhost:3080/v1/user
```
we are getting Jeff duplicated multiple times in the payload, Karina is correct, but Jason is not in the list at all.  Troubleshoot and figure out why.

Once fixed, push your changes to origin.

## Challenge 2:  Fix the get user endpoint

A developer needs help!!

When they execute the following query, they are not getting the results they expect.  

```
http://localhost:3080/v1/user/US12345678901234567890123456789012
```

They are getting a 401 response back.  Help them troubleshoot it.

Once fixed, make sure the API call is working as expected.  


## Challenge 3:  Create a DELETE user endpoint

We need to delete users. Using the same structure as the others, create an endpoint to delete the user.  Let's talk through the best way to do so and how you would make it happen.  Code it.


## Challenge 4:  ReactJS

We need to create a basic ReactJS app that utilizes the API we created to list all users in the database.  

Create a new folder and project that uses ReactJS.  How you implement it is up to you.  

Don't worry about a login or any styling.  We just need to make sure we can use the API to gain access to the user.  


## BONUS:  Let's talk.  
