var Board = Backbone.Collection.extend({
  model: Cell,
  initialize: function(models, opts){
    _.bindAll(this, 'comparator');
    this.height = opts.height;
    this.width = opts.width;
    this.mines = opts.mines;
    var placements = this.select_mine_placements(this.height * this.width, opts.mines);
    for(var i=0; i < this.height; i++) {
      for(var j = 0 ; j < this.width; j++) {
        is_mine = _.include(placements, i * this.width + j);
	this.add(new Cell({x:i, y:j, mine: is_mine}));
      }
    } 
  },
  comparator: function(cell) {
    return cell.x() * this.width + cell.y();
  },
  
  select_mine_placements: function(size, mine_count) {
    var placements = [];
    for(var i = 0 ; i < mine_count; i++) {
      var placement = Math.floor(Math.random()*size);
      for(var try_num = 0; try_num < 5; try_num ++) {
        if (!_.include(placements, placement)) {
          placements.push(placement);
          break;
        } else {
          //TODO this is not in working state, with some probablity we can get less than expected mines
          placement = (placements[0] + placement) % size;
          if (!_.include(placements, placement)) {
            placements.push(placement);
            break;
          }
        }
      }
    }
    return placements;
  },
  get_cell: function(x, y) {
    return this.at (x * this.width + y);
  }
});
