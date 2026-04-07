<<<<<<< HEAD
# Authentication

Given an `app.js` file and a database file `userData.db` consisting of a  table `user`.

Write APIs to perform operations on the table `user` containing the following columns,

**User Table**

| Column   | Type    |
| -------- | ------- |
| username | TEXT |
| name     | TEXT    |
| password | TEXT    |
| gender   | TEXT    |
|location|TEXT|

### API 1

#### Path: `/register`

#### Method: `POST`

**Request**

```
{
  "username": "adam_richard",
  "name": "Adam Richard",
  "password": "richard_567",
  "gender": "male",
  "location": "Detroit"
}
```

- **Scenario 1**

  - **Description**:

    If the username already exists

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Status text**
      ```
      User already exists
      ```

- **Scenario 2**

  - **Description**:

    If the registrant provides a password with less than 5 characters

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Status text**
      ```
      Password is too short
      ```

- **Scenario 3**

  - **Description**:

    Successful registration of the registrant

  - **Response**
      - **Status code**
        ```
        200
        ```
      - **Status text**
       ```
       User created successfully
       ```

### API 2

#### Path: `/login`

#### Method: `POST`

**Request**
```
{
  "username": "adam_richard",
  "password": "richard_567"
}
```

- **Scenario 1**

  - **Description**:

    If an unregistered user tries to login

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Status text**
      ```
      Invalid user
      ```

- **Scenario 2**

  - **Description**:

    If the user provides incorrect password

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Status text**
      ```
      Invalid password
      ```

- **Scenario 3**

  - **Description**:

    Successful login of the user

  - **Response**
    - **Status code**
      ```
      200
      ```
    - **Status text**
      ```
      Login success!
      ```

### API 3

#### Path: `/change-password`

#### Method: `PUT`

**Request**

```
{
  "username": "adam_richard",
  "oldPassword": "richard_567",
  "newPassword": "richard@123"
}
```

- **Scenario 1**

  - **Description**:

    If the user provides incorrect current password

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Status text**
      ```
      Invalid current password
      ```

- **Scenario 2**

  - **Description**:

    If the user provides new password with less than 5 characters

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Status text**
      ```
      Password is too short
      ```

- **Scenario 3**

  - **Description**:

    Successful password update

  - **Response**
    - **Status code**
      ```
      200
      ```
    - **Status text**
      ```
      Password updated
      ```


<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
=======
<<<<<<< HEAD
# Date after 100 Days from Today

Given an `app.js` file, write an API with path `/` using express JS to send the date after 100 days from today as a response in `DD/MM/YYYY` format.

Export the express instance using default export syntax.

Use the third-party package `date-fns`.

<b>Use Common JS module syntax</b>.
=======
<<<<<<< HEAD
# Today's Date

Given an `app.js` file, write an API with path `/` using express JS that sends today's date as a response in `DD-MM-YYYY` format.
=======
<<<<<<< HEAD
# API Routing

Given an `app.js` file, write two APIs that sends different strings as responses.

Refer to the below table for paths and responses,

| Method | Path   | Description                                        |
| ------ | ------ | -------------------------------------------------- |
| GET    | /      | Will send the text <i>`Home Page`</i> as response  |
| GET    | /about | Will send the text <i>`About Page`</i> as response |
=======
<<<<<<< HEAD
# Gadgets Page

Given two files `app.js` and `gadgets.html`, write an API in `app.js` file for the path `/gadgets` that sends the `gadgets.html` file as a response.
=======
<<<<<<< HEAD
# Get a String

Given an `app.js` file, write an API with path `/` using express JS to send `Express JS` text as a response.
>>>>>>> 675326ba8b1cc268a7eb3b7578ebb9c1de0ea093
>>>>>>> 07d0808240bd3fea19180bbf7651c5fa6603382a
>>>>>>> 6b94abfe6d3a0ccf4272d08a0dc89622c2e8e2eb

Export the express instance using default export syntax.

<b>Use Common JS module syntax</b>.
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
# Calculate Ratio and Factorial

Create a file `index.js` in the <b>ratioFactorial</b> directory.

Write a JS function in `index.js` that accepts 3 numbers as arguments and return the ratio of the first two numbers and factorial of the third number in an object with keys as `ratio` and `factorial`.

Export the function using default export syntax.
=======
<<<<<<< HEAD
# First Names of the People

Create a file `index.js` in the <b>names</b> directory.

Write a JS function in `index.js` with function name `getPeopleInCity` that accepts people names list and returns an array of containing the first names of the people.

Export the function using the default export syntax.
>>>>>>> 8cc2c37f0663e1bbdb0e4fff94bba31de8cf1db0

<b>Folder Structure</b>

