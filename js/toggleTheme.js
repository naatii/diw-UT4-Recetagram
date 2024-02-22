document.addEventListener('DOMContentLoaded', function () {
  const themeDetails = document.getElementById('theme');
  const themeRadios = themeDetails.querySelectorAll('input[name="tema"]');
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'defaul') {
      root.removeAttribute('tema');
    } else {
      root.setAttribute('tema', theme);
    }

    // Guardar la selección del tema en el localStorage
    localStorage.setItem('selectedTheme', theme);
  }

  themeDetails.addEventListener('change', function (event) {
    const selectedTheme = event.target.value;
    applyTheme(selectedTheme);

    if (selectedTheme === 'defaul') {
      location.reload();
    }
  });

  // Detectar el tema del sistema en la carga de la página
  const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const systemTheme = systemThemeQuery.matches ? 'dark' : 'light';

  // Recuperar la selección del tema desde el localStorage o usar el tema del sistema
  const savedTheme = localStorage.getItem('selectedTheme') || systemTheme;
  applyTheme(savedTheme);

  // Trigger change event on page load to apply the default theme
  const defaultThemeRadio = themeDetails.querySelector('input[value="defaul"]');
  defaultThemeRadio.dispatchEvent(new Event('change'));
});
