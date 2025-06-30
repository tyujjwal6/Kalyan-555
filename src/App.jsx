import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import DashboardPage from './Pages/Dashboard/DashboardPage'
import DeclareResult from './Pages/DeclareResult'
import GameName from './Pages/Gamemanagement/GameName1'
import GameName2 from './Pages/GaliDisswar/GameName2'
import GameRates from './Pages/Gamemanagement/GameRates1'
import BidHistory from './Pages/Gamemanagement/BidHistory1'
import ResultHistory from './Pages/Gamemanagement/ResultHistory1'
import GameSellReport from './Pages/Gamemanagement/GameSellReport1'
import GameWinningReport from './Pages/Gamemanagement/GameWinningReport1'
import Layout from './Pages/Layout'
import Header from './Pages/Header'
import GameWinningPrediction from './Pages/Gamemanagement/GameWinningPrediction1'
import GameRates2 from './Pages/GaliDisswar/GameRates2'
import BidHistory2 from './Pages/GaliDisswar/BidHistory2'
import DeclareResult2 from './Pages/GaliDisswar/DeclareResult2'
import DeclareResult1 from './Pages/Gamemanagement/DeclareResults1'
import ResultHistory2 from './Pages/GaliDisswar/ResultHistory2'
import SellReport from './Pages/GaliDisswar/SellReport'
import WinningReport from './Pages/GaliDisswar/WinningReport'
import WinningPrediction from './Pages/GaliDisswar/WinningPrediction'
import UserBidHistory from './Pages/Reportmanagement/UserBidHistory'
import CustomerSellReport from './Pages/Reportmanagement/CustomerSellReport'
import WinningReport1 from './Pages/Reportmanagement/WinningReport1'
import TransferPointReport from './Pages/Reportmanagement/TranferPointReport'
import BidWinReport from './Pages/Reportmanagement/BidWinReport'
import WithdrawReport from './Pages/Reportmanagement/WithdrawReport'
import AutoDepositHistory from './Pages/Reportmanagement/AutoDepositHistory'
import WinningPrediction3 from './Pages/WinningPrediction3'
import FundRequest from './Pages/WalletManagement/FundRequest'
import WithdrawRequest from './Pages/WalletManagement/WithdrawRequest'
import AmountAddedByAdmin from './Pages/WalletManagement/AmountAddedByAdmin'
import AddFund from './Pages/WalletManagement/AddFundUserWalltet'
import BidRevert from './Pages/WalletManagement/BidRevert'
import AutopayTransaction from './Pages/WalletManagement/AutoPayTransaction'

const App = () => {
  return (
    
    <BrowserRouter>

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
          <Route path="bid-history-2" element={<BidHistory2 />} />

          {/* Note: Path for the second "Declare Result" link */}
          <Route path="declare-result-gm" element={<DeclareResult1 />} /> 
          <Route path="result-history" element={<ResultHistory />} />
          <Route path="game-sell-report" element={<GameSellReport />} />
          <Route path="game-winning-report" element={<GameWinningReport />} />
          <Route path="game-winning-prediction" element={<GameWinningPrediction />} />
          <Route path="game-name-2" element={<GameName2 />} />
          <Route path="game-rates-2" element={<GameRates2 />} />
          <Route path="bid-history-2" element={<BidHistory2 />} />
          <Route path="declare-result-2" element={<DeclareResult2 />} />
          <Route path="result-history-2" element={<ResultHistory2 />} />
          <Route path="sell-report" element={<SellReport />} />
          <Route path="winning-report" element={<WinningReport />} />
          <Route path="winning-prediction" element={<WinningPrediction />} />
          <Route path="user-bid-history" element={<UserBidHistory />} />
          <Route path="customer-sell-report" element={<CustomerSellReport />} />
          <Route path="winning-report" element={<WinningReport1 />} />
          <Route path="transfer-point-report" element={<TransferPointReport />} />
          <Route path="bid-win-report" element={<BidWinReport />} />
          <Route path="withdraw-report" element={<WithdrawReport />} />
          <Route path="auto-deposit-history" element={<AutoDepositHistory />} />
          <Route path="winning-prediction-3" element={<WinningPrediction3 />} />
          <Route path="fund-request" element={<FundRequest />} />
          <Route path="withdraw-request" element={<WithdrawRequest />} />
          <Route path="amount-added-by-admin" element={<AmountAddedByAdmin />} />
          <Route path="add-fund-user-wallet" element={<AddFund />} />
          <Route path="bid-revert" element={<BidRevert />} />
          <Route path="autopay-transaction" element={<AutopayTransaction />} />




  





          {/* Placeholder for other routes */}

          {/* A catch-all route for non-existent pages */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
    )
}

export default App
