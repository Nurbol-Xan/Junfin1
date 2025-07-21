import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Storefront as StorefrontIcon,
  Category as CategoryIcon,
  MonetizationOn as MoneyIcon,
  Inventory as InventoryIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

const mockUser = { name: 'Admin', avatar: '/images/user-def.png' };

const mockProducts = [
  {
    id: 1,
    name: 'LEGO Constructor Set',
    category: 'O\'yinchoqlar',
    price: 500,
    status: 'active',
    popularity: 95,
    purchases: 234,
    image: '/images/coin-img.png',
    description: 'Bolalar uchun ajoyib LEGO konstruktor to\'plami'
  },
  {
    id: 2,
    name: 'Velosiped',
    category: 'Sport',
    price: 1000,
    status: 'active',
    popularity: 88,
    purchases: 156,
    image: '/images/coin-img.png',
    description: 'Bolalar uchun xavfsiz velosiped'
  },
  {
    id: 3,
    name: 'Kitob to\'plami',
    category: 'Ta\'lim',
    price: 200,
    status: 'inactive',
    popularity: 72,
    purchases: 89,
    image: '/images/coin-img.png',
    description: 'Bolalar uchun qiziqarli kitoblar'
  },
  {
    id: 4,
    name: 'Tablet',
    category: 'Texnologiya',
    price: 1500,
    status: 'active',
    popularity: 91,
    purchases: 67,
    image: '/images/coin-img.png',
    description: 'Ta\'lim uchun maxsus tablet'
  }
];

const categories = ['Barchasi', 'O\'yinchoqlar', 'Sport', 'Ta\'lim', 'Texnologiya', 'Kiyim', 'Kitoblar'];

const AdminCatalog = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'O\'yinchoqlar',
    price: '',
    description: '',
    status: 'active'
  });

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Barchasi' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setNewProduct({
      name: '',
      category: 'O\'yinchoqlar',
      price: '',
      description: '',
      status: 'active'
    });
    setOpenDialog(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      status: product.status
    });
    setOpenDialog(true);
  };

  const handleSaveProduct = () => {
    // Here you would save to localStorage or API
    console.log('Saving product:', newProduct);
    setOpenDialog(false);
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error';
  };

  const getStatusText = (status) => {
    return status === 'active' ? 'Faol' : 'Nofaol';
  };

  const totalProducts = mockProducts.length;
  const activeProducts = mockProducts.filter(p => p.status === 'active').length;
  const totalPurchases = mockProducts.reduce((sum, p) => sum + p.purchases, 0);
  const avgPopularity = Math.round(mockProducts.reduce((sum, p) => sum + p.popularity, 0) / mockProducts.length);

  return (
    <MainLayout
      user={mockUser}
      role="admin"
      onLogout={() => window.location.href = '/uz/login'}
      onNavigate={path => window.location.href = '/uz' + path}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            {t('catalog_management')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Do'kon mahsulotlari va katalogni boshqarish
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <StorefrontIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      {totalProducts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Jami mahsulotlar
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <VisibilityIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      {activeProducts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Faol mahsulotlar
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'warning.main' }}>
                    <TrendingUpIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      {totalPurchases}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Jami sotuvlar
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <CategoryIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      {avgPopularity}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      O'rtacha mashhurlik
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters and Actions */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
              <TextField
                placeholder="Mahsulot nomi yoki kategoriya bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ flexGrow: 1 }}
              />
              
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Kategoriya</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Kategoriya"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddProduct}
                sx={{ minWidth: 180 }}
              >
                Yangi mahsulot
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mahsulot</TableCell>
                  <TableCell>Kategoriya</TableCell>
                  <TableCell>Narx (JunCoin)</TableCell>
                  <TableCell>Mashhurlik</TableCell>
                  <TableCell>Sotuvlar</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Amallar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar 
                          src={product.image} 
                          variant="rounded"
                          sx={{ width: 56, height: 56 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {product.description}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={product.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <MoneyIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                        <Typography variant="h6" color="warning.main" fontWeight={700}>
                          {product.price}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'grey.200',
                            position: 'relative'
                          }}
                        >
                          <Box
                            sx={{
                              width: `${product.popularity}%`,
                              height: '100%',
                              borderRadius: 4,
                              bgcolor: product.popularity > 80 ? 'success.main' : 
                                       product.popularity > 60 ? 'warning.main' : 'error.main'
                            }}
                          />
                        </Box>
                        <Typography variant="body2" fontWeight={600}>
                          {product.popularity}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight={600}>
                        {product.purchases}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(product.status)}
                        color={getStatusColor(product.status)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEditProduct(product)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Mahsulot nomi"
              fullWidth
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            
            <FormControl fullWidth>
              <InputLabel>Kategoriya</InputLabel>
              <Select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                label="Kategoriya"
              >
                {categories.slice(1).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              label="Narx (JunCoin)"
              type="number"
              fullWidth
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            
            <TextField
              label="Tavsif"
              multiline
              rows={3}
              fullWidth
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={newProduct.status === 'active'}
                  onChange={(e) => setNewProduct({
                    ...newProduct, 
                    status: e.target.checked ? 'active' : 'inactive'
                  })}
                />
              }
              label="Faol mahsulot"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Bekor qilish</Button>
          <Button variant="contained" onClick={handleSaveProduct}>
            {editingProduct ? 'Yangilash' : 'Qo\'shish'}
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default AdminCatalog;