/*!
 * jquery-geoloc.js - jQuery plugin for geolocation.
 */

;(function($, global, undefined) {
  'use strict';

  var pluginName = 'geoloc',
      version = '0.0.0';

  var defaults = {};

  /**
   * Plugin constructor.
   * @param {Object} options A plugin options.
   * @constructor
   */
  function Plugin(options) {
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this._clearWatchId = null;
    this.init(options);
  }

  Plugin.prototype = {
    init: function(options) {
      this.watchPosition(options);
    },
    watchPosition: function(options) {
      this.clearWatch();
      this._clearWatchId = navigator.geolocation.watchPosition(
        this.onSuccessWatchPosition, this.onErrorWatchPosition, options);
    },
    clearWatch: function() {
      var id = this._clearWatchId;
      id && navigator.geolocation.clearWatch(id);
      this._clearWatchId = null;
    },
    /**
     * On success callback with notifying.
     *    trigger: success
     * @param {Position} position The container for the geolocation information.
     */
    onSuccessWatchPosition: function(position) {
      var event = jQuery.Event('success');
      event.position = position;  // {coords: Coordinates, timestamp: [timestamp]}
      $(navigator.geolocation).trigger(event, position);
    },
    /**
     * On Error callback with notifying.
     *    trigger: denied, unavailable, timeout, unknownerror.
     * @param {PositionError} error The positionError container.
     */
    onErrorWatchPosition: function(error) {
      this.clearWatchPosition();  // Clear curernt watchPosition.
      var eventType = null;
      switch (error.code) {
        case error.PERMISION_DENIED:
          eventType = 'denied';
          break;
        case error.POSITION_UNAVAILABLE:
          eventType = 'unavailable';
          break;
        case error.TIMEOUT:
          eventType = 'timeout';
          break;
        default:
          eventType = 'unknownerror';
          break;
      }
      var event = jQuery.Event(eventType);
      event.error = error;  // {code: [1-3], message: 'An error message'}
      $(navigator.geolocation).trigger(event, error);
    },
  };

  /**
   * Geolocation api with jQuery wrappers.
   * @see http://dev.w3.org/geo/api/spec-source.html
   */
  $[pluginName] = {
    /**
     * @param {PositionOptions} options HTML5 Geolocation properties.
     * @return {jQuery.Deferred} jQuery.Deferred object.
     */
    getCurrentPositionDeferred: function(options) {
      var deferred = $.Deferred();
      navigator.geolocation.getCurrentPosition(
        deferred.resolve, deferred.reject, options);
      return deferred.promise();
    },
    /**
     * @param {PositionOptions} options HTML5 Geolocation properties.
     * @return {Plugin} The Plugin instance.
     */
    watchPositionWithNotifying: function(options) {
      return new Plugin(options);
    }
  }
}(jQuery, this));
