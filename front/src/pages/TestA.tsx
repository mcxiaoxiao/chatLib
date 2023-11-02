/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import { useState,useEffect } from 'react'
import './App.css'
import { Button } from 'antd';

// // 链接器
// const client = new ApolloClient({
//   uri: 'http://[::1]:3000',
//   cache: new InMemoryCache(),
// });


const GET_DATA = gql`
query {
    getuser
    {
      name
    }
}
`;
function TestA () {
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const show =() =>
  {
    console.log(data)
  }
  

  return (
    <>
<p>{data?.getuser[0].name}</p>
<Button onClick={show}>
          点我显示
        </Button>
    </>
  )
}



export default TestA 

