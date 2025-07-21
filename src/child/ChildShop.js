import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Alert,
  Badge,
  IconButton,
  Tooltip,
  Zoom,
  Slide
} from '@mui/material';
import {
  ShoppingCart as ShopIcon,
  MonetizationOn as CoinIcon,
  Search as SearchIcon,
  FavoriteIcon,
  Star as StarIcon,
  LocalOffer as OfferIcon,
  Category as CategoryIcon,
  CheckCircle as CheckIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import { 
  getJunCoinBalance,
  makePurchase,
  getPurchases
} from '../utils/juncoinSystem';
import { getCurrentTheme } from '../utils/themeSystem';

const mockUser = { 
  name: 'Bola', 
  avatar: '/images/user-def.png',
  juncoin: getJunCoinBalance()
};

// Mock shop products
const shopProducts = [
  {
    id: 1,
    name: 'LEGO Constructor Set',
    description: 'Ajoyib LEGO konstruktor to\'plami - 500 qism',
    price: 500,
    category: 'O\'yinchoqlar',
    image: '/images/coin-img.png',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    featured: true,
    tags: ['Yangi', 'Mashhur']
  },
  {
    id: 2,
    name: 'Velosiped',
    description: 'Bolalar uchun xavfsiz va chiroyli velosiped',
    price: 1000,
    category: 'Sport',
    image: '/images/coin-img.png',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
    tags: ['Premium', 'Yetkazib berish']
  },
  {
    id: 3,
    name: 'Kitoblar to\'plami',
    description: 'Qiziqarli va ta\'limli kitoblar 10 dona',
    price: 200,
    category: 'Ta\'lim',
    image: '/images/coin-img.png',
    rating: 4.6,
    reviews: 234,
    inStock: true,
    featured: false,
    tags: ['Ta\'lim']
  },
  {
    id: 4,
    name: 'Tablet',
    description: 'Ta\'lim uchun maxsus bolalar tableti',
    price: 1500,
    category: 'Texnologiya',
    image: '/images/coin-img.png',
    rating: 4.7,
    reviews: 67,
    inStock: true,
    featured: true,
    tags: ['Premium', 'Ta\'lim']
  },
  {
    id: 5,
    name: 'Art Set',
    description: 'Rasm chizish uchun to\'liq asboblar to\'plami',
    price: 300,
    category: 'San\'at',
    image: '/images/coin-img.png',
    rating: 4.5,
    reviews: 123,
    inStock: true,
    featured: false,
    tags: ['Ijodiy']
  },
  {
    id: 6,
    name: 'Board Game',
    description: 'Oila bilan o\'ynash uchun qiziqarli o\'yin',
    price: 150,
    category: 'O\'yinlar',
    image: '/images/coin-img.png',
    rating: 4.4,
    reviews: 198,
    inStock: false,
    featured: false,
    tags: ['Oila', 'Ko\'ngilochar']
  }
];

const categories = ['Barchasi', 'O\'yinchoqlar', 'Sport', 'Ta\'lim', 'Texnologiya', 'San\'at', 'O\'yinlar'];

const ChildShop = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState(shopProducts);
  const [filteredProducts, setFilteredProducts] = useState(shopProducts);
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [purchasedProduct, setPurchasedProduct] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const [userBalance, setUserBalance] = useState(getJunCoinBalance());
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchTerm]);

  const filterProducts = () => {
    let filtered = shopProducts;
    
    if (selectedCategory !== 'Barchasi') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handlePurchase = async (product) => {
    try {
      if (userBalance < product.price) {
        alert('Balansda yetarli JunCoin yo\'q!');
        return;
      }

      const result = makePurchase(product.id, product);
      setUserBalance(result.newBalance);
      mockUser.juncoin = result.newBalance;
      setPurchasedProduct(product);
      setShowPurchaseDialog(false);
      setShowSuccessDialog(true);
      
    } catch (error) {
      alert('Xarid qilishda xatolik: ' + error.message);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const ProductCard = ({ product }) => (
    <Zoom in timeout={300}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 12px 32px ${currentTheme.primary}30`
          }
        }}
      >
        {product.featured && (
          <Chip
            label="🌟 Mashhur"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 2,
              bgcolor: 'warning.main',
              color: 'white',
              fontWeight: 600
            }}
          />
        )}

        {!product.inStock && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.7)',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" color="white" fontWeight={700}>
              Sotuvda yo'q
            </Typography>
          </Box>
        )}

        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{ 
            objectFit: 'cover',
            background: `linear-gradient(45deg, ${currentTheme.primary}20, ${currentTheme.accent}20)`
          }}
        />

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            {product.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
            <Typography variant="body2" fontWeight={600}>
              {product.rating}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ({product.reviews} sharh)
            </Typography>
          </Stack>

          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
            {product.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
          </Stack>

          <Box sx={{ mt: 'auto' }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CoinIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                <Typography variant="h5" fontWeight={800} color="warning.main">
                  {product.price}
                </Typography>
              </Stack>
              
              <Chip
                label={product.category}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Stack>

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                fullWidth
                disabled={!product.inStock || userBalance < product.price}
                onClick={() => {
                  setSelectedProduct(product);
                  setShowPurchaseDialog(true);
                }}
                sx={{
                  background: userBalance >= product.price 
                    ? `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`
                    : 'grey.400',
                  '&:hover': {
                    background: userBalance >= product.price 
                      ? `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`
                      : 'grey.400'
                  }
                }}
              >
                {userBalance >= product.price ? 'Sotib olish' : 'Pul yetmaydi'}
              </Button>
              
              <IconButton
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                sx={{
                  bgcolor: currentTheme.accent + '20',
                  '&:hover': {
                    bgcolor: currentTheme.accent + '40'
                  }
                }}
              >
                <ShopIcon />
              </IconButton>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Zoom>
  );

  return (
    <MainLayout
      user={mockUser}
      role="child"
      onLogout={() => window.location.href = '/uz/login'}
      onNavigate={path => window.location.href = '/uz' + path}
    >
      <Box
        sx={{
          minHeight: '100vh',
          background: currentTheme.background,
          py: 4
        }}
      >
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography 
                  variant="h4" 
                  fontWeight={800} 
                  gutterBottom
                  sx={{ color: currentTheme.textPrimary }}
                >
                  {currentTheme.icons?.shop} JunCoin Do'koni
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ color: currentTheme.textSecondary }}
                >
                  JunCoin bilan ajoyib mahsulotlarni sotib oling!
                </Typography>
              </Box>
              
              <Stack direction="row" alignItems="center" spacing={2}>
                <Badge badgeContent={cart.length} color="error">
                  <IconButton
                    onClick={() => setShowCart(true)}
                    sx={{
                      bgcolor: currentTheme.primary,
                      color: 'white',
                      '&:hover': {
                        bgcolor: currentTheme.secondary
                      }
                    }}
                  >
                    <ShopIcon />
                  </IconButton>
                </Badge>
                
                <Card sx={{ p: 2, background: currentTheme.cardBackground }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CoinIcon sx={{ color: 'warning.main', fontSize: 24 }} />
                    <Typography variant="h6" fontWeight={800} color="warning.main">
                      {userBalance}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      JunCoin
                    </Typography>
                  </Stack>
                </Card>
              </Stack>
            </Stack>
          </Box>

          {/* Search and Filters */}
          <Card sx={{ mb: 3, background: currentTheme.cardBackground }}>
            <CardContent>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                <TextField
                  placeholder="Mahsulot qidirish..."
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
                
                <Tabs
                  value={selectedCategory}
                  onChange={(e, newValue) => setSelectedCategory(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {categories.map((category) => (
                    <Tab key={category} label={category} value={category} />
                  ))}
                </Tabs>
              </Stack>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {filteredProducts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Mahsulot topilmadi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Qidiruv shartlaringizni o'zgartiring
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* Purchase Confirmation Dialog */}
      <Dialog 
        open={showPurchaseDialog} 
        onClose={() => setShowPurchaseDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight={700}>
            Xaridni tasdiqlash
          </Typography>
        </DialogTitle>
        
        {selectedProduct && (
          <DialogContent>
            <Card sx={{ mb: 3 }}>
              <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                <Avatar 
                  src={selectedProduct.image} 
                  variant="rounded"
                  sx={{ width: 80, height: 80 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700}>
                    {selectedProduct.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {selectedProduct.description}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CoinIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                    <Typography variant="h5" fontWeight={800} color="warning.main">
                      {selectedProduct.price}
                    </Typography>
                    <Typography variant="body2">JunCoin</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Card>

            <Box sx={{ bgcolor: 'grey.50', borderRadius: 2, p: 2 }}>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Joriy balans:</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {userBalance} JunCoin
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Mahsulot narxi:</Typography>
                  <Typography variant="body2" fontWeight={600} color="error">
                    -{selectedProduct.price} JunCoin
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" fontWeight={700}>Qolgan balans:</Typography>
                  <Typography variant="h6" fontWeight={700} color="success.main">
                    {userBalance - selectedProduct.price} JunCoin
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </DialogContent>
        )}
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setShowPurchaseDialog(false)}>
            Bekor qilish
          </Button>
          <Button 
            variant="contained" 
            onClick={() => handlePurchase(selectedProduct)}
            disabled={!selectedProduct || userBalance < selectedProduct.price}
          >
            Sotib olish
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <Avatar 
            sx={{ 
              bgcolor: 'success.main', 
              width: 64, 
              height: 64, 
              mx: 'auto', 
              mb: 2 
            }}
          >
            <CheckIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h5" fontWeight={700} color="success.main">
            Xarid muvaffaqiyatli! 🎉
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: 'center' }}>
          {purchasedProduct && (
            <>
              <Typography variant="h6" gutterBottom>
                {purchasedProduct.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Mahsulot hisobingizga qo'shildi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Yangi balans: <strong>{userBalance} JunCoin</strong>
              </Typography>
            </>
          )}
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            variant="contained" 
            onClick={() => setShowSuccessDialog(false)}
            size="large"
          >
            Davom etish
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default ChildShop;