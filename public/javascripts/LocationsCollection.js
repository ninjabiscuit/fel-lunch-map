define(["underscore", "backbone", "LocationsModel", "locations"], function(_, Backbone, LocationsModel, locations){
  return Backbone.Collection.extend({

    model : LocationsModel,

    initialize : function() {
      this.add(locations);
    }

  });
});