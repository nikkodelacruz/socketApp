let app = new Vue({
	el: '#app',
	data: {
		socket: null,
		message: ''
	},
	methods: {
		sendMessage: function(){
			this.socket.emit('message', this.message);
			this.message = '';

		}

	},
	created: function() {
		this.socket = io();
		console.log(this.socket)
	}
});