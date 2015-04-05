/*
 This script goes through your Gmail Inbox and searches your emails with the query provided 
 (large emails with attachments). It extracts attachments from the found messages, and saves them 
 to a Google drive folder.
*/

// change these as needed
var lastRan = "2015/04/05";
var query = "size:1m has:attachment before:" + lastRan;
var folderId = "0B9obPdQcHruIfndLM19tMmJJTXR4RldLY3BfcjY0bUh2UDNUVXd1eDhLUzJKN2UyVGZrYzQ";

function mainAttachments() {
  var threads = getThreads();
  var messages = getMessages(threads);
  var attachments = downloadAttachments(messages);
  saveCopies(attachments);
}

  function getThreads(){
   return GmailApp.search(query); 
  }

  function getMessages(threads){
    var len = threads.length;
    var messages = [];
  
    for (var i = 0; i < len; i++) {
      var curMessages = threads[i].getMessages();
      messages = messages.concat(curMessages);
    }
    
    return messages;
  }

  function downloadAttachments(messages) {
    var len = messages.length;
    var attachments = [];
    
    for (var i = 0; i < len; i++) {
      var curAttachments = messages[i].getAttachments();
      attachments = attachments.concat(curAttachments);
    }
    
    return attachments;
  }

  function saveCopies(attachments) {
    var len = attachments.length;
    var folder = DriveApp.getFolderById(folderId);
    
    for (var i = 0; i < len; i++){
      var file = folder.createFile(attachments[i]);
      var name = file.getName();
      Logger.log('added ' + name + ' to attachments folder');
    }
  }
