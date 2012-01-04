(function() {
  /**
   * Create a new Ember application.  This sets up Ember to manage
   * events and bindings in you app.  It is also your opportunity to
   * configure your Ember app (note how we are setting 'rootElement' to
   * tell Ember which part of our page it owns; this makes it possible
   * to embed this app in other pages in a friendly way).
   */
  window.Chess = Em.Application.create({
    rootElement: $('#chess-viewer-root')
  });
})();