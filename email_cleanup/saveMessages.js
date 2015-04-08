/*
 This script goes through your Gmail Inbox and searches your emails with the query provided 
 (large emails with attachments). While another script downloads attachments, this one 
 saves the text body of the last message in a thread to a Google Drive folder.
*/

// edit these as needed
var lastRan = "2015/03/03";
var msg_query = "size:1m has:attachment before:" + lastRan;
var folderId = "--insert your folder id (presumably named messages) here--";

function main() {
  getBodiesOfMessages();
}

function getBodiesOfMessages() {
  var threads = GmailApp.search(msg_query);
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

  var file = folder.createFile(name, content, MimeType.RTF);
  // store message date as file description for easy organizing
  file.setDescription(message.getDate()); 
  Logger.log('added ' + name + ' to messages folder');
}