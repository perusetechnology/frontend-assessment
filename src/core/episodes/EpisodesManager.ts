import { GraphqlClient } from '../graphql/GraphqlClient';
import { EpisodesQuery } from './EpisodesQuery';
import { rickAndMortyApi } from '../graphql/GraphqlRequestClientFactory';
import { EpisodeDetail, EpisodeResponse } from './Episodes';

export class EpisodesManager {
  constructor(private readonly client: GraphqlClient, private readonly querys: EpisodesQuery) {}

  public async getEpisodes(page: number, filter: string): Promise<EpisodeResponse | null> {
    const result = await this.client.exec(this.querys.getListEpisodesQuery(), { page, filter: { name: filter } });
    if (!result?.episodes) {
      return null;
    }
    return result.episodes;
  }

  public async getEpisode(episodeId: string): Promise<EpisodeDetail> {
    return this.client.exec(this.querys.getEpisodeQuery(), { episodeId });
  }
}

export const episodesManager = new EpisodesManager(rickAndMortyApi, new EpisodesQuery());
