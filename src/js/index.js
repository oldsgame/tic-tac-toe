import createEventListener from './event-listener.js';
import createGame from './game.js';
import createNavigation from './navigation.js';

const navigation = createNavigation();
const game = createGame();

createEventListener(navigation, game);

navigation.to('home-page');
