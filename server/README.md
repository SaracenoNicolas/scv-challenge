
# Server

A server using express

## Data
I do not put a database so this doesn't persist anywhere, I did put 2 objects for working with the UI, this are modeled mostly on how I expected the API to answer but the idea I have is that there should be an Investment Table and a User Table and the BE queries this databases when need it.

## Document the API
 - GET **/api/investments:** Returns the list of all the available investments on the application
 - PUT **/api/investments:** Update and investment value. <br>Needs the following object in the body request<br>`{id: int, value: int}`<br>and the following header has to be present on the request <br>`'Content-Type':  'application/json'`
 - GET **/api/investments/:id :** Returns the investment with the specified id
 - GET **/api/holdings:** Returns all the investments for the user and his cash amount
 - POST **/api/holdings/:** Handles the User Buy/Sell requests <br> Needs the following object in the body request <br>`{id: int, amount: int}`<br> where **id** is the investment id and **amount** is the buy/sell quantity. <br> The **amount** property can be positive or negative. Positive will be buying and Negative will be selling.

