/* global jln */
(function(){
	"use strict";

	/**
	* @lastModified: 18.10.2014
	* @module: jln.polyfills
	*/


	if(typeof document.head === "undefined"){ //IE 8 does only know document.body, but not document.head
		document.head = document.getElementsByTagName("head")[0];
	}


	if(!Array.indexOf){ //polyfill for Array.indexOf() in IE 8
		Array.prototype.indexOf = function(key){
			var index;
      			index = -1;
			for(var i = 0; i < this.length; i++){
				if(this[i] === key){
					index = i;
					break;
				}
			}
			return index;
		};
	}
	
	
	if(!Object.keys){ //polyfill for Object.keys() in IE 8
		Object.prototype.keys = function(obj){
			var keys = [];
			for(var key in obj){
        			if(obj.hasOwnProperty(key)){
					keys.push(key);
        			}
			}
			return keys;
		};
	}


	if(!String.trim){ //polyfill for String.trim() in IE 8
		String.prototype.trim = function(){
			return this.replace(/^\s+|\s+$/g, "");
		};
	}




	if(typeof jln === "object"){
		jln.polyfills = true;
	}
	else{
		throw new Error("jln.js was not found. You must embed it before all other modules!");
	}
	
})();
