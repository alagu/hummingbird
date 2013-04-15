Opensource Olark
================

Tried building my own version of Olark. Jabber, nodejs, socket.io and python helped me. 


This is actually a proof of concept. This can add popup on any window and admins can chat using Jabber clients (adium, etc).
It doesn't have any auth mechanism built it, but it can be added easily using the auth.py file.

Installation
=============

Requirements
------------
Works in Ubuntu 11.04+


Install eJabberd
----------------

```
  sudo apt-get install ejabberd
  git clone git://github.com/alagu/opensource-olark.git
  cd opensource-olark
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
 {acl, admin, {user, "alagu", "localhost"}}

 {auth_method, external}.
 {extauth_program, "/etc/ejabberd/auth.py"}.
 {extauth_cache, 600}.
 {extauth_instances, 5}.
```

Also add hosts.
```
{hosts, ["localhost", "chat.alagu.net"]}
```

(Save)

Create admin user:

```
  sudo ejabberdctl register alagu localhost mypassword
```

Create SRV Record
------------------
This is bit tricky. You have to configure your DNS to add SRV records. (Example http://library.linode.com/communications/xmpp/ejabberd/ubuntu-8.04-hardy#sph_xmpp-jabber-basics)

Try logging into the jabber server. Use pidgin/adium. 

Any username(Say joe@localhost), any password should connect to your machine.


Test Jabber Installation
-------------------------
```
  apt-get install sendxmpp
  echo "someguy@localhost uselesspassword" > ~/.sendxmpprc
  chmod 600 ~/.sendxmpprc 
  echo "Testing goyaka chat" | sendxmpp alagu@chat.goyaka.com
```

Install Nodejs
--------------
Nodejs connects to jabber and creates a nodejs jabber server, to be connected to browsers using socket.io.


  Install Node JS - https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager (latest version 0.6.2 as of now)

```
  sudo apt-get install python-software-properties
  sudo add-apt-repository ppa:chris-lea/node.js
  sudo apt-get update
  sudo apt-get install nodejs
```

Install NPM
------------

```
  sudo -s; curl http://npmjs.org/install.sh | sh
 
  npm install node-xmpp # For talking to jabber
  npm install socket.io # For talking to browser
  npm install geoip-lite # For querying IP
```
