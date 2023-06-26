import { useRouter } from 'next/router';
import { useState } from 'react';
import BasicLayout from 'src/layouts/BasicLayout';
import TournamentService from 'src/lib/server/tournaments/tournamentService';
import { DrawModel, TournamentModel } from 'src/lib/core/models/tournament';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/components/Accordion';
import { GetStaticPaths } from 'next';

const DrawAccordionItem: React.FC<React.PropsWithChildren & DrawModel> = ({
  title,
  description,
  image,
  children,
}) => (
  <AccordionItem value={title}>
    <AccordionTrigger>{title}</AccordionTrigger>
    <AccordionContent>{description}</AccordionContent>
  </AccordionItem>
);

const DrawsPage = ({ tournament }: { tournament: TournamentModel }) => {
  const router = useRouter();

  return (
    <BasicLayout>
      <div className="min-h-[70vh] w-full">
        <h1 className="text-xl mb-16 mt-8 text-center">Draws</h1>

        <Accordion type="single" collapsible className="w-[calc(100%-4rem)] mx-8">
          {tournament.draws.map((draw: DrawModel) => (
            <DrawAccordionItem {...draw} key={draw.title} />
          ))}
        </Accordion>
      </div>
    </BasicLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    {
      params: {
        id: 'latest',
      },
    },
  ];

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: { params: { id: string } }) {
  const isLatest = params.id === 'latest';
  const tournament = isLatest
    ? await TournamentService.getLatestTournament()
    : await TournamentService.getTournamentById(params.id);

  return {
    props: {
      tournament,
    },
  };
}

export default DrawsPage;
