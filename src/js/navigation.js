export default function createNavigation() {
    const PAGES = ['home-page', 'game-page'];

    function to(url) {
        document.getElementById('buttonBack').style.display = url === 'home-page' ? 'none' : 'block';

        for (let page of PAGES) {
            const style = document.getElementById(page).style;
            if (page === url) {
                style.display = 'block';
                style.opacity = '1';
                style.height = 'fit-content';
                style.zIndex = '100';
            } else {
                style.display = 'none';
                style.opacity = '0';
                style.height = '0px';
                style.zIndex = '0';
            }
        }
    }

    return {
        to
    };
}
