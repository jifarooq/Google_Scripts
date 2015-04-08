/*
 This script renames images and can also add customized descriptions.
*/

// edit these as needed
var folderId = 'insert your folder id here (take from url)'
var nameMatcher = "IMG_";
var newNameStart = "that_one_time";

function main() {
  renameImages();
}

function renameImages() {
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var idx = 1;
  
  while (files.hasNext()) {
    var curFile = files.next();
    var fileName = curFile.getName();
    
    if (fileName.match(nameMatcher)) {
      _renameImage(curFile, fileName, idx);
      idx++;
    }
  }
}

function _renameImage(curFile, oldName, idx) {
  var newName = newNameStart + idx;  
  Logger.log("Renaming " + oldName + " to " + newName);
  curFile.setName(newName);
  //var descr = "insert your custom description here";
  curFile.setDescription(oldName);
}