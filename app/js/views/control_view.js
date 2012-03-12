var ControlView = Backbone.View.extend({    
  tagName: 'div',
  className: 'control',
  initialize: function() {
    _.bindAll(this, 'render', 'render_time'); // fixes loss of context for 'this' within methods
    this.start = new Date().getTime() / 1000;
    this.render();
    self_el = this.el
    self_render_time = this.render_time;
    this.interval = setInterval(function() {
      $(self_el).find('#timer').html(self_render_time());
    }, 1000);
    this.model.bind('change', this.render);
  },

  render: function() {
    count = this.model.mines - _.reduce(this.model.models, function(memo, cell) {
      return memo += cell.get('state') == 'mark' ? 1 : 0
    }, 0);
    $(this.el).html('count: ' + count + ' time: <span id="timer">'+ this.render_time() +'</span>');
    covered = _.reduce(this.model.models, function(memo, cell) {
      return memo += (cell.get('state') == 'cover') ? 1 : 0
    }, 0);
    if(covered == 0) {
      clearInterval(this.interval);
    }
    return $(this.el);
  },

  render_time: function() {
    return Math.round((new Date().getTime() / 1000) -  this.start);
  }
});