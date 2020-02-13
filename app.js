(function() {
    let player = true;

    function handleClick(celula) {
        celula.innerHTML = player ? "☕" : "☘️";
        player = !player;
    }

    document.querySelectorAll('td').forEach(celula => {
        celula.onclick = () => handleClick(celula);
    });
})();
