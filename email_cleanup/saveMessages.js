/*
 This script goes through your Gmail Inbox and searches your emails with the query provided 
 (large emails with attachments). While another script downloads attachments, this one simply 
 saves the text body of email messages to a Google Drive folder.
*/

// change these as needed
var lastRan = "2015/04/01";
var query = "size:1m has:attachment before:" + lastRan;
var folderId = "0B9obPdQcHruIflpjN0FKMUpsRGxiclNaSnZnX2kxc1RCSWJDN3FWS2VCM2VXeXhQSGUwM0U";

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
    var lastMessage = curMessages[msgLen - 1];
    saveCopy(lastMessage);
  }
}

function saveCopy(message) {
  var folder = DriveApp.getFolderById(folderId);
  var name = message.getSubject();
  var content = message.getPlainBody();

  folder.createFile(name, content, MimeType.RTF);
  Logger.log('added ' + name + ' to messages folder');
}
