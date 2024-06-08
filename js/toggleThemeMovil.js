document.addEventListener('DOMContentLoaded', function () {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const hat = toggleSwitch.querySelector('.chef-hat');
  const themeCheckbox = document.querySelector('input[name="toggleSwitch"]');
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('tema', 'dark');
      hat.classList.add('flipped');
    } else {
      root.setAttribute('tema', 'light');
      hat.classList.remove('flipped');
    }

    // Guardar la selección del tema en el localStorage
    localStorage.setItem('selectedTheme', theme);
  }

  themeCheckbox.addEventListener('change', function (event) {
    const selectedTheme = event.target.checked ? 'dark' : 'light';
    applyTheme(selectedTheme);
  });

  const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const systemTheme = systemThemeQuery.matches ? 'dark' : 'light';

  // Recuperar la selección del tema desde el localStorage o usar el tema del sistema
  const savedTheme = localStorage.getItem('selectedTheme') || systemTheme;

  // Aplicar el tema al cargar la página
  applyTheme(savedTheme);
});
