
const themeSettingBtn = document.querySelector('.theme-setting-btn');
themeSettingBtn.addEventListener("click", toggleTheme);

function toggleTheme() {
    const html = document.querySelector(':root')

    //get saved theme setting from localStorage
    const currentTheme = localStorage.getItem('theme');

    //if current theme is dark, set it to light
    if (currentTheme === 'dark') {
        html.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
    }
    else {
        html.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}