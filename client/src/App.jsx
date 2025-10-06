import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import { clearEventData } from './redux/EventSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InitialRouter from './Router/InitialRouter';
import HeaderComponent from './Components/HeaderComponent';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <AppLayout />
        </Router>
      </Provider>
    </>
  );
}

function AppLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const noSidebarRoutes = ['/', '/create-profile'];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  // Global effect to clear Redux state if no active event
  useEffect(() => {
    const endformId = localStorage.getItem('endformId');
    const currentEventId = localStorage.getItem('currentEventId');
    if (!endformId || !currentEventId) {
      console.log('App - No active event, clearing Redux state');
      dispatch(clearEventData());
    }
  }, [dispatch]);

  return (
    <div className={`min-h-screen bg-gray-50 ${showSidebar ? 'pl-20' : ''}`}>
      {showSidebar && <HeaderComponent showSidebar={showSidebar} />}

      <main className="relative w-full">
        <div className="container mx-auto px-4 py-6">
          <InitialRouter />
        </div>
      </main>
    </div>
  );
}

export default App;
