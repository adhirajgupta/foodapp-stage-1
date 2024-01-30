import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainScreen from "./screens/MainScreen";
import AddItem from './screens/AddItem';
import ViewMenuScreen from './screens/ViewMenu';
import { NotFound } from './screens/Redirect';
import Portal from './screens/Portal';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainScreen />,
  },
  {
    path: '/add/:inputValue',
    element: <AddItem />,
  },
  {
    path: '/menu/:inputValue',
    element: <ViewMenuScreen />,
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/portal/verify',
    element: <Portal />
  }
]);

const App = () => {
  return (
    <RouterProvider router={router}>
      <MainScreen />
      <AddItem />
      <ViewMenuScreen />
    </RouterProvider>
  );
};

export default App;
