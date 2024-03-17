import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import App from './App.jsx'
import './index.css'
import Root ,{loader as rootLoader,action as rootAction}from './routes/root.jsx'
import { ErrorPage } from './ErrorPage.jsx'
import Contact ,{loader as contactLoader,action as contactAction,}from './routes/Contact.jsx'
import {action as destroyAction} from './routes/destroy.jsx'
import EditContact,{action as editAction} from './routes/edit.jsx'
import Index from './routes/index.jsx'
const router = createBrowserRouter([
  {
    path:"/",
    element:<Root/>,
    errorElement:<ErrorPage/>,
    loader:rootLoader,
    action:rootAction,
    children : [
      {index:true,element:<Index/>},
    {
      path:"contacts/:contactId",
      element:<Contact/>,
      loader:contactLoader,
      action:contactAction
    },
    {
      path:"contacts/:contactId/edit",
      element:<EditContact/>,
      loader:contactLoader,
      action:editAction
    },
    {
      path: "contacts/:contactId/destroy",
      action: destroyAction,
      errorElement:<h1>Oops there is an Error</h1>
    },
  ]
}
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </React.StrictMode>,
)
