
<template>
  <footer class="main-footer">
    <div class="footer-container">
      
      <div class="footer-section logo-section">
        <h3 class="logo">Movie love</h3>
        <p class="copyright">© 2025 Movie love. Todos los derechos reservados.</p>
      </div>

      <div class="footer-section">
        <h4>Películas</h4>
        <ul>
          <li><a href="#">Acción</a></li>
          <li><a href="#">Comedia</a></li>
          <li><a href="#">Drama</a></li>
          <li><a href="#">Animación</a></li>
          <li><a href="#">Fantasía</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Series</h4>
        <ul>
          <li><a href="#">Reality Shows</a></li>
          <li><a href="#">Salud y Fitness</a></li>
          <li><a href="#">Documentales</a></li>
          <li><a href="#">Infantil y Familiar</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Soporte</h4>
        <ul>
          <li><a href="#">Información General</a></li>
          <li><a href="#">Centro de Ayuda</a></li>
          <li><a href="#">Servicio al Cliente</a></li>
          <li><a href="#">Contáctanos</a></li>
        </ul>
      </div>

      <div class="footer-section social-section">
        <p class="follow-text">Síguenos en:</p>
        <div class="social-icons">
          <a href="#" class="icon-circle"><i class="bi bi-facebook"></i></a>
          <a href="#" class="icon-circle"><i class="bi bi-twitter"></i></a>
          <a href="#" class="icon-circle"><i class="bi bi-instagram"></i></a>
        </div>
        
        <p class="support-contact">Soporte: support@movielove.com</p>
        <p class="support-contact">Facturación: billing@movielove.com</p>
      </div>

    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped>
.main-footer {
  background-color: #1a1a1a; 
  color: #ffffff;
  padding: 60px 5%;
  font-family: Arial, sans-serif;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-container {
  display: flex;
  justify-content: space-between;
  max-width: 1300px;
  margin: 0 auto;
  flex-wrap: wrap; 
  gap: 30px; 
}

.footer-section {
  flex-basis: 150px; 
  flex-grow: 1;
}


.logo-section {
    flex-basis: 200px; 
}

.logo {
  color: #f7a900; 
  font-size: 1.8em;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
}

.copyright {
    font-size: 0.9em;
    color: rgba(255, 255, 255, 0.5);
}


h4 {
  font-size: 1.1em;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 20px;
  color: #f7a900; 
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  margin-bottom: 10px;
}

ul a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.95em;
  transition: color 0.3s;
}

ul a:hover {
  color: white;
}

.social-section {
    flex-basis: 250px;
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.follow-text {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 15px;
}

.social-icons {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.icon-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  font-size: 1.1em;
  transition: background-color 0.3s;
}

.icon-circle:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.support-contact {
    font-size: 0.9em;
    color: rgba(255, 255, 255, 0.6);
    margin: 5px 0;
}
</style>