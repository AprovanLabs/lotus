import { Button } from 'src/components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BasicLayout from 'src/layouts/BasicLayout';

const TournamentsPage = () => {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);

  return (
    <BasicLayout>
      <h1 className="text-xl" style={{ backgroundColor: '#236494', color: 'white', marginBottom: '2rem', fontWeight: 800, whiteSpace: 'nowrap' }}>2023 Summer Tournaments</h1>
      <h1 className="text-xs" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '.5rem', fontWeight: 100, whiteSpace: 'nowrap' }}>Adult Men’s and Women’s Doubles Tournaments on Sunday, July 23rd (8:30am)</h1>
      <h1 className="text-xs" style={{ backgroundColor: '#236494', color: 'white', marginBottom: '.5rem', fontWeight: 100, whiteSpace: 'nowrap' }}>Adult Mixed Doubles Tournament on Sunday, July 23rd (10:00am)</h1>
      <h1 className="text-xs" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '.5rem', fontWeight: 100, whiteSpace: 'nowrap' }}>Varsity Girls Singles on Monday, July 24th (8:00am)</h1>
      <h1 className="text-xs" style={{ backgroundColor: '#236494', color: 'white', marginBottom: '.5rem', fontWeight: 100, whiteSpace: 'nowrap' }}>Varsity Boys Doubles on Monday, July 24th (10:30am)</h1>
      <h1 className="text-xs" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '.5rem', fontWeight: 100, whiteSpace: 'nowrap' }}>Varsity Boys Singles on Tuesday, July 25th (8:00am)</h1>
      <h1 className="text-xs" style={{ backgroundColor: '#236494', color: 'white', marginBottom: '.5rem', fontWeight: 100, whiteSpace: 'nowrap' }}>Varsity Girls Doubles on Tuesday, July 25th (10:30am)</h1>
      <h1 className="text-xs" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '.5rem', fontWeight: 100, whiteSpace: 'nowrap' }}>Junior Varsity Boys Doubles on Tuesday July 25th (8:00am)</h1>
      <h1 className="text-xs" style={{ backgroundColor: '#236494', color: 'white', marginBottom: '.5rem', fontWeight: 100, whiteSpace: 'nowrap' }}>Junior Varsity Girls Doubles on Tuesday, July 25th (9:30am)</h1>
      <h1 className="text-xs" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '.5rem', fontWeight: 100, whiteSpace: 'nowrap' }}>Junior Varsity Girls Singles on Wednesday, July 26th (1:00pm)</h1>
      <h1 className="text-xs" style={{ backgroundColor: '#236494', color: 'white', marginBottom: '.5rem', fontWeight: 100, whiteSpace: 'nowrap' }}>Junior Varsity Boys Singles on Wednesday, July 26th (1:30pm)</h1>
    
    </BasicLayout>
  );
};

export default TournamentsPage;
