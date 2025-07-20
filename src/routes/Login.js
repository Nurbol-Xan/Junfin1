import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, MenuItem, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const roles = [
  { value: 'parent', label: 'Ota-ona' },
  { value: 'child', label: 'Bola' },
  { value: 'admin', label: 'Admin' },
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('parent');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('junfin_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    if (user) {
      // TODO: Auth state va redirect
      window.location.href = `/${user.lang || 'uz'}/${role}/`;
    } else {
      setError('Email yoki parol noto‘g‘ri yoki rol mos emas.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <LockOutlinedIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography component="h1" variant="h5" fontWeight={700} mb={2}>
            Kirish
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Kirish
            </Button>
            <Typography variant="body2" align="center">
              Yangi foydalanuvchi? <a href="/uz/register">Ro‘yxatdan o‘tish</a>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login; 