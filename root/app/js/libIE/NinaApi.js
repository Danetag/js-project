// Nina API
var NinaAPI = function NinaAPI(appId) {
	var self = this;

	// Add indexOf to Array
	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj, start) {
			for (var i = (start || 0), j = this.length; i < j; i++) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		}
	}

	// Data
	this.API = 'NinaApi';
	this.events = [];
	this.appId = appId;
	this.callbacks = [];

	// Get Message
	// Create IE + others compatible event handler
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

	// Events
	this.events = [];

	// Listen to message from child window
	this.eventCallback = function(e) {
		self.get(e.data);
	};

	eventer(messageEvent, this.eventCallback, false);
};

// Events name
NinaAPI.EVENTS = {
	CALLBACK: 'callback'
};

/**
 * Add event listener
 * @param {string} event Event name
 * @param {function} callback Callback function
 */
NinaAPI.prototype.on = function(event, callback) {
	if(!event || !callback) {
		throw "event or callback is undefined";
	}

	var eventList = this.events[event];
	// First callback for this event
	if(!eventList) {
		eventList = this.events[event] = [];
	}
	// Add the callback for this event
	if(eventList.indexOf(callback) < 0) {
		eventList.push(callback);
	}
	return this;
};

/**
 * Remove event listener
 * @param {string} event Event name
 * @param {function} callback Callback function
 */
NinaAPI.prototype.off = function(event, callback) {
	if(!event) {
		throw "event is undefined";
	}

	var eventList = this.events[event];
	// No callback for this event
	if(!eventList) {
		return this;
	}
	// No callback, remove all callbacks
	if(!callback) {
		delete this.events[event];
	}
	// Remove the callback for this event
	if(eventList.indexOf(callback) > -1) {
		this.events[event].splice(eventList.indexOf(callback));

		// Event array is empty
		if(this.events[event].length < 1) {
			delete this.events[event];
		}
	}
	return this;
};

/**
 * Get a postmessage
 * @param {string} json Json data
 */
NinaAPI.prototype.get = function(json) {
	var data = this.decode(json);

	// No valid data
	if(!data) {
		return this;
	}

	var	event = data.event,
		events = this.events;

	// Api message
	if(data.api && data.api == this.API) {
		// Callback
		if(event == NinaAPI.EVENTS.CALLBACK) {
			this.callbacks[data.id].call(window, data.data, data);
			delete this.callbacks[data.id];
		}
		// Event
		else {
			// Search event
			for(var id in events) {
				if(id == event) {
					this.call(events[id], data);
					break;
				}
			}
		}
	}
};

/**
 * Call callbacks for an event
 * @param {array} Array of callbacks
 * @param {object} data Callback argument object
 */
NinaAPI.prototype.call = function(events, data) {
	for(var i = 0, l = events.length; i < l; i++) {
		events[i].call(window, data);
	}
};

/**
 * Send data to Ninaricci.com or iframe
 * @param {string} event Event name
 * @param {object||undefined} data Data event
 * @param {function||number||undefined} Callback function or callback id
 * @param {HTMLObject||array||undefined} iframe Iframe or Iframe list
 */
NinaAPI.prototype.send = function(event, data, callback, iframe) {
	if(!event) {
		throw "event is undefined";
	}

	var json = this.encode(event, data, callback);

	// Client
	if(this.appId) {
		window.parent.postMessage(json, "*");
	}
	// Server
	else {
		// Auto select
		if(!iframe) {
			iframe = $('iframe');
		}

		// Array
		if(iframe.length) {
			for(var i = 0, l = iframe.length; i < l; i++) {
				iframe[i].contentWindow.postMessage(json, "*");
			}
		}
		// Iframe
		else {
			iframe.contentWindow.postMessage(json, "*");
		}
	}

	return this;
};

/**
 * Call a callback function
 * @param {number} id Callback id
 * @param {data||undefined} data Callback data
 * @param {iframe||undefined} iframe Iframe target
 */
NinaAPI.prototype.callback = function(id, data, iframe) {
	if(!id) {
		throw "callback id is undefined";
	}
	this.send(NinaAPI.EVENTS.CALLBACK, data, id, iframe);
};

/**
 * Encode send event to string
 * @param {string} event Event name
 * @param {object} data Event data
 * @param {function||number||undefined} callback Callback function or callback Id
 * @return {string}
 */
NinaAPI.prototype.encode = function(event, data, callback) {
	data = data || "";

	var json = {
		"api": this.API,
		"event": event,
		"data": encodeURIComponent(JSON.stringify(data))
	};

	// Callback id
	if(callback && typeof callback === 'number' && callback % 1 == 0) {
		json.id = callback;
	}
	// New callback
	else if(callback) {
		json.id = Date.now();
		this.callbacks[json.id] = callback;
	}

	if(this.appId) {
		json.appId = this.appId;
	}

	return  JSON.stringify(json);
};

/**
 * Decode event to object
 * @param {string} json Json data
 * @return {object}
 */
NinaAPI.prototype.decode = function(json) {
	var self = this,
		data;
	try {
		data = JSON.parse(json);
		// Data
		if(data.data) {
			data.data = JSON.parse(decodeURIComponent(data.data));
		}
		// Callback
		if(data.id) {
			data.callback = function(arg) {
				var iframe = data.appId?self.getIframe(data.appId):null;
				self.callback(data.id, arg, iframe);
			};
		}
	}
	catch(error) {
		data = null;
	}
	
	return data;
};

/**
 * Get iframe by appId
 * @param {string} appId The application Id
 * @return {HTMLObject}
 */
NinaAPI.prototype.getIframe = function(appId) {
	var iframe = $('iframe[data-appId="'+appId+'"]')
	return iframe.size() > 0?iframe.get(0):null;
};

/**
 * Dealloc NinaAPI
 */
NinaAPI.prototype.dispose = function() {
	// Create IE + others compatible event handler
	var eventMethod = window.addEventListener ? "removeEventListener" : "detachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "detachEvent" ? "onmessage" : "message";

	// Events
	this.events = null;
	this.callbacks = null;

	// Remove Event
	eventer(messageEvent, this.eventCallback);

	delete this.events;
};