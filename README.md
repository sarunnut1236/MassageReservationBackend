# SwDevPracBackendProject | Massage Reservation
## Developer
- S.Lapsuksathit
- S. Angsirikulchote

## Functional Requirements
<ol>
<li>
  The system shall allow a user to register by specifying the name, <b>telephone number</b>, email, and 
password.
</li>
<li>
  After registration, the user becomes a registered user, and the system shall allow the user to log in to 
use the system by specifying the email and password. The system shall allow a registered user to log 
out.
</li>
  <li>
    After login, the system shall allow the registered user to reserve up to 3 queues by specifying the date 
and the preferred massage shop. The massage shop list is also provided to the user. A massage shop 
information includes the name, address, telephone number, and open-close time.
  </li>
  <li>
    The system shall allow the registered user to view his/her massage reservation.
  </li>
  <li>
    The system shall allow the registered user to edit his/her massage reservation.
  </li>
  <li>
    The system shall allow the registered user to delete his/her massage reservation.
  </li>
  <li>
    The system shall allow the admin to view any massage reservation.
  </li>
  <li>
    The system shall allow the admin to edit any massage reservation.
  </li>
  <li>
    The system shall allow the admin to delete any massage reservation.
  </li>
  <li>
    Once a user massage reservation is successful, the system shall send a confirmation email upon successful reservation.
  </li>
</ol>
  
## Non-functional Requirements
  <ol>
    <li>
      The system shall authenticate users using a username and password.
    </li>
    <li>
      The system shall be able to keep user’s transactions 
confidential.
    </li>
    <li>
      The system shall response to a request in 3 seconds.
    </li>
    <li>
      The system shall be used and test via Postman.
    </li>
  </ol>
</ol>

## Class Diagram
The project consists of 3 main routes
<ol>
  <li>Authentication System</li>
  <li>Massage Shop System</li>
  <li>Reservation System</li>
</ol>
<img src="https://github.com/sarunnut1236/SwDevPracBackendProject/blob/main/diagrams/ClassDiagram.png" alt="Class Diagram">
