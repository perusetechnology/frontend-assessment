import type { NextPage } from 'next';
import { ListEpisodes } from '../components/episodes/ListEpisodes';
import Container from '@mui/material/Container';

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <ListEpisodes />
    </Container>
  );
};

export default Home;
