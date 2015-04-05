/*
 This script goes through your Gmail Inbox and searches your emails with the query provided 
 (large emails with attachments). While another script downloads attachments, this one simply 
 saves the text body of email messages to a Google Drive folder.
*/

// change these as needed
var lastRan = "2015/04/01";
var query = "size:1m has:attachment before:" + lastRan;
var folderId = "0B9obPdQcHruIflpjN0FKMUpsRGxiclNaSnZnX2kxc1RCSWJDN3FWS2VCM2VXeXhQSGUwM0U";
//var cacheDuration = 3600; // 1 hour

function main() {
  getBodiesOfMessages();
}

function getBodiesOfMessages() {
  var threads = GmailApp.search(query);
  var threadLen = threads.length;
  var i = threadLen;
  
  while (i--) {
    var curMessages = threads[threadLen - i - 1].getMessages();
    var msgLen = curMessages.length;
    var j = msgLen;
    
    while (j--) {
      var msg = curMessages[msgLen - j - 1];
      var subject = msg.getSubject();
      var body = msg.getPlainBody();
      saveCopy(subject, body);
    }
  }
}

function saveCopy(name, content) {
  var folder = DriveApp.getFolderById(folderId);
  folder.createFile(name, content, MimeType.RTF);
  Logger.log('added ' + subject + ' to messages folder');
}
