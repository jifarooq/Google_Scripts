/*
 This script goes through your Gmail Inbox and finds all emails with the label
 you provide ('Test' in this case).  It then populates an html template 
 and replies to the thread with the populated template.
*/

// edit these as needed
var label = 'Test';
var templateId = 'insert google doc file template id';

function mainFireReply() {
  var threads = getEmailsWithLabel();
  fireFollowUp(threads);
}

function getEmailsWithLabel() {
  return GmailApp.getUserLabelByName(label).getThreads();
}

function fireFollowUp(threads) {
  var len = threads.length;
  for (var i = 0; i < len; i++) {
    var response = populateMessageBody();
    threads[i].replyAll(null, { name: "Your name", htmlBody: response });
    Logger.log('replied to thread ' + (i+1));
  }
}

function populateMessageBody() {
  var messageFile = DocumentApp.openById(templateId);
  return messageFile.getBody().getText();
}