import MainLayout from 'layouts/MainLayout';

const links = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/about',
    text: 'About',
  },
  {
    href: '/contact',
    text: 'Contact',
  },
];

const Home = () => (
  <MainLayout links={links} title="Home">
    <h1>Index</h1>
  </MainLayout>
);

export default Home;
