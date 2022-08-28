import { gql } from 'graphql-request';

export class EpisodesQuery {
  public getListEpisodesQuery(): string {
    return gql`
      query Query($page: Int, $filter: FilterEpisode) {
        episodes(page: $page, filter: $filter) {
          info {
            count
            pages
          }
          results {
            name
            episode
            created
            air_date
            id
          }
        }
      }
    `;
  }

  public getEpisodeQuery(): string {
    return gql`
      query Query($episodeId: ID!) {
        episode(id: $episodeId) {
          episode
          id
          name
          air_date
          created
          characters {
            created
            gender
            id
            image
            name
            species
            status
            type
          }
        }
      }
    `;
  }
}
