// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Layout and Public Pages
import Layout from './Pages/Layout';
import LoginPage from './Pages/LoginPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';

// Import All Protected Page Components
import DashboardPage from './Pages/Dashboard/DashboardPage';
import DeclareResult from './Pages/DeclareResult';
import GameName from './Pages/Gamemanagement/GameName1';
import GameName2 from './Pages/GaliDisswar/GameName2';
import GameRates from './Pages/Gamemanagement/GameRates1';
import BidHistory from './Pages/Gamemanagement/BidHistory1';
import ResultHistory from './Pages/Gamemanagement/ResultHistory1';
import GameSellReport from './Pages/Gamemanagement/GameSellReport1';
import GameWinningReport from './Pages/Gamemanagement/GameWinningReport1';
import GameWinningPrediction from './Pages/Gamemanagement/GameWinningPrediction1';
import GameRates2 from './Pages/GaliDisswar/GameRates2';
import BidHistory2 from './Pages/GaliDisswar/BidHistory2';
import DeclareResult2 from './Pages/GaliDisswar/DeclareResult2';
import DeclareResult1 from './Pages/Gamemanagement/DeclareResults1';
import ResultHistory2 from './Pages/GaliDisswar/ResultHistory2';
import SellReport from './Pages/GaliDisswar/SellReport';
import WinningReport from './Pages/GaliDisswar/WinningReport';
import WinningPrediction5 from './Pages/GaliDisswar/WinningPrediction';
import UserBidHistory from './Pages/Reportmanagement/UserBidHistory';
import CustomerSellReport from './Pages/Reportmanagement/CustomerSellReport';
import WinningReport1 from './Pages/Reportmanagement/WinningReport1';
import TransferPointReport from './Pages/Reportmanagement/TranferPointReport';
import BidWinReport from './Pages/Reportmanagement/BidWinReport';
import WithdrawReport from './Pages/Reportmanagement/WithdrawReport';
import AutoDepositHistory from './Pages/Reportmanagement/AutoDepositHistory';
import WinningPrediction3 from './Pages/WinningPrediction3';
import FundRequest from './Pages/WalletManagement/FundRequest';
import WithdrawRequest from './Pages/WalletManagement/WithdrawRequest';
import AmountAddedByAdmin from './Pages/WalletManagement/AmountAddedByAdmin';
import AddFund from './Pages/WalletManagement/AddFundUserWalltet';
import BidRevert from './Pages/WalletManagement/BidRevert';
import AutopayTransaction from './Pages/WalletManagement/AutoPayTransaction';
import UserManagement from './Pages/UserManagement';
import GameName3 from './Pages/GamesManagement/GameName3';
import GameRates3 from './Pages/GamesManagement/GameRates3';
import SingleDigit from './Pages/GamrAndNumbers/SingleDigit';
import JodiDigit from './Pages/GamrAndNumbers/JodiDigit';
import SinglePana from './Pages/GamrAndNumbers/SinglePana';
import DoublePana from './Pages/GamrAndNumbers/DoublePana';
import TripplePana from './Pages/GamrAndNumbers/TripplePana';
import HalfSangam from './Pages/GamrAndNumbers/HalfSangam';
import FullSangam from './Pages/GamrAndNumbers/FullSangam';
import NoticeManagement from './Pages/Noticemanagement/NoticeManagement';
import SendNotification from './Pages/Noticemanagement/SendNotification';
import UserQuery from './Pages/UserQuery';
import MainSettings from './Pages/Setting/MainSettings';
import ContactSettings from './Pages/Setting/ContactSettings';
import ClearData from './Pages/Setting/ClearData';
import SliderImage from './Pages/Setting/SliderImages';
import QRCodeImages from './Pages/Setting/QRcodeImages';
import HowToPlay from './Pages/Setting/HowToPlay';

const App = () => {
  // Simple check for authentication. Replace with your actual auth logic (e.g., from context or Redux).
  const isAuthenticated = true; // Set to `false` to test the login redirect

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes that don't need the main layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected routes that use the main layout */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}
        >
          {/* Default child route for "/" is the dashboard */}
          <Route index element={<DashboardPage />} />
          
          {/* Your extensive list of protected routes */}
          <Route path="declare-result" element={<DeclareResult />} />
          <Route path="game-name" element={<GameName />} />
          <Route path="game-rates" element={<GameRates />} />
          <Route path="bid-history" element={<BidHistory />} />
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
          <Route path="winning-prediction-5" element={<WinningPrediction5 />} />
          <Route path="user-bid-history" element={<UserBidHistory />} />
          <Route path="customer-sell-report" element={<CustomerSellReport />} />
          <Route path="winning-report-1" element={<WinningReport1 />} />
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
          <Route path="user-management" element={<UserManagement />} />
          <Route path="game-name-3" element={<GameName3 />} />
          <Route path="game-rates-3" element={<GameRates3 />} />
          <Route path="single-digit" element={<SingleDigit />} />
          <Route path="jodi-digit" element={<JodiDigit />} />
          <Route path="single-pana" element={<SinglePana />} />
          <Route path="double-pana" element={<DoublePana />} />
          <Route path="trpple-pana" element={<TripplePana />} />
          <Route path="half-sangam" element={<HalfSangam />} />
          <Route path="full-sangam" element={<FullSangam />} />
          <Route path="notice-management" element={<NoticeManagement />} />
          <Route path="send-notification" element={<SendNotification />} />
          <Route path="user-query" element={<UserQuery />} />
          <Route path="main-settings" element={<MainSettings />} />
          <Route path="contact-settings" element={<ContactSettings />} />
          <Route path="clear-data" element={<ClearData />} />
          <Route path="slider-images" element={<SliderImage />} />
          <Route path="qr-code-images" element={<QRCodeImages />} />
          <Route path="how-to-play" element={<HowToPlay />} />
        </Route>

        {/* A catch-all route for any other path */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;