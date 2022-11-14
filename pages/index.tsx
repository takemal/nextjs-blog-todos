import React from 'react';
import { Provider } from 'react-redux';
import Auth from '../components/Auth';
import { Layout } from '../components/Layout';
import { store } from '../slices/store';

const Home = () => {
  return (
    <Provider store={store}>
      <Layout title="Login">
        <Auth />
      </Layout>
    </Provider>
  );
};

export default Home;
