import React from 'react';
import {Layout} from "antd";
import {blue} from '@ant-design/colors';
import {green} from '@ant-design/colors';

import './App.css'

const { Header, Sider, Content, Footer} = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
      <Sider
        style={{color:green[5],
        backgroundColor:blue.primary}}>
          Sider
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
    </div>
  );
}

export default App;
