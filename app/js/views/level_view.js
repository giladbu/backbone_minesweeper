var LevelView = Backbone.View.extend({    
  el: 'ul.level',
  events: {
    'click a': 'start_game',
  },
  initialize: function() {
    _.bindAll(this, 'render', 'start_game'); // fixes loss of context for 'this' within methods
    this.render();
  },
  render: function() {
    $(this.el).append('<li><a href="#">Beginner</a></li>');
    $(this.el).append('<li><a href="#">Intermediate</a></li>');
    $(this.el).append('<li><a href="#">Expert</a></li>');
  },
  start_game: function(event) {
    if(typeof this.board !== 'undefined') { 
      this.board.remove();
    }
    $(this.el).find('li').removeClass('active');
    $(event.target).parent().addClass('active');
    var choice = $(event.target).text()
    if(choice == 'Expert') {
      params = {height:12, width:12, mines:40}
    } else if(choice == 'Intermediate') {
      params = {height:10, width:10, mines:20}
    } else {
      params = {height:8, width:8, mines:10}
    }
    this.board = new BoardView({model: new Board([], params)});
    return false;
  }
});
