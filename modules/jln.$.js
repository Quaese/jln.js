/* global jln, require */
(function(){
	"use strict";
	
	
	if(!Array.indexOf || !String.trim){
		require(["jln.polyfills"]);
	}
	
	var $;
	$ = function $(get, node){
		/**
		* Function $
		* 
		* @lastModified: 13.10.2014
		* @module: jln.$
		* @description: returns all elements that match the specified group of CSS selectors or tag name
		* @param: get {String} search and return the specified elements; multiple queries separated by comma
		* @param: node {Object} [optional] search in descendants of this element
		* @return: {Array} returns found elements as array; returns single element as element
		*/
		var queries, nodelistArray, selector, query, nodes;
		if(!node){
			node = document;
		}
		if(typeof get === "string"){
			queries	= get.split(",");
			nodes = [];
			for(var i = 0; i < queries.length; i++){
				query = queries[i].trim();
				selector = query.charAt(0);
				switch(selector){
					case "#": //get element by id
						nodelistArray = node.getElementById(query.substr(1, query.length)); //remove selector
						nodelistArray = [nodelistArray]; //convert element to array
					break;
					case "<": //get elements by tag name
						nodelistArray = node.getElementsByTagName(query.substr(1, query.length-2)); //remove opening "<" and closing ">"
					break;
					case "*": //get all elements of node
						nodelistArray = node.getElementsByTagName("*");
					break;
					default:
						nodelistArray = node.querySelectorAll(queries[i]);
					break;
				}
				for(var ii = 0; ii < nodelistArray.length; ii++){
					if(nodes.indexOf(nodelistArray[ii]) === -1 && nodelistArray[ii] !== null){ //filter out duplicates
						nodes.push(nodelistArray[ii]);
					}
				}
			}
		}
		else{
			nodes = get;
		}
		if(nodes.length === 0){
			return null;
		}
		else if(nodes.length === 1){ //return single element as element and not as array with one key
			return nodes[0];
		}
		else{
			return nodes;
		}
	};
	
	$.first = function first(selector, node){
		/**
		* Function $.first
		* 
		* @lastModified: 13.10.2014
		* @description: returns the first element that match the specified group of CSS selectors
		* @param: selector {String} group of CSS selectors to match on
		* @param: node {Object} [optional] search in descendants of this element
		* @return: {Object} returns the first found descendant of node that matches the specified selectors
		*/
		if(!node){
			node = document;
		}
		return node.querySelector(selector);
	};




	if(typeof jln === "object"){
		jln.$ = $;
	}
	else{
		throw new Error("jln.js was not found. You must embed it before all other modules!");
	}
	
})();
