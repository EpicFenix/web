function renderFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
  
    // Ejemplo de productos destacados (reemplaza con tus datos reales)
    const featuredProducts = [
      { 
        id: 1,
        name: 'Laptop Gaming XYZ', 
        image: 'https://via.placeholder.com/400x300?text=Laptop+Gaming', 
        price: 1299.99 
      },
      { 
        id: 2,
        name: 'Computadora de Escritorio ABC', 
        image: 'https://via.placeholder.com/400x300?text=Computadora', 
        price: 899.99 
      },
      // ... más productos
    ];
  
    featuredProductsContainer.innerHTML = ''; // Limpiamos el contenedor antes de agregar nuevos productos
  
    featuredProducts.forEach(product => {
      const productCard = `
        <div class="col-md-4 mb-3">
          <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">$${product.price.toFixed(2)}</p>
              <a href="#" class="btn btn-primary" data-page-id="product-details" data-product-id="${product.id}">Ver Detalles</a>
            </div>
          </div>
        </div>
      `;
      featuredProductsContainer.innerHTML += productCard; // Agregamos cada tarjeta al contenedor
    });
  }

//CATEGORIAS

  function loadCategoriesPage() {
    fetch('categorias.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
        renderProductList(); // Llama a la función para mostrar los productos
        setupFilters(); // Configura los eventos de los filtros
      });
  }
  
  function setupFilters() {
    const priceRange = document.getElementById('price-range');
    const priceRangeValue = document.getElementById('price-range-value');
    const brandFilters = document.getElementById('brand-filters');
  
    // Obtener marcas únicas de los productos
    const brands = [...new Set(products.map(product => product.brand))];
  
    // Generar checkboxes para las marcas
    brands.forEach(brand => {
      const checkbox = `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="${brand}" id="brand-${brand.replace(/\s+/g, '-').toLowerCase()}">
          <label class="form-check-label" for="brand-${brand.replace(/\s+/g, '-').toLowerCase()}">
            ${brand}
          </label>
        </div>
      `;
      brandFilters.innerHTML += checkbox;
    });
  
    function filterProducts() {
      const maxPrice = priceRange.value;
      const selectedBrands = Array.from(document.querySelectorAll('#brand-filters input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
      const selectedRating = document.querySelector('input[name="rating"]:checked').value;
  
      const filteredProducts = products.filter(product =>
        product.price <= maxPrice &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
        (selectedRating === '0' || product.rating >= parseInt(selectedRating)) // Corrección aquí
      );
  
      renderProductList(filteredProducts); 
    }
  
    priceRange.addEventListener('input', function() {
      priceRangeValue.textContent = `Hasta $${priceRange.value}`;
      filterProducts();
    });
  
    document.querySelectorAll('#brand-filters input[type="checkbox"], input[name="rating"]').forEach(input => {
      input.addEventListener('change', filterProducts);
    });
  }
  
  //DETALLES

  function loadProductDetailsPage(productId) {
    fetch('detalles-producto.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
  
        // Ejemplo de datos del producto (reemplaza con tus datos reales)
        const product = products.find(p => p.id === parseInt(productId)); 
  
        // Mostrar los detalles del producto en la página
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description || 'Descripción del producto.'; 
  
        // Mostrar las especificaciones (si existen)
        const productSpecsList = document.getElementById('product-specs');
        if (product.specs && product.specs.length > 0) {
          product.specs.forEach(spec => {
            const listItem = document.createElement('li');
            listItem.textContent = spec;
            productSpecsList.appendChild(listItem);
          });
        } else {
          productSpecsList.innerHTML = '<li>No hay especificaciones disponibles.</li>';
        }
  
        // Agregar evento al botón "Añadir al Carrito"
        document.getElementById('add-to-cart-button').addEventListener('click', () => {
          addToCart(product); 
        });
  
        // Lógica para manejar las reseñas (similar a la que ya tienes)
        setupReviews(productId); 
      });
  }
  
  function setupReviews(productId) {
    // ... (lógica para obtener y mostrar las reseñas, y para manejar el formulario de nueva reseña)
  }

  //CARRITO

  function loadCartPage() {
    fetch('carrito.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
        renderCartItems(); // Llama a la función para mostrar los productos del carrito
        setupCheckoutButton(); // Configura el evento del botón de pago
      });
  }

  function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
  
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Obtén los elementos del carrito desde localStorage
  
    cartItemsContainer.innerHTML = ''; // Limpia el contenedor antes de renderizar
    let total = 0;
  
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const row = `
        <tr>
          <td>${item.name}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>
            <input type="number" class="form-control quantity-input" value="${item.quantity}" min="1" data-index="${index}">
          </td>
          <td class="item-total">$${(item.price * item.quantity).toFixed(2)}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Eliminar</button>
          </td>
        </tr>
      `;
      cartItemsContainer.innerHTML += row;
    });
  
    cartTotal.textContent = `$${total.toFixed(2)}`;
  
    // Agregar eventos a los inputs de cantidad
    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', function() {
        const index = this.dataset.index;
        const newQuantity = parseInt(this.value, 10);
        if (newQuantity > 0) {
          updateCartItemQuantity(index, newQuantity);
        }
      });
    });
  }
  
  function setupCheckoutButton() {
    document.getElementById('checkout-button').addEventListener('click', () => {
      // Lógica para procesar el pago (puedes usar una solución de terceros como PayPal o Stripe)
      alert('Pago procesado exitosamente!'); 
      // ... (lógica para guardar el pedido, enviar correos, etc.)
    });
  }
  
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Actualiza el contador del carrito en el navbar
    renderCartItems(); // Vuelve a renderizar los elementos del carrito para reflejar los cambios
  }
  
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems(); 
    updateCartCount(); 
  }
  
  function updateCartItemQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems(); // Vuelve a renderizar los elementos del carrito para reflejar los cambios
  }
  
  function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;
  }
  
  //LOGIN

  function loadLoginPage() {
    fetch('login.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
        setupLoginForm(); // Configura el evento de envío del formulario
      });
  }
  
  function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
  
      // Lógica para verificar las credenciales y iniciar sesión (ejemplo básico)
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === email && user.password === password);
  
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Inicio de sesión exitoso.');
        window.location.href = 'index.html'; // Redirige a la página principal después de iniciar sesión
      } else {
        alert('Correo electrónico o contraseña incorrectos.');
      }
    });
  }
  
  //REGISTRO

  function loadRegistrationPage() {
    fetch('registro.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
        setupRegistrationForm(); // Configura el evento de envío del formulario
      });
  }
  function setupRegistrationForm() {
    const registrationForm = document.getElementById('registration-form');
  
    registrationForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Lógica para registrar al usuario (ejemplo básico)
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push({ username, email, password });
      localStorage.setItem('users', JSON.stringify(users));
  
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      window.location.href = 'login.html'; // Redirige a la página de inicio de sesión después de registrarse
    });
  }
  document.addEventListener('DOMContentLoaded', function() {
    // ... (código para manejar el inicio de sesión si el usuario ya está logueado) ...
  
    // Manejo de la navegación
    document.body.addEventListener('click', function(event) {
      if (event.target.classList.contains('nav-link')) { 
        event.preventDefault();
        const pageId = event.target.dataset.pageId;
  
        if (pageId === 'home') {
          loadHomePage();
          history.pushState(null, null, 'index.html'); 
        } else if (pageId === 'categorias') {
          loadCategoriesPage();
          history.pushState(null, null, 'categorias.html'); 
        } else if (pageId === 'product-details') {
          const productId = event.target.dataset.productId; 
          loadProductDetailsPage(productId);
          history.pushState(null, null, `detalles-producto.html?id=${productId}`); 
        } else if (pageId === 'carrito') {
          loadCartPage();
          history.pushState(null, null, 'carrito.html'); 
        } else if (pageId === 'login') {
          loadLoginPage();
          history.pushState(null, null, 'login.html'); 
        } else if (pageId === 'registro') {
          loadRegistrationPage();
          history.pushState(null, null, 'registro.html'); 
        } 
        // ... (manejo similar para las demás páginas)
      }
    });
  });
      
  //RESEÑAS

  function setupReviews(productId) {
    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');
  
    // Obtener las reseñas del producto desde localStorage
    let productReviews = JSON.parse(localStorage.getItem(`productReviews-${productId}`)) || [];
  
    function renderReviews() {
      reviewsList.innerHTML = ''; // Limpiamos la lista antes de renderizar
  
      if (productReviews.length === 0) {
        reviewsList.innerHTML = '<p>No hay reseñas para este producto aún.</p>';
      } else {
        productReviews.forEach(review => {
          const reviewElement = document.createElement('div');
          reviewElement.classList.add('mb-3');
          reviewElement.innerHTML = `
            <strong>${review.name}</strong> - ${'★'.repeat(review.rating)} ${'☆'.repeat(5 - review.rating)}
            <p>${review.comment}</p>
          `;
          reviewsList.appendChild(reviewElement);
        });
      }
    }
  
    // Manejar el envío del formulario de nueva reseña
    reviewForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const reviewerName = document.getElementById('reviewer-name').value;
      const reviewRating = parseInt(document.getElementById('review-rating').value, 10);
      const reviewComment = document.getElementById('review-comment').value;
  
      const newReview = {
        name: reviewerName,
        rating: reviewRating,
        comment: reviewComment
      };
  
      productReviews.push(newReview);
      localStorage.setItem(`productReviews-${productId}`, JSON.stringify(productReviews));
  
      alert('¡Gracias por tu reseña!');
      reviewForm.reset();
      renderReviews(); 
    });
  
    // Mostrar las reseñas iniciales
    renderReviews();
  }
  function loadHomePage() {
    // Ocultar todas las secciones excepto la de inicio
    document.querySelectorAll('#main-content > *:not(.home-section)').forEach(section => section.style.display = 'none');
  
    // Mostrar la sección de inicio (si existe)
    const homeSection = document.querySelector('#main-content .home-section');
    if (homeSection) {
      homeSection.style.display = 'block';
    } else {
      // Si no hay una sección de inicio definida, puedes mostrar un mensaje o cargar algún contenido predeterminado
      document.getElementById('main-content').innerHTML = '<h1>¡Bienvenido a la página de inicio!</h1>';
    }
  
    // Puedes agregar aquí cualquier otra lógica específica para la página de inicio, como inicializar el carrusel
  }
  function loadCategoriesPage() {
    fetch('categorias.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar la página de categorías.');
        }
        return response.text();
      })
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
        renderProductList();
        setupFilters();
      })
      .catch(error => {
        console.error(error);
        // Mostrar un mensaje de error al usuario o intentar cargar el contenido nuevamente
        document.getElementById('main-content').innerHTML = '<p>Error al cargar la página. Por favor, inténtalo de nuevo más tarde.</p>';
      });
  }
    