let app = new Vue({
	el: '#chatbox',
	data: {
		socket: null,
		message: '',
		messages: [],
		created: false,
		user: '',
	},
	methods: {
		sendMessage: function(){
			this.socket.emit('message', this.message); // send message
			this.message = '';
			// $(".messenger-container__conversation").animate({scrollTop: $(".messenger-container__conversation").get(0).scrollHeight},1);
		},
		createUser: function(){
			this.socket.emit('join', this.user);
			this.created  = true;
		}
	},
	created: function() {
		// this.socket = io();
		this.socket = io.connect("http://localhost:3000/");
		// var socket = io.connect("https://wedding-planning-chat-app.herokuapp.com/");
		// console.log(this.socket)
	},
	mounted: function() {
		let vm = this;
		this.socket.on('message', function(message){
			// alert()
			vm.messages.push(message);
		});
	}
});