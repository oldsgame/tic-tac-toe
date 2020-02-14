(function() {
  let first_player = true;

  function handleClick() {
    if (!this.innerHTML) {
      this.innerHTML = first_player ? "☕" : "☘️";
      first_player = !first_player;
    }
  }

  function bindEvents(cell) {
    cell.onclick = handleClick;
  }

  document.querySelectorAll('td').forEach(bindEvents);
})();
