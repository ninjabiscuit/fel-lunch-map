define(
  ["underscore", "backbone", "LocationsCollection", "LocationView", "tpl!locationHeaderTemplate.ejs", "map", "mediator"],
  function(_, Backbone, LocationsCollection, LocationView, locationHeaderTemplate, map, mediator){

  return Backbone.View.extend({

    el : "#navigation",

    template : locationHeaderTemplate,

    events : {
      "click #current_location" : "updateLocation",
      "click #fel_location" : "updateLocation"
    },

    initialize: function() {
      mediator.on("geolocation:allowed", this.toggleGeoHome, this);
      map();
      this.collection = new LocationsCollection();
      this.renderCollection();
    },

    renderCollection : function() {
      this.collection.each(this.renderLocation, this);
    },

    renderLocation : function(location) {
      this.$el.append(new LocationView({ model : location }).el);
    },

    toggleGeoHome : function() {
      this.$el.prepend(this.template());
    },

    updateLocation : function(e) {
      mediator.trigger('maps:change_location', e.currentTarget.id);
    }

  });
});