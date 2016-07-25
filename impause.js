// created by ryan goree (ryan@ryangoree.com)
document.addEventListener('impress:init', function(event) {
	
	var empty = function() { return false; };
	var api = event.detail.api;
	
	// Disables keyboard navigation
	//
	// New functions can be assigned to the next and previous keys while paused
	//
	// EXAMPLE: just disable navigation
	//     impress().pause();
	//
	// EXAMPLE 2: add new function to next or previous keys
	//     impress().pause().prev(function);
	//     impress().pause().next(function);
	var pause = function() {
		this.paused = true;
		this.pause.prev = empty;
		this.pause.next = empty;
		return {
			prev: function(newFunction) {
				api.pause.prev = newFunction;
			},
			next: function(newFunction) {
				api.pause.next = newFunction;
			}
		};
	};
	
	// Resumes normal keyboard navigation
	var resume = function() {
		this.paused = false;
	};
	
	// Adds the pause and resume functions to the API as well as a paused
	// property to check if the presentation has been paused.
	api.pause = pause;
	api.paused = false;
	api.resume = resume;
	
	// Replaces prev API function with one that checksif the presentation is
	// paused. If it is, it will run the pause prev function instead.
	var originalPrev = api.prev;
	api.prev = function() {
		if (api.paused) {
			api.pause.prev();
		} else {
			originalPrev();
		}
	};
	
	// Same as above but for the next API function
	var originalNext = api.next;
	api.next = function() {
		if (api.paused) {
			api.pause.next();
		} else {
			originalNext();
		}
	};
}, false);
