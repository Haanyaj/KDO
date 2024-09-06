import React, { useState, useRef, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
  Box,
  useScrollTrigger,
  Fab,
  Zoom,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ChevronRight, Menu as MenuIcon } from 'lucide-react';

// Création du thème
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Noir
    },
    secondary: {
      main: '#74BBFF', // Bleu clair
    },
    background: {
      default: '#000000', // Fond noir
    },
    text: {
      primary: '#FFFFFF', // Texte blanc
    },
  },
  typography: {
    fontFamily: '"Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '4rem',
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '10px 20px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          boxShadow: 'none',
        },
      },
    },
  },
});

// Sections du menu
const sections = [
  'Capture à 360°',
  'Édition par l\'IA',
  'Verrouillage de l\'horizon à 360°',
  'Étanche',
  'Facile à utiliser',
  'Soyez au cœur de l\'action',
];

// Lien PayPal
const paypalLink = "https://www.paypal.me/alvynyang?locale.x=en_FR";

// Composant pour le bouton de retour en haut
function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

// Composant principal
const Home = () => {
  const heroVideoRef = useRef(null);
  const [selectedSection, setSelectedSection] = useState('Capture à 360°');
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(error => {
        console.error("Erreur de lecture automatique de la vidéo hero :", error);
      });
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    const element = document.getElementById(section.replace(/\s+/g, '-').toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {sections.map((section) => (
          <ListItem button key={section} onClick={() => handleSectionClick(section)}>
            <ListItemText primary={section} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Barre de navigation */}
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Insta360 X4
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && (
              <Box sx={{ display: 'flex' }}>
                {sections.map((section) => (
                  <Button 
                    key={section}
                    color="inherit" 
                    onClick={() => handleSectionClick(section)}
                  >
                    {section}
                  </Button>
                ))}
              </Box>
            )}
            <Button 
              variant="contained" 
              color="secondary" 
              sx={{ 
                ml: 2, 
                color: 'black', 
                fontWeight: 'bold',
                fontSize: isMobile ? '0.7rem' : '0.875rem',
                padding: isMobile ? '5px 10px' : '10px 20px',
              }}
              href={paypalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              ACHETER MAINTENANT
            </Button>
           
          </Box>
        </Toolbar>
      </AppBar>
      
     

      {/* Menu latéral vertical pour desktop */}
      {!isMobile && (
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '20px',
          }}
        >
          {sections.map((section, index) => (
            <Box
              key={index}
              sx={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                marginBottom: '20px',
                cursor: 'pointer',
                color: selectedSection === section ? theme.palette.secondary.main : 'rgba(255, 255, 255, 0.7)',
                transition: 'color 0.3s',
                '&:hover': {
                  color: theme.palette.secondary.main,
                },
              }}
              onClick={() => handleSectionClick(section)}
            >
              <Typography variant="body2">{section}</Typography>
            </Box>
          ))}
        </Box>
      )}
      
      <Container maxWidth={false} disableGutters>
        {/* Section Capture à 360° */}
        <Box id="capture-à-360°" sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
          <video
            ref={heroVideoRef}
            preload="none"
            playsInline
            muted
            loop
            poster="https://res.insta360.com/static/016d26c7b543ee71cdbf277384bdf892/360-CG-PC.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <source src="https://media.insta360.com/static/1728bde3af4d712d58c03974cfb760de/360-CG-PC.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
              zIndex: 1,
              width: '90%',
            }}
          >
            <Typography variant="h1" gutterBottom sx={{ color: theme.palette.secondary.main }}>
              Capture à 360°
            </Typography>
            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
              Capturez l'instant, créez des souvenirs
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large" 
              sx={{ 
                color: 'black', 
                fontWeight: 'bold',
                fontSize: isMobile ? '0.8rem' : '1rem',
                padding: isMobile ? '8px 16px' : '10px 20px',
              }}
              href={paypalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Découvrir
            </Button>
          </Box>
        </Box>
        
        {/* Autres sections */}
        {sections.slice(1).map((section, index) => (
          <Box 
            key={section}
            id={section.replace(/\s+/g, '-').toLowerCase()} 
            sx={{ 
              bgcolor: index % 2 === 0 ? 'black' : 'rgba(255, 255, 255, 0.05)', 
              color: 'white', 
              py: 8 
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="h2" gutterBottom align="center">
                {section}
              </Typography>
              <Typography variant="body1" paragraph>
                Contenu pour la section {section}. Ajoutez ici plus de détails sur cette fonctionnalité.
              </Typography>
            </Container>
          </Box>
        ))}
      </Container>
      
      {/* Bouton de retour en haut */}
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <ChevronRight />
        </Fab>
      </ScrollTop>
    </ThemeProvider>
  );
};

export default Home;