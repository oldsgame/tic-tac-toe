export default function createEventListener(navigation, game) {
    // Header
    document.getElementById('buttonBack').onclick = () => {
        navigation.to('home-page');
    };

    // Home page
    document.getElementById('buttonHumanVsHuman').onclick = () => {
        game.setMode('H2H');
        navigation.to('game-page');
    };

    document.getElementById('buttonHumanVsBot').onclick = () => {
        game.setMode('H2B');
        navigation.to('game-page');
    };

    // Game page
    document.getElementById('buttonNewGame').onclick = () => {
        game.restart();
    };
}
