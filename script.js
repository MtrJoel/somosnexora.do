// Menú móvil
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Envío del formulario de contacto a Formspree (sin backend propio)
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const submitBtn = document.getElementById('formSubmit');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    formMsg.className = 'form-msg';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formMsg.textContent = '¡Gracias! Recibimos su solicitud, le contactaremos pronto.';
        formMsg.classList.add('show', 'success');
        form.reset();
      } else {
        throw new Error('Error en el envío');
      }
    } catch (err) {
      formMsg.textContent = 'No se pudo enviar. Intente de nuevo o escríbanos por WhatsApp.';
      formMsg.classList.add('show', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar solicitud';
    }
  });
}