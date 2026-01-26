// 1. 외부 라이브러리
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 2. 전역 스타일
import './styles/reset.css'; // 초기화
import './styles/common.css'; // 공통 변수
import './styles/layout.css'; // 레이아웃(헤더, 푸터)

// 3. 레이아웃 컴포넌트
import Header from './layout/Header';
import Footer from './layout/Footer';

// 4. 페이지 컴포넌트
import Main from './components/Main';
import Intro from './components/Intro';
import Info from './components/Info';
import Event from './components/Event';
import Customer from './components/Customer';
import Login from './components/Login';
import Join from './components/Join';
import Cart from './components/Cart';
import Order from './components/Order';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <main>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/intro' element={<Intro />} />
            <Route path='/info' element={<Info />} />
            <Route path='/event' element={<Event />} />
            <Route path='/customer' element={<Customer />} />
            <Route path='/login' element={<Login />} />
            <Route path='/join' element={<Join />} />
            <Route path='/order' element={<Order />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
