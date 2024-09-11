# Sirma Solutions Final Exam Project
## Overview

This project was developed as part of the **Final Exam** for the Sirma Solutions program. The purpose of this project is to demonstrate skills in working with React.

The application provides features to manage and visualize match data and player statistics from CSV files. It implements several data validation mechanisms and displays the results through a user-friendly interface.



### Installation Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/ZdravkaGoranova/Sirma-Solutions-Final-Exam.git
    cd Sirma-Solutions-Final-Exam
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

    The application should now be running on `http://localhost:5173`.


 ## Architecture - the project is structured

 - `public` folder contains global asssets for the app(european.jpg, `players.csv`,`matches.csv`,`records.csv`,`teams.csv`  ).
 - `src` folder contains the App.jsx, main.jsx, index.css, App.css  and folders for the components, utils and assets.
   - `components` folder - properly named folder for each component that includes the component itself, the css  for the component).
     - `Footer` folder - properly named folder for each component that includes the component itself, the css  for the component).
     - `GroupList` folder - properly named folder for each component that includes the component itself, the css  for the component).
     - `Header` folder - properly named folder for each component that includes the component itself, the css  for the component).
     - `Home` folder - properly named folder for each component that includes the component itself, the css  for the component).
     - `Loading` folder - properly named folder for each component that includes the component itself, the css  for the component).
     - `MatchDetails` folder - properly named folder for each component that includes the component itself, the css  for the component).
     - `Navigation` folder - properly named folder for each component that includes the component itself, the css  for the component).
     - `TeamDetails` folder - properly named folder for each component that includes the component itself, the css  for the component).
   - `utils` folder - properly named folder for each component that includes the component itself, the css  for the component).
   - `assets` folder - properly named folder for each component that includes the component itself, the css  for the component).
 - `App.jsx` 
 - `main.jsx`
 - `index.css`
- `App.css`
  
### Routes:

Here are the available routes:

- `/` : homepage 
- `/teamDetails` :displays team details view
- `/matchDetails` : displays match details views

# Routes views

## Home Page view Group Winner
![](/home-groupWinner.jpg)

## Home Page view Result of Matches
![](/home-resultMatches.jpg)

## Home Page view Validations
![](/home-validation.jpg)

## Match Details Page
![](/matchDetails.jpg)

## Match Details Page Validations
![](/matchDetails-validation.jpg)

## Team Details Page
![](/teamDetails.jpg)

## Team Details Page filter
![](/temsDetail-filter.jpg)

## Team Details Page Position- filter
![](/teamsDetails-position-filter.jpg)


