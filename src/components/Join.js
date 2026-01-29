import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    tel: ''
  });

  const [error, setError] = useState(''); // 회원가입이 실패하는 경우가 있다면 에러 출력하기
  const [success, setSuccess] = useState(''); // 회원가입이 성공하는 경우가 있다면 성공 출력하기

  const navigate = useNavigate(); // url 이동

  // form 값 변경
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'username') {
      setError('');
      setSuccess('');
    }
  }

  // 아이디 중복 체크 기능
  const checkUsername = () => {
    if (form.username === '') {
      alert('아이디를 입력하세요.');
      return false;
    }

    axios.post('https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/check-username', {
      username: form.username
    })
      .then(res => {
        if (res.data.exists) {
          setError('이미 사용중인 아이디입니다.');
          setSuccess('');
        } else {
          setSuccess('사용 가능한 아이디입니다.');
          setError('');
        }
      })
  }

  // 회원가입 완료 버튼을 누를 경우
  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    // 비밀번호 일치 여부 확인
    if (form.password !== form.password2) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 백엔드에 데이터 넣기
    axios.post('https://port-0-backend-express-server-mkvwcttqba8659cb.sel3.cloudtype.app/ginipet-register', form)
      .then(() => {
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다');
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
        setError('회원가입 실패 : 아이디가 이미 존재하거나 서버 오류입니다.');
      })
  }

  return (
    <>
      <section className='join login-join'>
        <h2 className='main-title'>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <p className='id-box'>
            <label htmlFor="username">아이디 : </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder='아이디 입력'
              value={form.username}
              onChange={handleChange}
              required
            />
            <button type='button' onClick={checkUsername}>중복 확인</button>
          </p>

          <p>
            <label htmlFor="password">패스워드 : </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder='패스워드 입력'
              value={form.password}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor="password2">패스워드 확인 : </label>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder='패스워드 확인'
              value={form.password2}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor="email">이메일 : </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder='id@domain.co.kr or com'
              value={form.email}
              onChange={handleChange}
              required
            />
          </p>

          <p>
            <label htmlFor="tel">전화번호 : </label>
            <input
              type="tel"
              name="tel"
              id="tel"
              placeholder='000-0000-0000'
              value={form.tel}
              onChange={handleChange}
              required
            />
          </p>

          <p className='ck-box'>
            <input
              type="checkbox"
              name="agree"
              id="agree"
              required
            />
            <label htmlFor="agree">이용약관, 개인정보 수집 및 이용, 마케팅 활용 선택에 모두 동의합니다.</label>
          </p>

          <p><button type="submit">회원가입 완료</button></p>

          {/* 회원가입 실패하면 에러 메세지 띄우기 */}
          {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
      </section>
    </>
  );
};

export default Join;