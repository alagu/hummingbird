$(document).ready(function(){
 $('head').append('<link rel="stylesheet" href="http://chat.goyaka.com/static/chat-0.1.css" type="text/css" />');
 $('body').append('<div id="goyaka-chat"></div>');
 var domContent = [
'<div class="goyaka-menu"><a href="#">Click for live chat</a></div>',
'<div class="goyaka-chatbox">',
'    <div class="goyaka-conversation">',
'    </div>',
'    <div class="goyaka-chat-input">',
'        <input type="text" name="chat_text" id="goyaka-chat-input">',
'    </div>',
'</div>',
].join(''); 
 $('#goyaka-chat').append(domContent);
 
 var toggleChat = function()
 {
     $('.goyaka-chatbox').toggle();
 }
 
 $('#goyaka-chat .goyaka-menu').click(toggleChat);
 $('#goyaka-chat .goyaka-chat-input input').bind('keypress', function(e) {
     var code = (e.keyCode ? e.keyCode : e.which);
     if(code == 13) { //Enter keycode
        var content = $(this).val();
        $(this).val("");
        console.log(content);
     }
 }); 
});
