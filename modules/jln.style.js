/* global jln, require */
(function(){
	"use strict";


	if(!Object.keys || !String.trim){
		require(["jln.polyfills"]);
	}


	var style;
	style = {
		/**
		* Object style
		* 
		* @lastModified: 18.10.2014
		* @module: jln.style
		*/
		set: function set(element, styles){
			/**
			* Function style.set
			*
			* @lastModified: 18.10.2014
			* @description: apply styles to specified element
			* @param: element {Object} element to apply styles to
			* @param: styles {String} string with style assignements, like the definition of inline styles
			* @param: styles {Object} can also be an associative array with style assignements
			* @return: {Object} returns the styled element
			*/
			if(typeof element === "object" && typeof styles === "string"){
				var splitKeyFromValue, match;
				splitKeyFromValue = /^\s*([a-z\-]+)\s*:\s*((?:[^;"]|"(?:\\.|[^"])*")*?)\s*(?:;|$)\s*/i;
				for(match = splitKeyFromValue.exec(styles); match !== null; match = splitKeyFromValue.exec(styles)){
					var styleKey, styleValue;
					styleKey = match[1].replace(/-(.)/g, function(match1, match2){
        					match1 = null;
						return match2.toUpperCase();
					});
					if (styleKey.match(/^Ms[A-Z]/)){ //vendor prefix "ms" is written in lower case
						styleKey = "m" + styleKey.substring(1, styleKey.length);
					}
					styleValue = match[2];
					styles = styles.substring(match[0].length);
					element.style[styleKey] = styleValue; //apply style to element

				}
				if(styles.length === 0){
					console.log("Applied styles to ", element, "\n", element.styles);	
				}
				else{
          				element = null;
					throw new Error("Unable to parse " + styles);
				}
			}
			else if(typeof element === "object" && typeof styles === "object"){
				var styleKeys;
				styleKeys = Object.keys(styles);
				if(styleKeys.length > 0){
					for(var i = 0; i < styleKeys.length; i++){ //loop through object and set styles
						var styleKey, styleValue;
						styleKey = styleKeys[i];
						styleValue = styles[styleKeys[i]].trim();
						element.style[styleKey] = styleValue; //apply style to element
					}
					console.log("Applied ", styles, "to ", element);	
				}
			}
			else{
        			element = null;
				throw new Error("Can't apply styles to " + element);
			}
			return element;
		},
		addClass: function addClass(element, className, removeOther){
			/**
			* Function style.addClass
			*
			* @lastModified: 18.10.2014
			* @description: adds the defined CSS class to element
			* @param: element {Object} element to add class to
			* @param: className {String} class to add
			* @param: removeOther {Boolean} [optional, default: false] remove all other classes before adding the new
			* @return: {Object} returns the element to which the class was added
			*/
			if(typeof element === "object" && typeof className === "string"){
				if(removeOther === true){
					element.className = className.trim();
				}
				else{
					element.className = element.className.trim() + " " + className.trim();
				}
			}
			else{
				element = null;
				throw new Error("Can't add CSS Class.");
			}
			return element;
		},
		toggleClass: function toggleClass(element, className, force){
			/**
			* Function style.toggleClass
			*
			* @lastModified: 18.10.2014
			* @description: toggles the existence of a CSS class of an element
			* @param: element {Object} element whose class should be changed
			* @param: className {String} class to toggle
			* @param: force {Boolean} [optional] force to add (true) or remove (false) the CSS class, regardless of their existence
			* @return: {Object} returns the element to which the class was added
			*/
			if(typeof element === "object" && typeof className === "string"){
				className = className.trim();
				var nativeSupport;
				nativeSupport = "classList" in document.createElement("div");
				if(nativeSupport === true){
					element.classList.toggle(className, force);
				}
				else{
					var containsClass;
					containsClass = jln.style.containsClass(element, className);
					if(force === true){
						containsClass = false;
					}
					else if(force === false){
						containsClass = true;
					}
					if(containsClass === true){
						jln.style.removeClass(element, className);
					}
					else{
						jln.style.addClass(element, className);
					}
				}
			}
			else{
				element = null;
				throw new Error("Can't toggle CSS Class.");
			}
		},
		removeClass: function removeClass(element, className){
			/**
			* Function style.removeClass
			*
			* @lastModified: 18.10.2014
			* @description: removes the defined CSS class from element
			* @param: element {Object} element from which the class should be removed
			* @param: className {String} class to remove
			* @return: {Object} returns the element from which the class was removed
			*/
			if(typeof element === "object" && typeof className === "string"){
				className = className.trim();
				var nativeSupport;
				nativeSupport = "classList" in document.createElement("div");
				if(nativeSupport === true){
					element.classList.remove(className);
				}
				else{
					element.className = element.className.replace(new RegExp("(?:^|\\s)" + className + "(?!\\S)", "i"), "");
				}
			}
			else{
				element = null;
				throw new Error("Can't remove CSS Class.");
			}
			return element;
		},
		containsClass: function	containsClass(element, className){
			/**
			* Function style.containsClass
			*
			* @lastModified: 13.10.2014
			* @description: checks if an element contains a specific class
			* @param: element {Object} element to check
			* @param: className {String} class to search for
			* @return: {Boolean} returns whether the element contains the defined CSS class
			*/
			var found;
			found = null;
			if(typeof element === "object" && typeof className === "string"){
				className = className.trim();
				var nativeSupport;
				nativeSupport = "classList" in document.createElement("div");
				if(nativeSupport === true){
					found = element.classList.contains(className);
				}
				else{
					found = element.className.search(new RegExp("(?:^|\\s)" + className + "(?!\\S)", "i"));
					if(found === -1){
						found = false;
					}
					else{
						found = true;
					}
				}
			}
			return found;
		}
	};




	if(typeof jln === "object"){
		jln.style = style;
	}
	else{
		throw new Error("jln.js was not found. You must embed it before all other modules!");
	}
	
})();
