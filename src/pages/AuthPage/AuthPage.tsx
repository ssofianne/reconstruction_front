import React, { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import './AuthPage.css';


const LoginPage: React.FC = () => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      try {
        setLoading(true);
        setError(null);
        // Отправляем данные на сервер для авторизации
        const response = await api.login.loginCreate({ email, password });
        
        const id = response.data.pk;
        const is_staff = response.data;
  
        // Сохраняем id в Redux
        dispatch(login({ username: email, id, is_staff }));
        navigate('/');
      } catch (error) {
        console.error('Ошибка входа:', error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className='background'>
        <Container className=" d-flex justify-content-center align-items-center min-vh-100">
        <div className="form-container w-50 p-5 border rounded shadow">
            <h2>Аутентификация</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
                <Form.Group controlId="formBasicEmail" className='form'>
                    {/* <Form.Label>Логин</Form.Label> */}
                    <Form.Control
                    type="email"
                    placeholder="Введите логин"
                    name="email"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    {/* <Form.Label>Пароль</Form.Label> */}
                    <Form.Control
                    type="password"
                    placeholder="Введите пароль"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </Form.Group>
                <Button className="button" variant="primary" onClick={handleLogin} disabled={loading}>
                    {loading ? 'Войти...' : 'Войти'}
                </Button>
            </Form>
        </div>
        </Container>
    </div>
  );
};

export default LoginPage;