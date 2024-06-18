document.addEventListener('DOMContentLoaded', function () {
  const themeCheckbox = document.querySelector('input[name="light-dark"]');
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('tema', 'dark');
    } else {
      root.setAttribute('tema', 'light');
    }

    // Guardar la selección del tema en el localStorage
    localStorage.setItem('selectedTheme', theme);
  }

  let timerId; // Variable para almacenar el ID del temporizador


  themeCheckbox.addEventListener('change', function (event) {
    clearTimeout(timerId); // Limpiar el temporizador existente

    // Configurar un nuevo temporizador de 3 segundos
    timerId = setTimeout(function () {
      const selectedTheme = event.target.checked ? 'dark' : 'light';
      applyTheme(selectedTheme);
    }, 3000); // 3000 milisegundos = 3 segundos
  });

    const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = systemThemeQuery.matches ? 'dark' : 'light';

    // Recuperar la selección del tema desde el localStorage o usar el tema del sistema
    const savedTheme = localStorage.getItem('selectedTheme') || systemTheme;

    // Si el tema actual es dark y el checkbox está activo, cambiarlo a light
    if (savedTheme === 'dark') {
      applyTheme('light');
    } else {
      applyTheme(savedTheme);
    }
});
