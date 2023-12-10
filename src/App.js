import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainScreen from "./screens/MainScreen";
import AddItem from './screens/AddItem';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainScreen />,
  },
  {
    path: '/add/:inputValue',
    element: <AddItem />,
  }
]);

const App = () => {
  return (
    <RouterProvider router={router}>
      <MainScreen />
      <AddItem />
    </RouterProvider>
  );
};

export default App;
