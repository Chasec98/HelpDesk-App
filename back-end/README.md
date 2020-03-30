# Back-End API Server
### Tickets
#### GET
```
/api/tickets
```
Returns all open tickets unless ticket number specified
<b>Parameters: </b><br/>
* ticketNumber - Returns single ticket by ticket number

#### POST
```
/api/tickets
```
<b>Parameters: </b>None<br/>
<b>Body:</br><br/>

#### PUT
```
/api/tickets
```
<b>Parameters: </b>None<br/>
<b>Body:</br><br/>

### Stats
```
/api/stats/numClosed
```
Returns stats on how many tickets were closed in 1,7 and 30 days
<b>Parameters: </b>None<br/>
