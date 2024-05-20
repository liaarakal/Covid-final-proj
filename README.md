# COVID Website - Lia Arakal, Omar, Laraib, Roya

## Description
This project visualizes the effects of COVID-19, such as informative pie charts, cases by country, trends over time, etc. The application fetches data from multiple reliable APIs and displays it using dynamic charts, allowing users to see the progression of the pandemic through interactive visualizations.

## Target Browsers
This application is designed to be compatible with the following browsers:
- iOS Safari
- Android Chrome
- Desktop Chrome
- Desktop Firefox
- Desktop Edge

# Developer Manual

## Introduction
This document provides instructions for developers who will be maintaining and further developing this project. It includes steps for setting up the application, installing dependencies, and running the application on a server.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have a web browser installed (Chrome, Firefox, Edge, Safari).
- 
## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/oomarumd/Covid-final-proj.git
2. **Navigate to Project Directory**
   cd covid19-trends

## Running the Application
Running Locally
Open the home.html file:
You can simply open the home.html file in your preferred web browser. Right-click the file and select "Open with" and then choose your browser.

## Deployment
To deploy the application on a web server, follow these steps:

Copy the project files to your server:
You can use SCP, FTP, or any other method to transfer the files.

Serve the project directory:
Use a static file server like Nginx, Apache, or a cloud service like GitHub Pages, Vercel, or Netlify to serve the project files.

## Future Development
API Integration:
The application currently fetches data from https://api.covidtracking.com/v1/us/daily.json and other APIs. If this API changes or if additional data sources are required, update the appropriate Javascript functions.

Graph Customization:
The chart configurations are set in the Javascript files. Future developers can customize the look and feel of the graphs by modifying these configurations.

Error Handling:
The current error handling mechanism alerts the user in case of a data fetch failure. Future improvements could include more sophisticated error logging and user notifications.

For any additional questions or issues, please contact the current project maintainers.
