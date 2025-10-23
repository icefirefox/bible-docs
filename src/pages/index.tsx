import * as React from 'react';
import { Redirect } from '@docusaurus/router';

const Home: React.FC = () => {
  return <Redirect to="/introduction" />; // 重定向到圣经介绍页
};

export default Home;
