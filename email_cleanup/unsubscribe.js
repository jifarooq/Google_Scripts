/*
 This script unsubscribes from promotional email.
*/

// edit these as needed. also, be wary of global namespace around other scripts
var promo_query = 'category:promotions';
var start = 75;
var MAX = 10;

function main() {
  unsubscribe();
}

function unsubscribe() {
  var threads = GmailApp.search(promo_query, start, MAX);
  
  threads.forEach(function(thread) {
    var message = thread.getMessages()[0];
    var from = message.getFrom();
    var matchedContent = message.getRawContent()
                                .match(/^List-Unsubscribe: ((.|\r\n\s)+)\r\n/m);
    var value = matchedContent ? matchedContent[1] : null;
    
    if (value) {
      var matchedUrl = value.match(/<(https?:\/\/[^>]+)>/);
      var url = matchedUrl ? matchedUrl[1] : null;

      if (url) {
        var status = UrlFetchApp.fetch(url).getResponseCode();
        Logger.log("Unsubscribe " + status + " for " + from);
      }
    }
  });
}