function changeTheme() {
    var theme = document.querySelector('#themeButton').innerHTML;
    if (theme === 'Night') {
        document.documentElement.style.setProperty('--primary-color', '#c8c7d4');
        document.documentElement.style.setProperty('--background-color', '#454452');
        document.querySelector('#themeButton').innerHTML = 'Ocean';
    } else {
        document.documentElement.style.setProperty('--primary-color', '#7fcfe7');
        document.documentElement.style.setProperty('--background-color', 'teal');
        document.querySelector('#themeButton').innerHTML = 'Night';
    }
}