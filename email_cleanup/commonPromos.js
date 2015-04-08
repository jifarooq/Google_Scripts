/*
 This script figures out your most popular promotional emails in a sample
 of size (MAX - START) so you can manually unsubscribe from them.
*/

// edit these as needed
var QUERY = 'category:promotions';
var START = 201;
var MAX = 300;

function main() {
  findSpammers();
}

function findSpammers() {
  var threads = GmailApp.search(QUERY, START, MAX);
  var spammerCounts = getSpamCounts(threads);
  var sortedSpammers = sortAsArray(spammerCounts);
  prettyPrint(sortedSpammers);
}

function getSpamCounts(threads) {
  var counts = {};
  
  threads.forEach(function(thread) {
    var message = thread.getMessages()[0];
    var from = message.getFrom();
    counts[from] = (counts[from] || 0) + 1;
  });
                  
  return counts;
}

// not called
function sortAsObject(counts) {
  return Object.keys(counts).sort(function(a, b) {
    return counts[b] - counts[a];
  });
}

function sortAsArray(counts) {
  var sortable = [];
  for (var spammer in counts) {
    sortable.push( [spammer, counts[spammer]] );
  }
     
  return sortable.sort(function(a, b) { 
    return b[1] - a[1];
  });
}

function prettyPrint(list) {
  list.forEach(function(item) {
    Logger.log(item)
  });
}