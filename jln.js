(function(window){
	"use strict";
	/**
	* jln (core)
	* a simple modular framework for JavaScript
	*
	* @author: j-l-n <https://github.com/j-l-n>
	* @lastModified: 20.10.2014
	*/


	if(document.all && !document.querySelector){ //IE 7 or older
		throw new Error("You are using a not supported version of Internet Explorer. Lowest supported version: IE 8");
	}

	if(document.all && !window.atob){ //IE 9 or older: show update banner
		var div, banner, close;
		div = document.createElement("div");
		div.style.clear = "both";
		div.style.height = "112px";
		div.style.margin = "0px";
		div.style.position = "fixed";
		div.style.right = "0px";
		div.style.top = "0px";
		div.style.cursor = "pointer";
		banner = document.createElement("img");
		banner.src = "http://www.theie9countdown.com/assets/badge_iecountdown.png";
		banner.src = "de.jpg";
		banner.height = 112;
		banner.width = 348;
		banner.border = 0;
		banner.title = "learn more";
		banner.onclick = function(){
			window.location.href ="http://www.theie9countdown.com/ie-users-info";
		};
		div.appendChild(banner);
		close = document.createElement("a");
		close.style.fontFamily = "sans-serif";
		close.style.fontSize = "12px";
		close.style.fontWeight = "bold";
		close.style.marginTop = "112px";
		close.style.padding = "0px";
		close.style.position = "fixed";
		close.style.right = "0px";
		close.innerText = "close";
		close.title = "click here to close banner";
		close.onclick = function(){
			div.parentNode.removeChild(div);
		};
		div.appendChild(close);
		document.getElementsByTagName("body")[0].appendChild(div);
		ready(function(){
			document.body.appendChild(div);
		});
	}


	var require;
	require = function require(modules, callback){
		/**
		* Function require
		* 
		* @lastModified: 20.10.2014
		* @module: window.require
		* @description: check if a module is embedded and if not, load it via a synchronous XMLHttpRequest
		* @param: modules {Array} array of required modules; by passing the URL of the relevant file, You can also load other modules such as jQuery this way
		* @param: callback {Function} [optional] function to call when all modules are ready; if specified it will load required modules asynchronously instead of synchronously
		*/
    		var fireCallback;
    		fireCallback = function fireCallback(modulesTotal, module, moduleUrl, script){
			console.log("Loaded module „" + module + "“ from " + moduleUrl + ".", script);
			loadedModules++;
			if(loadedModules === modulesTotal){
				console.info("All modules loaded. Executing callback function.");
				callback();
			}
		};
		var module, isjlnModule;
		isjlnModule = /^jln\.(.+)$/i;
		for(var i = 0; i < modules.length; i++){
			module = modules[i];
			if(typeof jln[module.substr(4, module.length)] !== "undefined"){ //remove leading "jln."
				console.log("Module " + module + " is ready.");
			}
			else{
				var moduleUrl, xhr, script;
				if(isjlnModule.exec(module) !== null){
					if(callback){
						moduleUrl = "https://raw.githubusercontent.com/j-l-n/jln.js/master/modules/" + module + ".js";
					}
					else{
						moduleUrl = "https://rawgit.com/j-l-n/jln.js/master/modules/" + module + ".js"; //use CORS proxy for loading module via AJAX
					}
				}
				else{ //external scripts
					moduleUrl = module;
				}
				if(callback){
					var loadedModules;
					loadedModules = 0;
					if(typeof callback !== "function"){
						throw new Error("Callback is not a function.");
					}
					script = document.createElement("script");
					script.type = "text/javascript";
					script.onload = (function(modulesTotal, module, moduleUrl,script){
						return function(){
							fireCallback(modulesTotal, module, moduleUrl, script);
						};
					})(modules.length, module, moduleUrl, script);
					script.onreadystatechange = (function(modulesTotal, module, moduleUrl, script){
						return function(){
							if(script.readyState === "complete"){
								fireCallback(modulesTotal, module, moduleUrl, script);
							}
						};
					})(modules.length, module, moduleUrl, script);
					script.src = "modules/jln.string.js"; //moduleUrl;
					document.getElementsByTagName("head")[0].appendChild(script);
				}
				else{
					xhr = new XMLHttpRequest();
					xhr.open("GET", moduleUrl, false);
					xhr.send(null);
					script = document.createElement("script");
					script.type = "text/javascript";
					script.text = xhr.responseText;
					document.getElementsByTagName("head")[0].appendChild(script);
					if(xhr.readyState === 4 && xhr.status === 4){
						console.log("Loaded module „" + module + "“ from " + moduleUrl + ".", script);
					}
					else{
						throw new Error("Can't load module „" + module + "“ from " + moduleUrl + ". Status code: " + xhr.status);
					}
				}
			}
			
		}
	};
	window.require = require;


	var ready;
	ready = function ready(callback){
		/**
		* Function ready
		* 
		* @lastModified: 20.10.2014
		* @module: window.ready
		* @description: fires when DOM is ready and browser has finished parsing
		* @param: callback {Function} function to call when DOM is loaded
		*/
		var isReady = function isReady(alreadyLoaded){
			if(alreadyLoaded){
				callback();
			}
			else{
				if(document.addEventListener){
					document.removeEventListener("DOMContentLoaded", isReady);
				}
				else if(document.attachEvent){
					document.detachEvent("onload", isReady);
				}
				callback();
			}			
		};
		if(typeof callback !== "function"){
			throw new Error("Callback is not a function.");
		}
		if(document.readyState === "complete" || document.readyState === "interactive"){ //if parsing of document is already finished
			isReady(true);
		}
		else{
			if(document.addEventListener){
				document.addEventListener("DOMContentLoaded", isReady);
			}
			else if(document.attachEvent){
				window.attachEvent("onload", isReady);
			}
		}
	};
	window.ready = ready;

	ready(function(){
		console.info("DOM is ready.");
	});




	if(typeof window.jln === "undefined"){
		var jln;
		jln = {};
		window.jln = jln;
	}

})(window);
