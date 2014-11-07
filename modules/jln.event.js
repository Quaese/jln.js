/* global jln */
(function(){
	"use strict";


	var event;
	event = {
		/**
		* Object event
		* 
		* @lastModified: 07.11.2014
		* @module: jln.event
		*/
		bind: function bind(eventName, listener, element){
			/**
			* Function event.bind
			*
			* @lastModified: 07.11.2014
			* @description: adds an event listener to specified element
			* @param: element {Object} element to add event listener to
			* @param: eventName {String} event to listen for
			* @param: listener {Function} function to execute when an event of the specified type occurs 
			* @return: {Object} element to which the event listener was added
			*/
			if(typeof element === "undefined"){
				element = document;
			}
			if(document.addEventListener){
				element.addEventListener(eventName, listener, false);
			}
			else if(document.attachEvent){
				if(eventName === "DOMContentLoaded"){
					element = window;
					eventName = "load";
				}
				element.attachEvent("on" + eventName, listener);
			}
			return element;
		},
	
		remove: function remove(eventName, listener, element){
			/**
			* Function event.remove
			*
			* @lastModified: 07.11.2014
			* @description: removes a bound event listener from specified element
			* @param: element {Object} element to remove event listener from
			* @param: eventName {String} event from which the listener should be removed
			* @param: listener {Function} EventListener function to be removed
			* @return: {Object} element from which the event listener was removed
			*/
			if(typeof element === "undefined"){
				element = document;
			}
			if(document.removeEventListener){
				element.removeEventListener(eventName, listener, false);
			}
			else if(document.detachEvent){
				if(eventName === "DOMContentLoaded"){
					element = window;
					eventName = "load";
				}
				element.detachEvent("on" + eventName, listener);
			}
			return element;
		}
	};




	if(typeof jln === "object"){
		jln.event = event;
	}
	else{
		throw new Error("jln.js was not found. You must embed it before all other modules!");
	}
	
})();