```
<<<<<<< HEAD
utilities
    - factorial
        - index.js         // contains a function that returns the factorial of the given number

    - ratio
        - index.js         // contains a function that returns the ratio of 2 given numbers

    - ratioFactorial
        - index.js         // create the file and write your code here
```

Use the functions provided in the ratio and factorial directories.

<b>Use Common JS module syntax</b>.
=======
country
    - state
        - city
            - index.js    // contains the people names list
utilities
    - utils
        - index.js        // contains a function that returns the first names of the people
names
    - index.js            // create the file and write your code here
```

Use the given modules.

<b>Use Common JS module syntax</b>.
=======
<<<<<<< HEAD
# Greeting Message

Create a new file `index.js` in the <b>message</b> directory.

Write a JS program to export the string `Hello Rahul! Have a Great Day` using the message from `greeting/index.js`.

Export the template string using the default export syntax.

<b>Use Common JS module syntax</b>.
=======
<<<<<<< HEAD
# Get Date After x Days

Given an `index.js` file parallel to `README.md` file.

Write a JS function that accepts `days` as an argument and return the date after given number of `days` from <b>22nd Aug 2020</b> using the `date-fns` package.

Export the function using the default export syntax.

<b>Date Format</b>

DD-MM-YYYY

<b>Use Common JS module syntax</b>.
=======
<<<<<<< HEAD
# Import and Export a String using ES6 Module Syntax

Create two files `exportString.mjs`, `importString.mjs` parallel to `README.md` file.

Write a string `Be Happy and Safe` in the file `exportString.mjs` and export it using the default export syntax.

Import the string in the `importString.mjs` file.

<b>Use ES6 module syntax</b>.
=======
<<<<<<< HEAD
# Import and Export an Object using Common JS Module Syntax

Create two files `exportObject.js`, `importObject.js` parallel to `README.md` file.

Write an object with keys as `firstName` and `lastName` and values as `John` and `Wilson` respectively in the file `exportObject.js` and export it using the default export syntax.

Import the object in the `importObject.js` file.

<b>Use Common JS module syntax</b>.
=======
<<<<<<< HEAD
# Import and Export a Number using ES6 Module Syntax

Create two files `exportNumber.mjs`, `importNumber.mjs` parallel to `README.md` file.

Write a JS program to export the number `25` from the file `exportNumber.mjs` and export it using the default export syntax.

Import the number in the `importNumber.mjs` file.

<b>Use ES6 module syntax</b>.
=======
<<<<<<< HEAD
# Import and Export Multiple Values using ES6 Module Syntax

Create two files `exportMultipleValues.mjs`, `importMultipleValues.mjs` parallel to `README.md` file.

Write an array, object and a function that in the file `exportMultipleValues.mjs` and export them using the named export syntax.

Import the values in the `importMultipleValues.mjs` file.

<b>Use ES6 module syntax</b>.

The variable names and values are given in the below table,

| Variable       | Type     | Description/Value                                             |
| -------------- | -------- | ------------------------------------------------------------- |
| myArray        | Array    | ["camel", 265, true, "5.6"]                                   |
| bulb           | Object   | {watts: 10, type: "LED"}                                      |
| multiplyByFour | Function | Should accept a number and return a number multiplied by four |
=======
# Import and Export a Function using Common JS Module Syntax

Create two files `exportFunction.js`, `importFunction.js` parallel to `README.md` file.

Write a JS function that returns the `This is a Function` text, in the file `exportFunction.js` and export it using the default export syntax.

Import the function in the `importFunction.js` file.

<b>Use Common JS module syntax</b>.
>>>>>>> f2dfd914799721819601b54e1be1e2e25fa9f295
>>>>>>> 14b45c15062443e1cfecddfd9a1e6084e035d18d
>>>>>>> c3f2e504a8bdc09245e74c7beafb0ff47b540929
>>>>>>> 7c4facdf5ff9b8d79333b60487924da0f3a7e4ca
>>>>>>> 37e07c0be548223a01c6a323c6942819656bb46a
>>>>>>> c188628183c96d25141e655bbad49c7e3d504a9d
>>>>>>> 7c6205e6fa09f9d72174c4e7a33cb365863b2ca3
>>>>>>> 8cc2c37f0663e1bbdb0e4fff94bba31de8cf1db0
>>>>>>> c584e7e371135e8b4819be5b10ae1d7d0d97c5b3
>>>>>>> 675326ba8b1cc268a7eb3b7578ebb9c1de0ea093
>>>>>>> 07d0808240bd3fea19180bbf7651c5fa6603382a
>>>>>>> 6b94abfe6d3a0ccf4272d08a0dc89622c2e8e2eb
>>>>>>> e3117cc728dbe371d87dd8b888fcf01941ea0ed3
>>>>>>> bbe7931d4b998b05a5ca6aa5ac651987406f2c00
