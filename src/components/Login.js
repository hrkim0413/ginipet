import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/sub.css';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('')
  const [idSaveCheckbox, setIdSaveCheckbox] = useState(false); // 아이디 저장 체크박스
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/ginipet-login', form);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', form.username);

      if (idSaveCheckbox) {
        localStorage.setItem('id_save', form.username);
      } else {
        localStorage.removeItem('id_save');
      }

      alert('로그인이 성공했습니다. 메인 페이지로 이동합니다.');
      navigate('/');
    } catch (err) {
      setError(err.response.data.message || '로그인 실패');
    }
  }

  useEffect(() => {
    const savedId = localStorage.getItem('id_save');

    if (savedId) {
      setForm(prev => ({
        ...prev,
        username: savedId
      }))
      setIdSaveCheckbox(true)
    }
  }, [])

  return (
    <>
      <section className='login login-join'>
        <h2 className='main-title'>로그인</h2>
        <form onSubmit={handleSubmit}>
          <p className='member-box'>
            <input type="radio" name="member" id="member" />
            <label htmlFor="member">회원</label>
            <input type="radio" name="member" id="nomember" />
            <label htmlFor="nomember">비회원</label>
          </p>

          <p>
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder='아이디'
              value={form.username}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder='비밀번호'
              value={form.password}
              onChange={handleChange}
              required
            />
          </p>

          {
            error && <p style={{ color: 'red' }}>{error}</p>
          }

          <p className='ck-box'>
            <input
              type="checkbox"
              name="username_check"
              id="username_check"
              checked={idSaveCheckbox}
              onClick={e => setIdSaveCheckbox(e.target.checked)}
            />
            <label htmlFor="username_check">아이디 저장</label>
          </p>

          <p>
            <button type="submit">로그인</button>
          </p>

          <p className='search-box'>
            <Link to={'/id_search'}>아이디찾기</Link>
            &#10072;
            <Link to={'/pw_search'}>비밀번호찾기</Link>
            &#10072;
            <Link to={'/join'}>회원가입</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;