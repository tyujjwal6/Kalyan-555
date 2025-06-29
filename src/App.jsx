import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import DashboardPage from './Pages/Dashboard/DashboardPage'
import DeclareResult from './Pages/DeclareResult'
import GameName from './Pages/Gamemanagement/GameName'
import GameRates from './Pages/Gamemanagement/GameRates'
import BidHistory from './Pages/Gamemanagement/BidHistory'
import DeclareResults from './Pages/Gamemanagement/DeclareResults'
import ResultHistory from './Pages/Gamemanagement/ResultHistory'
import GameSellReport from './Pages/Gamemanagement/GameSellReport'
import GameWinningReport from './Pages/Gamemanagement/GameWinningReport'
import Layout from './Pages/Layout'
import Header from './Pages/Heasder'

const App = () => {
  return (
    
    <BrowserRouter>
          <Header/>

      <Routes>
        {/* All routes inside Layout will have the sidebar */}
        <Route path="/" element={<Layout />}>
          {/* The index route is the default page for the parent path "/" */}
          <Route index element={<DashboardPage />} />
          
          <Route path="declare-result" element={<DeclareResult />} />
          
          {/* Game Management Routes */}
          <Route path="game-name" element={<GameName />} />
          <Route path="game-rates" element={<GameRates />} />
          <Route path="bid-history" element={<BidHistory />} />
          {/* Note: Path for the second "Declare Result" link */}
          <Route path="declare-result-gm" element={<DeclareResult />} /> 
          <Route path="result-history" element={<ResultHistory />} />
          <Route path="game-sell-report" element={<GameSellReport />} />
          <Route path="game-winning-report" element={<GameWinningReport />} />

          {/* Placeholder for other routes */}
          <Route path="game-winning-prediction" element={<div>Game Winning Prediction Page</div>} />
          <Route path="winning-prediction" element={<div>Winning Prediction Page</div>} />

          {/* A catch-all route for non-existent pages */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
    )
}

export default App
