import React, { FormEvent, useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api'; 
import './RegisterPage.css'; 
// import Header from '../../components/Header/Header';
// import { BreadCrumbs } from '../../components/Breadcrumbs/BreadCrumbs';
// import { ROUTE_LABELS, ROUTES } from '../../components/Routes';


const RegisterPage: React.FC = () => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
        setError('Пароли не совпадают');
        return;
        }

        try {
        setLoading(true);
        setError(null);
        const userData = { email, password };
        await api.api.apiUserCreate(userData);
        alert('Вы успешно зарегистрированы!');
        navigate('/login');
        } catch (error: any) {
            setError('Ошибка регистрации.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className='background'>   
        {/* <BreadCrumbs
                crumbs={[{ label: ROUTE_LABELS.REGISTER, path: ROUTES.REGISTER }]}
        /> */}
        {/* <Header /> */}
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="form-container w-50 p-5 border rounded shadow">
            <h2>Регистрация</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleRegister}> {/* Use onSubmit for better form handling */}
                <Form.Group controlId="formBasicUsername" className='form'>
                <Form.Control
                    type="text"
                    placeholder="Введите почту"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className='form'>
                <Form.Control
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword" className='form'>
                <Form.Control
                    type="password"
                    placeholder="Подтвердите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                </Form.Group>

                <Button className="button" variant="primary" type="submit" disabled={loading}>
                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </Button>
            </Form>
            </div>
        </Container>
        </div>
    );
};

export default RegisterPage;