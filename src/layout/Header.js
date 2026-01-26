import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // 로컬저장소에 있는 아이디값을 변수에 저장
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // 기존 로그인 데이터 삭제
    localStorage.removeItem('username'); // 사용자 아이디 데이터 삭제
    alert('로그아웃 되었습니다. 로그인 페이지로 이동합니다.');
    navigate('/login');
    // window.location.reload();
  }

  return (
    <>
      <header className='header'>
        <h1>
          <Link to={'/'} title='메인 페이지로 이동'>
            <img src={`${process.env.PUBLIC_URL}/images/logo_clr.png`} alt="GINIPET 로고" />
          </Link>
        </h1>

        <button className='toggle-btn' onClick={() => setMenuOpen(true)}>
          <img src={`${process.env.PUBLIC_URL}/images/topIcon_burger.png`} alt="전체 메뉴" />
        </button>
        <Link to={'/cart'} title='장바구니 페이지로 이동' className='cart-btn'>
          <img src={`${process.env.PUBLIC_URL}/images/topIcon_cart.png`} alt="장바구니" />
        </Link>

        <nav className='navi' onClick={() => setMenuOpen(false)} style={{
          left: menuOpen ? '0' : '-100%'
        }}>
          <button className='close-btn'>
            <img src={`${process.env.PUBLIC_URL}/images/btn_close.png`} alt="메뉴 닫기" />
          </button>

          {
            username &&
            <p className='login-name'>
              <strong>{username}</strong>님 환영합니다.
            </p>
          }

          <ul className='gnb'>
            <li><Link to={'/'} title='메인 페이지로 이동' onClick={() => setMenuOpen(false)}>지니펫 쇼핑몰</Link></li>
            <li><Link to={'/intro'} title='브랜드 소개 페이지로 이동' onClick={() => setMenuOpen(false)}>브랜드 소개</Link></li>
            <li><Link to={'/info'} title='반려견 정보 페이지로 이동' onClick={() => setMenuOpen(false)}>반려견 정보</Link></li>
            <li><Link to={'/event'} title='이벤트 페이지로 이동' onClick={() => setMenuOpen(false)}>이벤트</Link></li>
            <li><Link to={'/customer'} title='고객지원 페이지로 이동' onClick={() => setMenuOpen(false)}>고객지원</Link></li>
          </ul>
          <ul className='form-nav'>
            {
              username ?
                (
                  <li className='logout'><button onClick={handleLogout}>로그아웃</button></li>
                ) : (
                  <>
                    <li><Link to={'/login'} title='로그인 페이지로 이동' onClick={() => setMenuOpen(false)}>로그인</Link></li>
                    <li><Link to={'/join'} title='회원가입 페이지로 이동' onClick={() => setMenuOpen(false)}>회원가입</Link></li>
                  </>
                )
            }
            <li><Link to={'/order'} title='주문조회 페이지로 이동' onClick={() => setMenuOpen(false)}>주문조회</Link></li>
            <li><Link to={'/cart'} title='장바구니 페이지로 이동' onClick={() => setMenuOpen(false)}>장바구니</Link></li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;