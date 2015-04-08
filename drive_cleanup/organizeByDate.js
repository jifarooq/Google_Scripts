/*
 This script organizes a google drive folder by date, found within the description of the file.
 Meant to be executed after running saveMessageContent.js, a script that moves contents of 
 emails onto Google Drive.
*/

// edit these as needed
var fromFolderId = 'insert your folder id here (take from url)';
var FOLDERMAP = {
  '2015': 'your_folder_id',
  '2014': 'your_folder_id',
  '2013': 'your_folder_id',
  '2012': 'your_folder_id',
  '2011': 'your_folder_id'
}

function main() {
  organizeFilesByDate();
}

function organizeFilesByDate() {
  var fromFolder = DriveApp.getFolderById(fromFolderId);
  var files = fromFolder.getFiles();
  
  while (files.hasNext()) {
    var curFile = files.next();
    moveFile(curFile, fromFolder);
    Logger.log("Moved file " + curFile.getName());
  }
}

function moveFile(file, fromFolder) {
  // description should store message date as string
  var date = new Date(file.getDescription());
  var year = date.getFullYear();
  var toFolderId = FOLDERMAP.hasOwnProperty(year) ? FOLDERMAP[year] : FOLDERMAP['2011'];
  var toFolder = DriveApp.getFolderById(toFolderId);
  
  toFolder.addFile(file);
  fromFolder.removeFile(file);
}