function migrateInbox() {
  
  // Manage unwanted Outlook labels
  removeOutlookLabels();
  
  var homeLabel = GmailApp.getUserLabelByName("HOME");
  var workLabel = GmailApp.getUserLabelByName("Heidelberg");
    
  // search for threads  
  var threads = GmailApp.search("newer_than:1d");
  //var threads = GmailApp.search("label:Sent");
  
  threads.forEach(function(thread) {
    
    var messages = thread.getMessages();
    
    messages.forEach(function(message) {
      
      var body = message.getRawContent();
      
      // HOME
      if (body.indexOf("X-Gmail-Fetch-Info: hollerith@gmail.com") > -1) {
        // do stuff with message (e.g. trash it)
        thread.addLabel(homeLabel);
        thread.moveToTrash();
        thread.markRead();
      }

      // WORK
      if (body.indexOf("x-google-migrated: true") > -1) {
        // do stuff with message (e.g. add label)
        thread.addLabel(workLabel);
        thread.markRead(); 
      }
      
      Logger.log('Updated %s', message.getSubject());
      
    });
    
  });
}

function removeOutlookLabels() {
  
  Logger.log("Delete migrated labels");
  
  labels = ['_Outbox',
            'Root Folder',
            'News feed',
            'Quick Step Settings',
            'Conversation action settings',
            'Working set',
            'contacts/{06967759-274d-40b2-a3eb-d7f9e73727d7}',
            'Contacts/{a9e2bc46-b3a0-4243-b315-60d991004455}',
            'Contacts/GAL Contacts',
            'Contacts/Recipient cache',
            'Contacts'            
           ]
  
  labels.forEach(function(labelName) {
    var label = GmailApp.getUserLabelByName(labelName);
    if (label) { label.deleteLabel() };
    Logger.log('Deleted %s', labelName);
  });
    
}  
