import { useEffect, useState } from 'react';
import { loadCSV } from '../utils/csvUtils.js';

import './Home.css';
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

      const map = teamsData.reduce((acc, team) => {
        acc[team.ID] = team.Name;
        return acc;
      }, {});
      console.log(map);

      const groups = {
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
      };

      teamsData.forEach((team) => {
        if (groups[team.Group]) {
          groups[team.Group].push(team.Name);
        }
      });

      setGroupA(groups.A);
      setGroupB(groups.B);
      setGroupC(groups.C);
      setGroupD(groups.D);
      setGroupE(groups.E);
      setGroupF(groups.F);

      setMatches(filteredMatches);
      setTeams(teamsData);
      setTeamMap(map);
    }

    fetchData();
  }, []);

  const getWinner = (ATeamID, BTeamID, score) => {
    const [aScore, bScore] = score.split('-').map(Number);
    if (aScore > bScore) return ATeamID;
    if (bScore > aScore) return BTeamID;
    return 'Draw';
  };

  return (
    <>
      <div>
        <h1>Groups</h1>

        <div className="groups">
          <GroupList groupName="Group A" groupTeams={groupA} />
          <GroupList groupName="Group B" groupTeams={groupB} />
          <GroupList groupName="Group C" groupTeams={groupC} />
          <GroupList groupName="Group D" groupTeams={groupD} />
          <GroupList groupName="Group E" groupTeams={groupE} />
          <GroupList groupName="Group F" groupTeams={groupF} />
        </div>

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

{
  /* <h2>Groups</h2>

        <div className="danger">
          <p>
            <strong>Group A</strong> Some text...
          </p>
        </div>

        <div className="success">
          <p>
            <strong>Group B</strong> Some text...
          </p>
        </div>

        <div className="info">
          <p>
            <strong>Group C</strong> Some text...
          </p>
        </div>

        <div className="warning">
          <p>
            <strong>Group D</strong> Some text...
          </p>
        </div>
        <div className="info">
          <p>
            <strong>Group E</strong> Some text...
          </p>
        </div>

        <div className="warning">
          <p>
            <strong>Group F</strong> Some text...
          </p>
        </div> */
}
