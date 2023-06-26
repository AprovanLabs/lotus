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
      <h1 className="text-xl mb-8 mt-4">Draws</h1>

      <Accordion type="single" collapsible className="w-[calc(100%-2rem)] mx-4">
        {tournament.draws.map((draw: DrawModel) => (
          <DrawAccordionItem {...draw} key={draw.title} />
        ))}
      </Accordion>
    </BasicLayout>
  );
};

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const tournament = await TournamentService.getTournamentById(params.id);

  return {
    props: {
      tournament,
    },
  };
}

export default DrawsPage;
