import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainScreen from "./screens/MainScreen";
import AddItem from './screens/AddItem';
import ViewMenuScreen from './screens/ViewMenu';

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

  }
]);

const App = () => {
  return (
    <RouterProvider router={router}>
      <MainScreen />
      <AddItem />
      <ViewMenuScreen/>
    </RouterProvider>
  );
};

export default App;
