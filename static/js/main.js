$(document).ready(function (){
   // this triggers the connection event in our server!
   var socket = io.connect();
   var results = $('#results');

   results.html('')

   // send
   $('#add').submit(function(e){
      e.preventDefault();
      socket.emit('button_clicked');
   });
   $('#reset_count').submit(function(e){
      e.preventDefault();
      socket.emit('reset_count');
   });
   // receive
   socket.on('server_update',function(data){
      console.log('Server says: ' + data.count);
      results.html(JSON.stringify(data.count));
   })

})
