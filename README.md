# Weather App

A dynamic weather application that fetches live weather and country data using public APIs. Built as part of [The Odin Project](https://www.theodinproject.com/) curriculum, this project is intended for educational purposes and as part of my ongoing learning journey in web development. It also serves to demonstrate my ability to integrate APIs, manage client-side storage, and build responsive, user-friendly interfaces.

---

## Features

- **Live Weather Data**  
  Retrieves current conditions, real feel, humidity, and a four-day forecast.  

- **Country Detection**  
  Displays the country corresponding to the searched city.  

- **Unit Preference**  
  Supports both Celsius and Fahrenheit. User preference is saved in `localStorage`.  

- **Save/Delete Locations**  
  - Cities can be saved for quick access.  
  - Duplicates are prevented using a `Set` for storage logic.  
  - If a city is already saved, the button switches to a **Delete City** option.  

- **Persistent Storage**  
  Uses `localStorage` to persist saved cities and unit preferences across sessions.  

- **Responsive Interface**  
  Updates dynamically without requiring page reloads.  

---

## Technologies Used

- **JavaScript (ES6)** for DOM manipulation and event handling.  
- **HTML5 & CSS3** for structure and styling.  
- **Webpack** for module bundling.  
- **APIs**:  
  - Weather data API (provides current conditions and forecasts).  
  - Country API (resolves the country of a given city).  

---

## Learning Objectives

This project was designed to practice and demonstrate:  

- Working with **third-party APIs**.  
- Managing **asynchronous code** with `async/await`.  
- Implementing **client-side storage** (`localStorage`) for persistence.  
- Preventing duplicates in data storage using a `Set`.  
- Building **modular JavaScript** with ES6 imports/exports.  
- Handling DOM updates efficiently to keep UI consistent with state.  

---

## Usage

1. Search for a city using the search bar.  
2. View current weather, real feel, humidity, and forecast.  
3. Save a city to your locations list, or delete it if already saved.  
4. Switch between Celsius and Fahrenheit using the unit buttons.  
5. Access saved cities from the locations menu.  

---

## Educational Purpose

This project is part of [The Odin Project](https://www.theodinproject.com/) curriculum. It is not intended for commercial use but rather to showcase progress in learning modern JavaScript development practices. Recruiters are welcome to view this as an example of my hands-on approach to problem-solving, integrating APIs, and writing clean, modular code.  

---

## License

This project is open-source.