import type { TournamentModel } from 'src/lib/core/models/tournament';
import client from 'src/lib/server/prismic/prismicClient';
import { mapPrismicTournament } from './tournamentMappers';

class TournamentService {
  static async getTournamentById(id: string): Promise<TournamentModel | null> {
    const { data } = await client.getByUID('tournament', id, {
      fetchLinks: 'signUpForm'
    });

    if (!data) return null;

    return mapPrismicTournament(data);
  }

  static async getAllTournaments(): Promise<TournamentModel[] | null> {
    const data = await client.getAllByType('tournament', {
      fetchLinks: 'signUpForm'
    });

    if (!data) return null;

    return data.map(d => (mapPrismicTournament(d.data)));
  }
}

export default TournamentService;
