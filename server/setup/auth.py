#!/usr/bin/python

import sys
from struct import *
from time import *
fp = open ('/var/log/ejabberd/external_auth.log','a+')

def log(data):
    time = strftime("%a, %d %b %Y %H:%M:%S +0530", localtime())
    fp.write('[' + time + ']  ' +  data + '\n');

def from_ejabberd():
    log('Reading stdin')
    input_length = sys.stdin.read(2)
    log('Reading input length hex')
    (size,) = unpack('>h', input_length)
    log('Input length = ' + str(size))
    pieces = sys.stdin.read(size).split(':')
    log(str(pieces))
    return pieces

def to_ejabberd(bool):
    answer = 0
    if bool:
        answer = 1
    token = pack('>hh', 2, answer)
    sys.stdout.write(token)
    sys.stdout.flush()

def auth(username, server, password):
    return True

def isuser(username, server):
    return True

def setpass(username, server, password):
    return True

log('Starting auth');
while True:
    log('Initializing')
    data = from_ejabberd()
    success = False
    if data[0] == "auth":
        success = auth(data[1], data[2], data[3])
    elif data[0] == "isuser":
        success = isuser(data[1], data[2])
    elif data[0] == "setpass":
        success = setpass(data[1], data[2], data[3])
    to_ejabberd(success)

fp.close()
