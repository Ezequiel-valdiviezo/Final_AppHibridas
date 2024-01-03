import { useEffect, useState } from 'react'
import './App.css' /// vitejs
import Home from './pages/Home'
import GameList from './pages/GameList'
import JudgeDelete from './pages/GameDelete'
import Votes from './pages/Votes'
import Login from './pages/Login';
import JudgeCreate from './pages/GameCreate';
import JudgeUpdate from './pages/GameUpdate';
import AppMain from './components/AppMain';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserCreate from './pages/UserCreate'
import UserDelete from './pages/UserDelete'
import UserUpdate from './pages/UserUpdate'
import Logout from './pages/Logout'

//Conf router
 const route = createBrowserRouter([
  {
    path: '/',
    element: <Login />
   },
   {
     path: '/',
     element: <AppMain />,
     children:[
       {
         path: '/Home',
         element: <Home />
       },
       {
         path: '/GameList',
         element: <GameList />
        },
        {
          path: '/Votes',
          element: <Votes />
        },
        {
          path: '/JudgeCreate',
          element: <JudgeCreate />
        },
        {
          path: '/JudgeUpdate',
          element: <JudgeUpdate />
        },
       {
         path: '/JudgeDelete',
         element: <JudgeDelete />
        },
       {
         path: '/UserCreate',
         element: <UserCreate />
        },
       {
         path: '/UserUpdate',
         element: <UserUpdate />
        },
       {
         path: '/UserDelete',
         element: <UserDelete />
        },
       {
         path: '/Logout',
         element: <Logout />
        },
       {
        //  path: '/Login',
        //  element: <Login />
       },
     ]
   },
    // {
    //  path: '/Login',
    //  element: <Login />
    // },
 ])

function App(){
  return <>
  <RouterProvider router={route} />
  </>
}

export {
  App,
}

export default App



