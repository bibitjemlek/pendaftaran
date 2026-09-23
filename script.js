// Fitur Dark Mode Sederhana
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '☀️ Mode Terang';
    } else {
        darkModeToggle.innerHTML = '🌙 Mode Gelap';
    }
});