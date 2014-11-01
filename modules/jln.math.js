/* global jln */
(function(){
	"use strict";


	var math;
	math = {	
		/**
		* Object math
		*
		* @lastModified: 18.10.2014
		* @module: jln.math
		*/
		physicalConstant: {
			/**
			* Object math.physicalConstant
			*
			* @lastModified: 18.10.2014
			* @description: some physical constants
			*/
			c: 299792458, /** @description: speed of light in vaccuum [m/s] */
			m0: 4 * Math.PI * 10e-7, /** @description: magnetic constant [N/A^2] */
			e0: 8.854187817e-12, /** @description: electric constant [A/V] */
			G: 6.67384e-11, /** @description: gravitation constant [m^3/(kg*s^2)] */
			q: 1.602176565e-19, /** @description: elementary electric charge [C] */
			mE: 9.10938215e-31, /** @description: mass of an electron [kg] */
			mP: 1.672621777e-27, /** @description: mass of a proton [kg] */
			mN: 1.674927351e-27, /** @description: mass of a neutron [kg] */
			phi: 1.618033988749895 /** @description: golden ratio [no unit] */
		}
	};




	if(typeof jln === "object"){
		jln.math = math;
	}
	else{
		throw new Error("jln.js was not found. You must embed it before all other modules!");
	}
	
})();
