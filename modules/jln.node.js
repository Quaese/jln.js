/* global jln, require */
(function(){
	"use strict";


	if(!Object.keys){
		require(["jln.polyfills"]);
	}


	var node;
	node = {
		/**
		* Object node
		* 
		* @lastModified: 18.10.2014
		* @module: jln.node
		*/
		create: function create(tag, attributes){
			/**
			* Function node.create
			*
			* @lastModified: 18.10.2014
			* @description: creates a new node
			* @param: tag {String} type of the new node
			* @param: attributes {Object} [optional] associative array with attributes (key:value-pairs) which should be added to the element
			* @return: {Object} returns the new node
			*/
			var node;
			if(typeof tag === "string"){
				node = document.createElement(tag);
				if(typeof attributes === "object"){
					var attributeKeys;
					attributeKeys = Object.keys(attributes);
					for(var i = 0; i < attributeKeys.length; i++){
						node[attributeKeys[i]] = attributes[attributeKeys[i]];
					}
				}
			}
			else{
       				node = null;
				throw new Error("Can't create node.");
			}
			return node;
		},
		
		appendChild: function appendChild(referenceNode, node){
			/**
			* Function node.appendChild
			*
			* @lastModified: 18.10.2014
			* @description: appends node to referenceNode
			* @param: referenceNode {Object} node to which the new node should be appended
			* @param: node {Object} node to append to referenceNode
			* @return: {Object} returns the appended node
			*/
			if(typeof referenceNode === "object" && typeof node === "object"){
				referenceNode.appendChild(node);
			}
			else{
        			node = null;
				throw new Error("Can't append node.");
			}
			return node;
		},
		
		insertBefore: function insertBefore(referenceNode, node){
			/**
			* Function node.insertBefore
			*
			* @lastModified: 18.10.2014
			* @description: inserts node before referenceNode
			* @param: referenceNode {Object} node before which the other should be inserted
			* @param: node {Object} node to insert
			* @return: {Object} returns the inserted node
			*/
			if(referenceNode.parentNode){
				referenceNode.parentNode.insertBefore(node, referenceNode);
			}
			else{
        			node = null;
				throw new Error("Element is not in DOM.");
			}
			return node;
		},
		
		insertAfter: function insertAfter(referenceNode, node){
			/**
			* Function node.insertAfter
			*
			* @lastModified: 18.10.2014
			* @description: inserts node after referenceNode
			* @param: referenceNode {Object} node after which the other should be inserted
			* @param: node {Object} node to insert
			* @return: {Object} returns the inserted node
			*/
			if(referenceNode.parentNode){
				referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
			}
			else{
       				node = null;
				throw new Error("Element is not in DOM.");
			}
			return node;
		},
		
		remove: function remove(node){
			/**
			* Function node.remove
			*
			* @lastModified: 18.10.2014
			* @description: removes a node from DOM
			* @param: node {Object} node to remove
			* @return: {Boolean} returns whether the node was removed successfully
			*/
      			var success;
			if(node.parentNode){
				node.parentNode.removeChild(node);
				success = true;
			}
			else{
        			success = false;
				throw new Error("Element is not in DOM.");
			}
			return success;
		}
	};




	if(typeof jln === "object"){
		jln.node = node;
	}
	else{
		throw new Error("jln.js was not found. You must embed it before all other modules!");
	}

})();
