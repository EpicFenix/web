<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Epic Tech</title>
  <link rel="stylesheet" href="css/style.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"> </head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="#">Epic Tech</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#" data-page-id="login">Iniciar Sesión</a>
              </li>
              <li class="nav-item">
                 <a class="nav-link" href="#" data-page-id="registro">Registrarse</a>
              </li>
                  
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#" data-page-id="home">Inicio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-page-id="categorias">Categorías</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-page-id="ofertas">Ofertas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-page-id="contacto">Contacto</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-page-id="carrito"><i class="fas fa-shopping-cart"></i> Carrito</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
  <div id="app">
    <h1>¡Bienvenido a Epic Tech!</h1>
    <p>Tu tienda de tecnología favorita.</p>
    <div id="bannerCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="Imagenes/case_Teros.jpeg" class="d-block w-100" alt="Banner 1" style="height: 500px; object-fit: cover;" width="40">
          </div>
          <div class="carousel-item">
            <img src="Imagenes/laptop_Lenovo.jpeg" class="d-block w-100" alt="Banner 2" width="40" height="500">
          </div>
          <div class="carousel-item">
            <img src="Imagenes/monitor_Curvo_Teros_Te2764G_27.jpeg" class="d-block w-100" alt="Banner 3" width="40" height="500">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>
      <section class="py-5">
        <div class="container">
          <h2 class="text-center mb-4">Productos Destacados</h2>
          <div class="row" id="featured-products">
            </div>
        </div>
      </section>
            
  </div>
  <div id="main-content">
</div>

<footer class="footer">
<div class="container">
  <div class="row">
    <div class="col-md-3 mb-4">
      <h5>Sobre Nosotros</h5>
      <p>Tienda Epic Tech es tu destino de confianza para productos tecnológicos de alta calidad.</p>
    </div>
    <div class="col-md-3 mb-4">
      <h5>Enlaces Rápidos</h5>
      <ul class="list-unstyled">
        <li><a href="#" data-page-id="home">Inicio</a></li>
        <li><a href="#" data-page-id="categorias">Categorías</a></li>
        <li><a href="#" data-page-id="ofertas">Ofertas</a></li>
        <li><a href="#" data-page-id="contacto">Contacto</a></li>
      </ul>
    </div>
    <div class="col-md-3 mb-4">
      <h5>Servicio al Cliente</h5>
      <ul class="list-unstyled">
        <li><a href="#">Preguntas Frecuentes</a></li>
        <li><a href="#">Política de Devoluciones</a></li>
        <li><a href="#">Términos y Condiciones</a></li>
        <li><a href="#">Política de Privacidad</a></li>
      </ul>
    </div>
    <div class="col-md-3 mb-4">
      <h5>Contáctanos</h5>
      <p><i class="fas fa-map-marker-alt me-2"></i>123 Calle Principal, Ciudad, País</p>
      <p><i class="fas fa-phone me-2"></i>+123 456 7890</p>
      <p><i class="fas fa-envelope me-2"></i>contacto@epictech.com</p>
      <div>
        <a href="#" class="me-3"><i class="fab fa-facebook fa-lg"></i></a>
        <a href="#" class="me-3"><i class="fab fa-twitter fa-lg"></i></a>
        <a href="#" class="me-3"><i class="fab fa-instagram fa-lg"></i></a>   

        <a href="#"><i   
class="fab fa-linkedin fa-lg"></i></a>
      </div>
    </div>
  </div>
  <hr class="bg-white">
  <div class="text-center">
    <p class="mb-0">&copy; 2023 Epic Tech. Todos los derechos reservados.</p>
  </div>
</div>
</footer>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
  <script src="js/script.js"></script>
</body>
</html>
