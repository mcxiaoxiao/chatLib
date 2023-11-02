import React from 'react';
import Home from '../pages/home/Home';
import Book from '../pages/books/book';
import Takes from '../pages/takes/takes';
import History from '../pages/history/history';
import Manage from '../pages/manage/manage';
import Reader from '../pages/reader/reader';
import MenuLayout from '../pages/home/MenuLayout'



import {createBrowserRouter} from "react-router-dom"
const router = createBrowserRouter([
  {
    path:'/',
    element:<MenuLayout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/book',
        element:<Book/>
      }
      ,
      {
        path:'/takes',
        element:<Takes/>
      }
      ,
      {
        path:'/history',
        element:<History/>
      }
      ,
      {
        path:'/manage',
        element:<Manage/>
      }
      ,
      {
        path:'/reader',
        element:<Reader/>
      }
    ]
    
  }
])

export default router