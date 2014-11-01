/* global jln */
(function(){
	"use strict";


	var string;
	string = {
		/**
		* Object string
		* 
		* @lastModified: 18.10.2014
		* @module: jln.string
		*/
		strPos: function strPos(haystack, needle, offset, occurence){
			/**
			* Function string.strPos
			*
			* @lastModified: 18.10.2014
			* @description: return nth occurence of needle in haystack, starting from offset
			* @param: haystack {String} string to be searched through for needle
			* @param: needle {String} string to be searched for in haystack
			* @param: offset {Number} [optional, default: 0] start search from specified position (if negative relative to the end of the string)
			* @param: occurence {Number} [optional, default: 1] find the umpteenth math
			* @return: {Number} returns the position of needle relative to the beginning of haystack; returns false if not found
			*/
			var strpos, offsetDifference;
			if(typeof offset === "number" && ((offset !== offset) !== true)){
				if(offset < 0){
					offsetDifference = haystack.length + offset;
				}
				else{
					offsetDifference = offset;
				}
				haystack = haystack.substr(offset, haystack.length);
			}
			else{
				offsetDifference = 0;
			}
			if(typeof occurence !== "number" || occurence < 2){
				occurence = 1;
			}
			strpos = haystack.split(needle, occurence).join(needle).length + offsetDifference;
			if(strpos === haystack.length + offsetDifference){
				strpos = false;
			}
			return strpos;
		},
		getIndicesOf: function getIndicesOf(haystack, needle, caseSensitive){
			/**
			* Function string.getIndicesOf
			*
			* @lastModified: 13.10.2014
			* @description: search in haystack for matches of needle
			* @param: haystack {String} string to be searched through for needle
			* @param: needle {String} string to be searched for in haystack
			* @param: caseSensitive {Boolean} [optional, default: false] if the search should be case-sensitive
			* @return: {Array} returns an array with the position of each match of needle relative to the beginning of haystack; returns false if not found
			*/
			var indices, startPos, strPos;
			if(caseSensitive !== true) {
				haystack = haystack.toLowerCase();
				needle = needle.toLowerCase();
			}
			for(indices = [], startPos = 0, strPos = haystack.indexOf(needle, startPos); strPos > -1; strPos = haystack.indexOf(needle, startPos)){
				indices.push(strPos);
				startPos = needle.length + strPos;
			}
   			if(indices.length === 0){
				indices = false;
			}
			return indices;
		}
	};




	if(typeof jln === "object"){
		jln.string = string;
	}
	else{
		throw new Error("jln.js was not found. You must embed it before all other modules!");
	}
	
})();
