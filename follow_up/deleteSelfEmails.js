/*
 This script deletes the last message of each thread under the given label.
*/

// Edit these as needed
var label = 'Test';

function mainDelete() {
  var threads = getEmailsWithLabel();
  deleteSelfDups(threads);
}

function getEmailsWithLabel() {
  return GmailApp.getUserLabelByName(label).getThreads();
}
  
function deleteLastMessage(threads) {
  var len = threads.length;
  
  for (var i = 0; i < len; i++) {
    var thread = threads[i];
    var lastMsg = getLastMessage(thread);
    lastMsg.moveToTrash();
    
    var subject = thread.getFirstMessageSubject();
    Logger.log('Deleted last message of thread ' + subject);
  }
}

function getLastMessage(thread) {
  var messages = thread.getMessages();
  var msgLen = messages.length;
  return messages[msgLen - 1];
}