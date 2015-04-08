/*
 This script organizes a google drive folder containing image files or PDFs and moves them into a subfolder.
 Currently only handles a handful of file extensions (jpeg, png, pdf), but this can easily be broadened to more
 extensions.
*/

// edit these as needed
var fromOlderId = "insert your parent folder id here (take from url)";
var imagesFolderId = "insert your child folder id for images here";
var pdfFolderId = "insert your child folder id for PDFs here";

var EXTENSIONMAP = {
  'jpg': imagesFolderId,
  'jpeg': imagesFolderId,
  'png': imagesFolderId,
  'pdf': pdfFolderId
}

function main() {
  cleanUp();
}

function cleanUp() {
  var fromFolder = DriveApp.getFolderById(fromOlderId);
  var files = fromFolder.getFiles();
  
  while (files.hasNext()) {
    var curFile = files.next();
    moveFile(curFile, fromFolder);
    Logger.log("Moved file " + curFile.getName());
  }
}

function moveFile(file, fromFolder) {
  var extension = _getExtension(file);
  var toFolderId = EXTENSIONMAP[extension];
  
  if (toFolderId) {
    var toFolder = DriveApp.getFolderById(toFolderId);
    toFolder.addFile(file);
    fromFolder.removeFile(file);
  }
}

function _getExtension(file) {
  return file.getName().split('.').pop().toLowerCase();
}