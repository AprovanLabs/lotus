import { useRouter } from 'next/router';
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
import { ContactModel } from 'src/lib/core/models/contact';
import ContactService from 'src/lib/server/contact/contactService';
import Image from 'next/image';
import { Button } from 'src/components/Button';

const DrawAccordionItem: React.FC<
  React.PropsWithChildren<DrawModel & { image?: { url: string; width: number; height: number } }>
> = ({ title, description, image, link, linkLabel, iframe, children }) => (
  <AccordionItem value={title}>
    <AccordionTrigger>{title}</AccordionTrigger>
    <AccordionContent>
      {link && (
        <div
          style={{
            fontSize: '0.75rem',
            marginTop: '1rem',
            marginBottom: '2rem',
          }}
        >
          <a href={link}>
            <Button>{linkLabel} &rarr;</Button>
          </a>
        </div>
      )}

      {description && <p className="mb-8">{description}</p>}

      {iframe && (
        <iframe
          src="https://challonge.com/c0pgufel/module"
          width="100%"
          height="500"
          frameBorder="0"
          scrolling="auto"
        ></iframe>
      )}

      {image && (
        <div className="mt-4">
          <Image src={image.url} width={image.width} height={image.height} alt="Tournament Image" />
        </div>
      )}
    </AccordionContent>
  </AccordionItem>
);

const DrawsPage = ({
  tournament,
  contact,
}: {
  tournament: TournamentModel;
  contact: ContactModel;
}) => {
  const router = useRouter();

  return (
    <BasicLayout contact={contact}>
      <div className="min-h-[70vh] w-full">
        <h1 className="text-xl mb-16 mt-8 text-center">Draws</h1>

        <Accordion type="single" collapsible className="w-[calc(100%-4rem)] mx-8">
          {tournament.draws.map((draw: DrawModel) => (
            <DrawAccordionItem {...draw} key={draw.title} image={draw.image} />
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
  const contact = await ContactService.getContact();

  return {
    props: {
      tournament,
      contact,
    },
  };
}

export default DrawsPage;
