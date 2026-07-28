# US Cities Search

## Project Overview

US Cities Search is a web application that allows users to search for U.S. city information by entering either a ZIP code or a city name. The application communicates with an Azure-hosted USCities Microservice that retrieves data from a MongoDB Atlas database and returns the results in JSON format. The frontend then displays the information in a clean and responsive table without reloading the page.

---

## Features

- Search cities by ZIP code
- Search cities by city name
- Real-time communication with an Azure-hosted REST API
- Displays search results in a responsive HTML table
- Client-side input validation
- Error handling for invalid searches and network failures
- Responsive user interface built with HTML, CSS, and JavaScript

---

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (Fetch API)

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Cloud Services
- Microsoft Azure App Service

### Version Control
- Git
- GitHub

---

## Project Structure

```
uscities-search/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## How It Works

1. The user enters a ZIP code or city name.
2. The frontend validates the input.
3. A JavaScript Fetch API request is sent to the Azure-hosted USCities Microservice.
4. The microservice queries MongoDB Atlas.
5. Matching city records are returned as JSON.
6. The frontend dynamically displays the results in a table.

---

## API Endpoints

### Search by ZIP Code

```
GET /uscities-search/:zip
```

Example

```
/uscities-search/45202
```
<img width="844" height="358" alt="image" src="https://github.com/user-attachments/assets/8ec426dd-f294-47ab-8a44-f40302c5e37a" />


---

### Search by City Name

```
GET /uscities-search/:city
```

Example

```
/uscities-search/Cincinnati
```
<img width="852" height="448" alt="image" src="https://github.com/user-attachments/assets/d20fa65e-434d-4b72-8431-51b83642a496" />


---

## Example Response

```json
[
  {
    "city": "Cincinnati",
    "state_id": "OH",
    "state_name": "Ohio",
    "county_name": "Hamilton",
    "timezone": "America/New_York",
    "zips": "45267 45203 45207 ..."
  }
]
```

---

## Screenshots

### Search by ZIP Code

Displays all matching cities whose ZIP codes contain the entered value.

<img width="778" height="597" alt="image" src="https://github.com/user-attachments/assets/0633edaa-e996-4550-b17c-e73382b9dcf8" />


### Search by City Name

Displays all matching cities whose names contain the entered text.

<img width="779" height="388" alt="image" src="https://github.com/user-attachments/assets/e3937a5a-fd11-496f-af77-ef0434f6173b" />


---

## Author

**Randa Alhalabieh**

Computer Engineering  
University of Cincinnati

---

## License

This project was developed for the University of Cincinnati Software Engineering course.
