import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, MenuItem, Alert } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const roles = [
  { value: 'parent', label: 'Ota-ona' },
  { value: 'child', label: 'Bola' },
  { value: 'admin', label: 'Admin' },
];

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('parent');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('junfin_users') || '[]');
    if (users.find(u => u.email === email)) {
      setError('Bu email allaqachon ro‘yxatdan o‘tgan.');
      return;
    }
    const newUser = { email, password, name, role, lang: 'uz' };
    users.push(newUser);
    localStorage.setItem('junfin_users', JSON.stringify(users));
    setSuccess('Ro‘yxatdan o‘tish muvaffaqiyatli! Endi kirishingiz mumkin.');
    setError('');
    setEmail(''); setPassword(''); setName(''); setRole('parent');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <PersonAddAlt1Icon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography component="h1" variant="h5" fontWeight={700} mb={2}>
            Ro‘yxatdan o‘tish
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Ism"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Parol"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              select
              fullWidth
              label="Rol"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              {roles.map(r => (
                <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
              ))}
            </TextField>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Ro‘yxatdan o‘tish
            </Button>
            <Typography variant="body2" align="center">
              Allaqachon akkauntingiz bormi? <a href="/uz/login">Kirish</a>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 