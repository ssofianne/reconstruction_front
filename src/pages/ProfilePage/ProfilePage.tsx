import { FC, useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import { api } from '../../api'; 
import { User } from '../../api/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ProfilePage: FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Получаем userId из Redux
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      setError('Не удалось получить ID пользователя');
      return;
    }

    const fetchProfileData = async () => {
      try {
        const profileData = (await api.api.apiUserRead(userId)).data;

        setFirstName(profileData.first_name || '');
        setLastName(profileData.last_name || '');
        setEmail(profileData.email || '');
      } catch (err) {
        setError('Ошибка при загрузке данных');
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleProfileUpdate = async () => {
    if (!user) {
      alert('Пользователь не авторизован');
      return;
    }

    const updatedData: User = {email: email, password: password};

    if (firstName?.trim()) updatedData.first_name = firstName.trim();
    if (lastName?.trim()) updatedData.last_name = lastName.trim();
    if (email?.trim()) updatedData.email = email.trim() || '';

    if (password && password.trim() !== '') {
      updatedData.password = password.trim();
    }

    if (!userId) {
      alert('Не указан ID пользователя');
      return;
    }

    try {
      const response = await api.api.apiUserUpdate(userId, updatedData);

      setSuccessMessage('Данные успешно обновлены');
    } catch (err) {
      console.error('Ошибка при обновлении данных', err);
      setError('Ошибка при обновлении данных');
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Header />
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
          <div className="auth-container p-4 border rounded shadow">
            <h2 className="text-center mb-4">Личный кабинет</h2>

            {/* Сообщение об успехе */}
            {successMessage && <Alert variant="success" className="mb-4">{successMessage}</Alert>}

            {/* Сообщение об ошибке */}
            {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

            <Form>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Введите email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formFirstName" className="mt-3">
                <Form.Label>Имя</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Введите имя" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formLastName" className="mt-3">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Введите фамилию" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Старый пароль</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Введите старый пароль" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </Form.Group>

              <Form.Group controlId="formNewPassword" className="mt-3">
                <Form.Label>Новый пароль</Form.Label>
                <Form.Control 
                  type="password"
                  placeholder="Введите новый пароль"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleProfileUpdate} className="w-100 mt-4">
                Обновить данные
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;