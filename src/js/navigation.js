export default function createNavigation() {
    const PAGES = ['home-page', 'game-page'];

    function to(url) {
        document.getElementById('buttonBack').style.display = url === 'home-page' ? 'none' : 'block';

        for (let page of PAGES) {
            const style = document.getElementById(page).style;
            if (page === url) {
                style.display = 'flex';
            } else {
                style.display = 'none';
            }
        }
    }

    return {
        to
    };
}
