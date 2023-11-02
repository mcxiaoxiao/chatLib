/* eslint-disable */

import React from 'react';
import { useState,useEffect,FC } from 'react'
import { Button } from 'antd';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { PaginationProps } from 'antd';
import { Pagination , Space} from 'antd';




import {gql, useQuery,useLazyQuery ,useMutation} from '@apollo/client';


const Home:FC=()=>{


  const FIND = gql`
  query{
  findTakeAll(pageNumber:1,pageSize:4)
  {
    list
    {
      bookid
      takeid
      readerid
      borrowedddl
      borrowedtime
      borroweddate
    }
  }
}
  `;

const { data, refetch: frefetch } = useQuery(FIND, {
  onCompleted(data) {
    console.log(data);
  },
  onError(error) {
    console.error(error);
  },
});
  
  // const { loading, error, data } = useQuery(FIND);

  return (
<div>
  
<p>我是首页我是首页我是首页我是首页我是首页我是首页</p>


<Button onClick={() => {

console.log(data);

}}>console log</Button>
</div>

  );
}


export default Home