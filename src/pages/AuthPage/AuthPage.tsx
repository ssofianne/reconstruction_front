import React, { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loginUser } from '../../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async () => {
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className='background'>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="form-container w-50 p-5 border rounded shadow">
          <h2>Аутентификация</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="formBasicEmail" className='form'>
              <Form.Control
                type="email"
                placeholder="Введите логин"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="button" variant="primary" onClick={handleLogin} disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
