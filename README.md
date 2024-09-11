# Sirma Solutions Final Exam Project

## Football tournament website 

## Overview

This project was developed as part of the **Final Exam** for the Sirma Solutions program. The purpose of this project is to demonstrate skills in working with React.

The application provides features to manage and visualize match data and player statistics from CSV files. It implements several data validation mechanisms and displays the results through a user-friendly interface.

On the home page `/`, the results of all matches played up to the final date of June 26, 2024, are displayed, along with the winner of each match. Additionally, the home page shows the teams in each group with their information on points, wins, draws, and losses. When a `row in the results table is clicked`, a new page `/matchDetails` is rendered.

In `/matchDetails`, information about the played match is displayed, including the team names, group, match score, and a table listing all participants who played in the match. The table shows information for each participant, including their full name, position, and how long they played in the match.

The application also contains a `TeamDetails` page. In `/teamDetails`, information about all teams is displayed. You can select a specific team using the `"Filter by TeamID" button` to filter by team number. The data for all teams or the selected team can also be `sorted by position by clicking on the "position" field`.

## Features

- **CSV File Handling**: Load and parse player,matches,records  and teams from CSV files.
- **Data Validation**: Multiple validation functions for player,matches,records  and teams, ensuring data integrity.
- **Sorting and Filtering**: Sort players  by TeamID and Position parameters into  rout `/teamDetails`.
- **Detailed Match View**: Display detailed information about matches and players, including playing time, positions,full name, Score and match ID into  rout `/matchDetails`.
- **Error Handling**: Display of validation errors and data load issues in the user interface.


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


