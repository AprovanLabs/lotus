import { Button } from 'src/components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BasicLayout from 'src/layouts/BasicLayout';

const TournamentsPage = () => {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);

  const tournaments = [
    { date: '2023-06-04', name: 'Tournament 1' },
    { date: '2023-06-05', name: 'Tournament 2' },
  ];

  return (
    <BasicLayout>
      <h1 className="text-xl">Tournaments Page</h1>
      <p className="">Route {router.pathname}</p>

      <Button onClick={() => setIsShowing(!isShowing)}>
        {isShowing ? 'Hide Tournaments' : 'Show Tournaments'}
      </Button>

      {isShowing && (
        <div className="flex flex-col justify-center items-center">
          {tournaments.map(tournament => (
            <div key={`${tournament.name}-${tournament.date}`} className="bg-white p-4 rounded-lg">
              <p className="text-xl">{tournament.name}</p>
              <p className="text-xl">{tournament.date}</p>
            </div>
          ))}
        </div>
      )}
    </BasicLayout>
  );
};

export default TournamentsPage;
