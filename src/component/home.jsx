import React, { useState, useRef, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  useScrollTrigger,
  Fab,
  Zoom,
  useMediaQuery,
  List,
  ListItem,
  Grid,
  ListItemText,
} from "@mui/material";

// Création du thème
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Noir
    },
    secondary: {
      main: "#74BBFF", // Bleu clair
    },
    background: {
      default: "#000000", // Fond noir
    },
    text: {
      primary: "#FFFFFF", // Texte blanc
    },
  },
  typography: {
    fontFamily: '"Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "4rem",
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: "10px 20px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          boxShadow: "none",
        },
      },
    },
  },
});

// Sections du menu
const sections = [
  "Capture à 360°",
  "CamCam et les dogs",
  "Verrouillage de l'horizon à 360°",
];

// Lien PayPal
const paypalLink = "https://www.paypal.me/alvynyang?locale.x=en_FR";



// Composant principal
const Home = () => {
  const heroVideoRef = useRef(null);
  const camcamVideoRef = useRef(null);
  const horizonLockVideoRef = useRef(null);
  const [selectedSection, setSelectedSection] = useState("Capture à 360°");
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const playVideo = async (videoRef) => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.error("Erreur de lecture automatique de la vidéo :", error);
        }
      }
    };

    playVideo(heroVideoRef);
    playVideo(camcamVideoRef);
    playVideo(horizonLockVideoRef);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    const element = document.getElementById(
      section.replace(/\s+/g, "-").toLowerCase()
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {sections.map((section) => (
          <ListItem
            button
            key={section}
            onClick={() => handleSectionClick(section)}
          >
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
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Insta360 X4
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!isMobile && (
              <Box sx={{ display: "flex" }}>
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
                color: "black",
                fontWeight: "bold",
                fontSize: isMobile ? "0.7rem" : "0.875rem",
                padding: isMobile ? "5px 10px" : "10px 20px",
              }}
              href={paypalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              COTISER POUR CAMCAM
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menu latéral vertical pour desktop */}
      {!isMobile && (
        <Box
          sx={{
            position: "fixed",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "20px",
          }}
        >
          {sections.map((section, index) => (
            <Box
              key={index}
              sx={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
                marginBottom: "20px",
                cursor: "pointer",
                color:
                  selectedSection === section
                    ? theme.palette.secondary.main
                    : "rgba(255, 255, 255, 0.7)",
                transition: "color 0.3s",
                "&:hover": {
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
        <Box
          id="capture-à-360°"
          sx={{ position: "relative", height: "100vh", overflow: "hidden" }}
        >
          <video
            ref={heroVideoRef}
            preload="none"
            playsInline
            muted
            loop
            poster="https://res.insta360.com/static/016d26c7b543ee71cdbf277384bdf892/360-CG-PC.jpg"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <source
              src="https://media.insta360.com/static/1728bde3af4d712d58c03974cfb760de/360-CG-PC.mp4"
              type="video/mp4"
            />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
              zIndex: 1,
              width: "90%",
            }}
          >
            <Typography
              variant="h1"
              gutterBottom
              sx={{ color: theme.palette.secondary.main }}
            >
              Capture à 360°
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}
            >
              Capturez l'instant BG, créez des souvenirs de fou furieux
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: isMobile ? "0.8rem" : "1rem",
                padding: isMobile ? "8px 16px" : "10px 20px",
              }}
              href={paypalLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cotiser pour CamCam
            </Button>
          </Box>
        </Box>

        {/* Section CamCam et les dogs */}
        <Box
          id="camcam-et-les-dogs"
          sx={{
            bgcolor: "black",
            color: "white",
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: theme.palette.secondary.main }}
            >
              CAMCAM ET LES DOGS
            </Typography>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
              PERFORMANCE DE FOU SA MERE !
            </Typography>

            <Box
              sx={{
                position: "relative",
                height: "40vh",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <video
                ref={camcamVideoRef}
                preload="none"
                playsInline
                muted
                loop
                poster="https://res.insta360.com/static/a2a2f124a31a5b2b5b3329591ec590b9/Stabilization.jpg"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              >
                <source
                  src="https://media.insta360.com/static/151b4947ca8ccb546e214985de506ee7/Stabilization.mp4"
                  type="video/mp4"
                />
                Votre navigateur ne supporte pas la balise vidéo.
              </video>
            </Box>
          </Container>
        </Box>

        {/* Section Verrouillage de l'horizon à 360° */}
        <Box
          id="verrouillage-de-l'horizon-à-360°"
          sx={{
            bgcolor: "black",
            color: "white",
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: theme.palette.secondary.main }}
            >
              VERROUILLAGE DE L'HORIZON À 360°
            </Typography>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
              LA STABILITÉ ELLE TUE A MOORT !
            </Typography>

            <Box
              sx={{
                position: "relative",
                height: "50vh",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <video
                ref={horizonLockVideoRef}
                preload="none"
                playsInline
                muted
                loop
                poster="https://res.insta360.com/static/6facb8d01fe6c8c0323295794daaec95/Bullet-Time_PC.jpg"
                style={{
                  width: "80%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              >
                <source
                  src="https://media.insta360.com/static/2ecd9bd98653d44f80e80749fa308f05/Bullet%20Time_PC_1728x972.mp4"
                  type="video/mp4"
                />
                Votre navigateur ne supporte pas la balise vidéo.
              </video>
            </Box>
          </Container>
        </Box>

 
      {/* Nouvelle section d'achat */}
      <Box
  id="acheter-maintenant"
  sx={{
    bgcolor: '#000',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: { xs: '', md: 'none' },
  }}
>
  <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h2" component="h2" gutterBottom sx={{ 
          fontWeight: 'bold',
          fontSize: { xs: '2rem', md: '3rem' }
        }}>
          Insta360 X4
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ 
          fontWeight: 300,
          fontSize: { xs: '1.2rem', md: '1.5rem' }
        }}>
          Filmez l'impossible. (Chui Chokbar)
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="https://www.paypal.me/alvynyang?locale.x=en_FR"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            mt: 3,
            bgcolor: '#74BBFF',
            color: 'black',
            fontWeight: 'bold',
            padding: { xs: '10px 30px', md: '10px 20px' },
            borderRadius: { xs: '25px', md: '4px' },
            textTransform: { xs: 'uppercase', md: 'none' },
            '&:hover': {
              bgcolor: '#5ba8f5',
            },
          }}
        >
          {({ xs: 'COTISER POUR CAMCAM', md: 'COTISER POUR CAMCAM' })[
            Object.keys({ xs: 'COTISER POUR CAMCAM', md: 'COTISER POUR CAMCAM' })
              .filter((size) => window.matchMedia(`(min-width: ${theme.breakpoints.values[size]}px)`).matches)
              .pop()
          ]}
        </Button>
      </Grid>
    </Grid>
  </Container>
  <Box
    component="img"
    src="https://res.insta360.com/static/8e5f3048318cd127658a5205f2fe61fd/buy_page.jpg"
    alt="Insta360 X4"
    sx={{
      position: { xs: 'absolute', md: 'absolute' },
      top: { xs: '18%', md: '50%' },
      right: { xs: '-20%', md: '20%' },
      transform: { xs: 'none', md: 'translateY(-50%)' },
      maxHeight: { xs: '120%', md: '90%' },
      maxWidth: { xs: '214%', md: '60%' },
      marginTop: { xs: '32px', md: 0 },
      objectFit: 'contain',
    }}
  />
</Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;