import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Col, Layout, Row } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import React from 'react';
import './App.css';
import { CustomForm } from './components/CustomForm';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Header className='header'>Header</Header>
        <Content className='content'>
          <Row>
            <Col span="8" offset="8">
              <CustomForm />
            </Col>
          </Row>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
