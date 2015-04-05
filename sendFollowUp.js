/*
 This script goes through your Gmail Inbox and finds all emails with the label
 you provide ('Follow up' in this case).  It then populates a template (found at
 http://goo.gl/7WmshX) and replies to the thread with the populated template.
*/

// To edit the template: 

// Change these as needed
var label = 'Test';
// var label = 'Biz/Follow up';
var templateId = '1hNM55kRUUI-HpLnJcWB002lOlOVt_5v4BPzu7PZyse4';

function mainFireReply() {
  var the_threads = getEmailsWithLabel();
  fireFollowUp(the_threads);
}

  function getEmailsWithLabel() {
    return GmailApp.getUserLabelByName(label).getThreads();
  }
  
  function fireFollowUp(threads) {
    var len = threads.length;
    for (var i = 0; i < len; i++) {
      var response = populateMessageBody();
      threads[i].reply(null, { htmlBody: response });
      Logger.log('replied to thread ' + (i+1));
    }
  }
        
    function populateMessageBody() {
      var messageFile = DocumentApp.openById(templateId);
      return messageFile.getBody().getText();
    }