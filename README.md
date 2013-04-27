Hummingbird
================

Tried building my own version of Olark. Jabber and Strophe.js helped me. (**Previously known as Opensource Olark**)


![Hummingbird](http://farm1.staticflickr.com/199/496387464_0995c6bf93.jpg)

This can add popup on any window and admins can chat using Jabber clients (adium, etc).
It doesn't have any auth mechanism built it, but it can be added easily using the auth.py file.

[**TRY DEMO**](http://alagu.github.io/hummingbird/)
=============

**Warning: There is no ACL added here. But it is easy to add**

Installation
=============

Requirements
------------
Works in Ubuntu 11.04+


Install eJabberd
----------------

```
  sudo apt-get install ejabberd
  git clone git://github.com/alagu/hummingbird.git
  cd hummingbird
  sudo -s
  cp server/setup/auth.py /etc/ejabberd/
```

Edit Ejabberd Config
--------------------

```
  cd /etc/ejabberd
  vim ejabberd.cfg
```

Remove:
```
{auth_method, internal}.
```

Change:

```
 {acl, admin, {user, "alagu", "localhost"}}.

 {auth_method, external}.
 {extauth_program, "/etc/ejabberd/auth.py"}.
 {extauth_cache, 600}.
 {extauth_instances, 5}.
```

Also add hosts.
```
{hosts, ["localhost", "chat.alagu.net"]}
```

Add mod_http_bind module

```
{modules ,
 [
  ...
  {mod_http_bind,  []},
  ...
 ]
}
```

(Save and Quit vim)

Here is a sample ejabberd cfg which works for me: [ejabberd.cfg](https://github.com/alagu/hummingbird/blob/master/server/setup/ejabberd.cfg.sample)

Create admin user in commandline:

```
  sudo ejabberdctl register alagu localhost mypassword
```

Create SRV Record
------------------
This is bit tricky. You have to configure your DNS to add SRV records. (Example http://library.linode.com/communications/xmpp/ejabberd/ubuntu-8.04-hardy#sph_xmpp-jabber-basics)

Try logging into the jabber server. Use pidgin/adium. 

Any username(Say joe@localhost), any password should connect to your machine.

Here is my linode configuration:

![Linode configuration](http://cl.ly/image/3m141k1X3P2r/Screen%20Shot%202013-04-16%20at%208.20.00%20AM.png)

Single item entry:
![Entering an item](http://cl.ly/image/3z3h1g2X0E0B/Screen%20Shot%202013-04-16%20at%208.21.57%20AM.png)

Test Jabber Installation
-------------------------
```
  apt-get install sendxmpp
  echo "someguy@localhost uselesspassword" > ~/.sendxmpprc
  chmod 600 ~/.sendxmpprc 
  echo "Testing goyaka chat" | sendxmpp alagu@chat.goyaka.com
```

Get the chat widget
-------------------

Go to the (client folder)[https://github.com/alagu/hummingbird/tree/master/client].

Edit chat-client.js and configure (in client/static):

```
 var BOSH_SERVICE = 'http://olark.alagu.net:5280/http-bind';
 var JABBER_HOST  = 'olark.alagu.net';
 var ADMIN_USER   = 'alagu@olark.alagu.net';
```

Set them to right variables and build chat.js

```
bash compile.sh
```

This compiles all javascript files to single chat.js. Copy following files to your assets directory.

```
client/
  static/
    chat-0.1.css
    chat.js
```

Now, insert these two lines in your product html.
```
<link rel="stylesheet" type="text/css" href="<yourstaticpath>/chat-0.1.css">
<script src="<yourstaticpath>/chat.js" type="text/javascript"></script>
```

Try the DEMO.


Adium configuration
--------------------

Once this is done, get your admin account logged in Adium. (Note: None of this is ACL protected)
Username should be admin@yourdomain.com and password could be anything.

![Screenshot](http://cl.ly/image/2D1E413t1Q0M/Screen%20Shot%202013-04-16%20at%2011.20.36%20AM.png)


ACL
---

The auth.py defines the acl for each account. You could tie up a sqlite/mysql db which holds the auth mechanism.
