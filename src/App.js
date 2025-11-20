import React, { useEffect } from 'react';
import { fetchUsers } from './store/reducers/userReducer';
import { addCampaigns } from './store/reducers/campaignReducer';
import store from './store/store';
import { Provider, useDispatch } from 'react-redux';
import CampaignManager from './components/CampaignManager';
import { initialCampaigns } from './data/intialCampaigns';


import './App.css';


window.AddCampaigns = (campaigns) => {
  store.dispatch(addCampaigns(campaigns));
};


function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(addCampaigns(initialCampaigns));
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Campaign Manager</h1>
      </header>
      <main>
        <CampaignManager />
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
