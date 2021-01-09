import { auth, database } from 'firebaseApp';
import { NO_ITEM } from 'logic/initStorage';
import React, { useState } from 'react';
import 'css/Auth.css';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const onChange = (e) => {
    const { type, value } = e.target
    switch (type) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default: break;
    }
  }
  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (newAccount) {
        const newUser = await auth.createUserWithEmailAndPassword(email, password);
        const newUserId = await newUser.user.uid;
        database.ref(`cart/${newUserId}`).set(NO_ITEM);
      } else {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  }
  const onMakeNewAcc = () => {
    setNewAccount(true);
  }
  const onCancleNewAcc = () => {
    setNewAccount(false);
  }
  return (
    <section className="auth">
      <h3 className="auth__title">{newAccount ? '계정 만들기' : '로그인 하기'}</h3>
      <form onSubmit={onSubmit} className="auth__submit-form">
        <input
          type="email" placeholder="이메일" required
          onChange={e => onChange(e)} value={email}
          className="auth__email-input"
        />
        <input
          type="password" placeholder="비밀번호" required
          onChange={e => onChange(e)} value={password}
          className="auth__password-input"
        />
        <input
          type="submit" value={newAccount ? "계정만들기" : "로그인하기"}
          onSubmit={onSubmit}
          className="auth__submit-input"
        />
      </form>
      {error && <p>{error}</p>}
      <div className="auth__account">
        {newAccount ?
          <button onClick={onCancleNewAcc} className="auth__account-btn">
            계정 만들기 취소
        </button>
          : <>
            <p className="auth_is-account">계정이 없나요?</p>
            <button onClick={onMakeNewAcc} className="auth__account-btn">
              새 계정 만들기
          </button>
          </>}
      </div>
    </section>
  );
}

export default Auth;
