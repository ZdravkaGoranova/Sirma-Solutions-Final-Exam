import { useEffect, useState } from 'react';
import { loadCSV } from '../utils/csvUtils.js';


export default function Home() {
  const [teams, setTeams] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await loadCSV('/teams.csv');
            setTeams(data);
        }

        fetchData();
    }, []);
  return (
    <>
      <h1>Home Page</h1>
        <div>
            <h1>Teams</h1>
            <ul>
                {teams.map((team, index) => (
                    <li key={index}>{team.Name}</li>
                ))}
            </ul>
        </div>
    </>
  );
}



