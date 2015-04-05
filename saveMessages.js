/*
 This script goes through your Gmail Inbox and searches your emails with the query provided 
 (large emails with attachments). While the last downloads attachments, this one simply saves 
 the text body of the emails to a Google Drive folder.
*/

// change these as needed
var lastRan = "2015/04/01";
var query = "size:1m has:attachment before:" + lastRan;
var folderId = "0B9obPdQcHruIflpjN0FKMUpsRGxiclNaSnZnX2kxc1RCSWJDN3FWS2VCM2VXeXhQSGUwM0U";
var cacheDuration = 3600; // 1 hour

function mainBodies() {
  //var messages = getMessages();
  //var emails = getBodies(messages);
  var messages = getUncachedMessages();
  var emails = getUncachedBodies(messages);
  saveCopies(emails);
}

function getMessages() {
  var cache = CacheService.getUserCache();
  var cached = cache.get("messages");
  
  if (cached != null) {
    return cached;
  } else {
    return getUncachedMessages();
  }
}

function getBodies(messages) {
  var cache = CacheService.getUserCache();
  var cached = cache.get("emails");
  
  if (cached != null) {
    return cached;
  } else {
    return getUncachedBodies(messages);
  }
}

function getUncachedMessages() {
  var threads = GmailApp.search(query);
  var threadLen = threads.length;
  var i = threadLen;
  var messages = [];
  
  while (i--) {
    var curMessages = threads[threadLen - i - 1].getMessages();
    var msgLen = curMessages.length;
    var j = msgLen;
    
    while (j--) {
      var curMsg = curMessages[msgLen - j - 1];
      messages.push(curMsg);
    }
  }
  
  _addToCache('messages', messages);
  return messages;
}

function getUncachedBodies(messages) {
  var len = messages.length;
  //var len = 10;
  var i = len;
  var emails = { "bodies": [], "subjects": [] };

  while (i--) {
    var msg = messages[len - i - 1];
    //Logger.log(msg);
    Utilities.sleep(1000); // to get around rateMax
    emails.bodies.push(msg.getPlainBody());
    emails.subjects.push(msg.getSubject());
    /*
    if (isMessage(msg)) {
      Utilities.sleep(1000); // to get around rateMax
      emails.bodies.push(msg.getPlainBody());
      emails.subjects.push(msg.getSubject());
    }*/
  }

  _addToCache('emails', emails);
  return emails;
}

function saveCopies(emails) {
  var folder = DriveApp.getFolderById(folderId);
  var len = emails.subjects.length;
  var i = len;
  
  while (i--) {
    var idx = len - i - 1;
    var content = emails.bodies[idx];
    var subject = emails.subjects[idx]; 
    folder.createFile(subject, content, MimeType.RTF);
    Logger.log('added ' + subject + ' to messages folder');
  }
}

  // 'PRIVATE'
  function _addToCache(key, items) {
    var cache = CacheService.getUserCache();
    cache.remove(key); //flush any garbage
    cache.put(key, items, cacheDuration);
  }
  
  function isMessage(message) {
    return !!message.getSubject
  }
