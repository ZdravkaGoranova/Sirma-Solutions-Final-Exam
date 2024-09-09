import { useEffect, useState } from 'react';
import { loadCSV } from '../utils/csvUtils.js';

import Loading from './Loading.jsx';
import GroupList from './GroupList.jsx';

export default function Home() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [teamMap, setTeamMap] = useState({});

  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);
  const [groupC, setGroupC] = useState([]);
  const [groupD, setGroupD] = useState([]);
  const [groupE, setGroupE] = useState([]);
  const [groupF, setGroupF] = useState([]);

  const groups = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
  };

  useEffect(() => {
    async function fetchData() {
      const matchesData = await loadCSV('/matches.csv');
      const teamsData = await loadCSV('/teams.csv');

      const parsedMatches = matchesData.map((match) => {
        const [month, day, year] = match.Date.split('/');
        const formattedDate = new Date(`${year}-${month}-${day}`);
        return { ...match, Date: formattedDate };
      });

      const endDate = new Date('2024-06-26');

      const filteredMatches = parsedMatches.filter(
        (match) => match.Date <= endDate,
      );

      let teamsDetails = teamsData.reduce((acc, team) => {
        acc[team.ID] = {
          id: team.ID,
          name: team.Name,
          points: 0,
          wins: 0,
          draws: 0,
          losses: 0,
        };
        return acc;
      }, {});
      console.log(teamsDetails);

      let map = teamsData.reduce((acc, team) => {
        acc[team.Name] = {
          id: team.ID,
          points: 0,
          wins: 0,
          draws: 0,
          losses: 0,
        };
        return acc;
      }, {});

      console.log(map);

  

      teamsData.forEach((team) => {
        if (groups[team.Group]) {
          groups[team.Group][team.Name] = {
            name: team.Name,
            ...map[team.Name],
          };
        }
      });

      console.log(groups);

      setGroupA(groups.A);
      setGroupB(groups.B);
      setGroupC(groups.C);
      setGroupD(groups.D);
      setGroupE(groups.E);
      setGroupF(groups.F);

      setMatches(filteredMatches);
      setTeams(teamsDetails);
      setTeamMap(map);
    }

    fetchData();
  }, []);

  console.log(matches);

  const getWinner = (ATeamID, BTeamID, score) => {
    const [aScore, bScore] = score.split('-').map(Number);

    if (aScore > bScore) {
      return ATeamID;
    } else if (bScore > aScore) {
      return BTeamID;
    } else if (bScore == aScore) {
      return 'Draw';
    }
  };

  return (
    <>
      <div>
        <h1>Groups</h1>
        {teams.length <= 0 ? (
          <Loading />
        ) : (
          <div className="groups">
            <GroupList groupName="Group A" groupTeams={groupA} />
            <GroupList groupName="Group B" groupTeams={groupB} />
            <GroupList groupName="Group C" groupTeams={groupC} />
            <GroupList groupName="Group D" groupTeams={groupD} />
            <GroupList groupName="Group E" groupTeams={groupE} />
            <GroupList groupName="Group F" groupTeams={groupF} />
          </div>
        )}
        <h1>Results of the matches</h1>
        {matches.length <= 0 ? (
          <Loading />
        ) : (
          <table id="players">
            <thead>
              <tr>
                <th>Winner</th>
                <th>ATeamID</th>
                <th>Score</th>
                <th>BTeamID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => (
                <tr key={index}>
                  <td>
                    {getWinner(
                      teamMap[match.ATeamID],
                      teamMap[match.BTeamID],
                      match.Score,
                    )}
                  </td>
                  <td>{teamMap[match.ATeamID] || 'Unknown'}</td>
                  <td>{match.Score}</td>
                  <td>{teamMap[match.BTeamID] || 'Unknown'}</td>
                  <td>{match.Date.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

// const updatePoints = (winnerID, loserID, groupName) => {
//   // if (winnerID !== 'Draw') {
//   //   groups[groupName][teamMap[winnerID]].points += 3;
//   //   groups[groupName][teamMap[winnerID]].wins += 1;
//   //   groups[groupName][teamMap[loserID]].losses += 1;
//   // } else {
//   //   groups[groupName][teamMap[winnerID]].points += 1;
//   //   groups[groupName][teamMap[loserID]].points += 1;
//   //   groups[groupName][teamMap[winnerID]].draws += 1;
//   //   groups[groupName][teamMap[loserID]].draws += 1;
//   // }
//   // console.log(winnerID);
//   // console.log(loserID);
//   // console.log(groupName);
// };

// if (resultOfMatch !== 'Draw') {
//   // Ако resultOfMatch е число
//   console.log('Това е число:', resultOfMatch);
//   const teamName = map[Number(resultOfMatch)];
//   console.log(teamName);
// } else if (resultOfMatch === 'string') {
//   // Ако resultOfMatch е текст
//   console.log('Това е текст:', resultOfMatch);
// }

// if (resultOfMach === 'Draw') {
//   groups[groupName][match.ATeamID].points += 1;
//   groups[groupName][match.ATeamID].draws += 1;

//   groups[groupName][match.BTeamID].points += 1;
//   groups[groupName][match.BTeamID].draws += 1;
// }

// updatePoints(winnerID, match.ATeamID, match.Group);
// updatePoints(winnerID, match.BTeamID, match.Group);
