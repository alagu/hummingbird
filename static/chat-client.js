$(document).ready(function(){
 var BOSH_SERVICE = 'http://olark.alagu.net:5280/http-bind';
 var JABBER_HOST  = 'olark.alagu.net';
 var ADMIN_USER   = 'alagu@olark.alagu.net';
 var connection = null;
 var username   = null;

 var add_chatbox = function() {
   $('body').append('<div id="converse-chat"></div>');
   var domContent = [
  '<div class="converse-menu"><a href="#">Click for live chat</a></div>',
  '<div class="converse-chatbox">',
  '    <div class="converse-conversation">',
  '    </div>',
  '    <div class="converse-chat-input">',
  '        <input type="text" name="chat_text" id="converse-chat-input" placeholder="Type here and hit <enter> to chat">',
  '    </div>',
  '<div id="converse-status"></div>',
  '</div>',
  ].join(''); 
   $('#converse-chat').append(domContent);

 }

 var scroll_to_bottom = function(selector){
  div_height = $(selector).height();
  div_offset = $(selector).offset().top;
  window_height = $(window).height();
  $('html,body').animate({
    scrollTop: div_offset-window_height+div_height
  },'slow');
}

 var add_listeners = function() {

   $('#converse-chat .converse-menu').click(toggleChat);
   $('#converse-chat .converse-chat-input input').bind('keypress', function(e) {
       var code = (e.keyCode ? e.keyCode : e.which);
       if(code == 13) { //Enter keycode
          var content = $(this).val();
          $(this).val("");
          send_message(content);
       }
   }); 
 }

 var log = function(msg) {
  $('#converse-status').html(msg);
 }

function on_message(msg) {
  console.log(msg);
  var to = msg.getAttribute('to');
  var from = msg.getAttribute('from');
  var type = msg.getAttribute('type');
  var elems = msg.getElementsByTagName('body');

  if (type == "chat" && elems.length > 0) {
    var body = elems[0];
    append_message(from,  Strophe.getText(body)); 
  }

  return true;
}

function send_message(msg) {
  var message_xml = Strophe.xmlElement('body', {}, msg)
  var reply = $msg({to: ADMIN_USER, from: username, type: 'chat'})
            .cnode(Strophe.copyElement(message_xml));
  append_message('Me',  msg, 'converse-self'); 
  connection.send(reply.tree());
}


 var onConnect = function(status)
 {

   if (status == Strophe.Status.CONNECTING) {
   log('Connecting..');
     } else if (status == Strophe.Status.CONNFAIL) {
   log('Failed to connect.');
   $('#connect').get(0).value = 'connect';
     } else if (status == Strophe.Status.DISCONNECTING) {
   log('Disconnecting.');
     } else if (status == Strophe.Status.DISCONNECTED) {
   log('Disconnected.');
   $('#connect').get(0).value = 'connect';
   } else if (status == Strophe.Status.CONNECTED) {
     log('Connected');
     connection.addHandler(on_message, null, 'message', null, null,  null); 
     connection.send($pres().tree());
   }
 }

 var append_message = function(person, message_content, class_name) {
    class_name = class_name ? class_name : '';
    person = person.split('@')[0];

    var message_dom = [
    '<div class="converse-msg ' + class_name + '">',
    '  <span class="converse-user">' + person + ':</span>&nbsp;&nbsp;<span class="converse-txt">' + message_content + '</span>',
    ' </div>'].join('');

    $('.converse-conversation').append(message_dom);
    scroll_to_bottom('.converse-conversation');
 }

 var connect_xmpp = function() {
  connection = new Strophe.Connection(BOSH_SERVICE);

  /* You can include your app user name here */
  username = 'user' + Math.floor(Math.random() * 100000) + '@' + JABBER_HOST;
  connection.connect( username, 'dummy', onConnect);
 }

 
 var toggleChat = function()
 {
   $('.converse-chatbox').toggle();
 }

 var init = function() {
  connect_xmpp();
  add_chatbox();
  add_listeners();
 }


 /* Initialize */

 init();
 

});
