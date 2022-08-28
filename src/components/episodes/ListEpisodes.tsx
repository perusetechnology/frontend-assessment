import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledBetweenBox, StyledCenteredBox, StyledLoaderContainer } from './Episodes.style';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { episodesManager } from '../../core/episodes/EpisodesManager';
import { EpisodeResponse } from '../../core/episodes/Episodes';
import { EpisodesTable } from './EpisodeTable';
import { TimerTools } from '../../core/tools/TimerTools';

export const ListEpisodes = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const { isLoading, data } = useQuery<EpisodeResponse | null>([page, filter], () =>
    episodesManager.getEpisodes(page, filter)
  );

  const handleChange = TimerTools.debounce((event: any) => {
    if (event.target.value === filter) return;

    setFilter(() => {
      if (event.target.value) {
        setPage(1);
      }
      return event.target.value;
    });
  }, 500);

  return (
    <>
      <StyledBetweenBox display="flex" justifyContent="space-between">
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          List Episodes
        </Typography>
        <TextField label="Filter episodes" size="small" variant="outlined" onChange={(event) => handleChange(event)} />
      </StyledBetweenBox>
      <Box sx={{ position: 'relative' }}>
        {isLoading && (
          <StyledLoaderContainer>
            <CircularProgress />
          </StyledLoaderContainer>
        )}
        {!!data && !isLoading && (
          <>
            <EpisodesTable episodes={data.results || []} />
            {data.info.pages > 1 && (
              <StyledCenteredBox>
                <Pagination
                  count={data?.info.pages || 0}
                  color="primary"
                  page={page}
                  onChange={(event, page) => setPage(page)}
                />
              </StyledCenteredBox>
            )}
          </>
        )}
      </Box>
    </>
  );
};
