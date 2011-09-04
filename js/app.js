(function() {
  /**
   * Create a new Sproutcore application.  This sets up SC to manage
   * events and bindings in you app.  It is also your opportunity to
   * configure your SC app (note how we are setting 'rootElement' to
   * tell SC which part of our page it owns; this makes it possible
   * to embed this app in other pages in a friendly way).
   */
  window.Chess = SC.Application.create({
    rootElement: $('#chess-viewer-root')
  });
})();