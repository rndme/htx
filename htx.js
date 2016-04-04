// htx.js, by dandavis [CCBY4]
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory({});
	} else {
		root.htx = factory(root);
  }
}(this, function (pub) {

function htx(dir, root) {
  
  	function update(elm, val) {
		if (typeof val === "object") {
			Object.keys(val).forEach(function(prop) {
			  	var value=val[prop], append=false;
			  	if(prop.slice(-1)=="+"){
					append=true;
				  	prop=prop.slice(0,-1);
				}
			  
			    if(prop.slice(0,1)=="@"){
				  	value = typeof value === "function" ? 
					  		value.call(elm) : 
					  		value;
				  	if(value===false) return elm.removeAttribute(prop.slice(1));
				  	if(value===true) value="";
				  	return elm.setAttribute(
					  	prop.slice(1), 
					  	append ? (elm.getAttribute(prop.slice(1))+value) : value
					);
				}
			  
				if (typeof elm[prop] === "function") {
					if (htx.uNd3f1n2d == value) {
						elm[prop]();
					} else {
						elm[prop].apply(elm, Array.isArray(value) ? value : value );
					}//end if no value?
				}//end if method?
			  
			  	var r=String(prop).split(".");
			  	
			  	if(prop.slice(0,2)!="on" && typeof value==="function") value = value.call(elm);
				  
			  	if(r.length>1){
				  	if(append){
						elm[r[0]][r[1]]+= value; 
					}else{
						elm[r[0]][r[1]] = value; 
					}
				}else{
				  	if(append){
						elm[prop]+= value;
					}else{
						elm[prop] = value;
					}
				}
			});
		} else { // not object, set content:
			elm.innerHTML = val;
		}//end if object?
	} //end update();
  
  	if(!Array.isArray(dir)) dir=[dir];
  
	dir.forEach(function(dir){
		Object.keys(dir).sort().forEach(function(selector) {
			[].slice.call(root.querySelectorAll(selector)).forEach(function(elm, index) {
				var val = typeof dir[selector]==="function" ?
						dir[selector](elm, index) :
						dir[selector] ;
			  
				if (Array.isArray(val)) {
					val.forEach(function(v) {
						update(elm.parentNode.appendChild(elm.cloneNode(true)), v);
					});
					elm.remove();
				} else {
					update(elm, val);
				}//end if array?
			}); //end elm forEach()
		}); //end selector forEach()
	});//end dir outer forEach
  
}//end htx()

return pub.htx = htx;

}));
