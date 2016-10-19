function addMoodyLabels() {

  // sentiment labels
  var goodLabel = GmailApp.getUserLabelByName("HAPPY");
  var hateLabel = GmailApp.getUserLabelByName("HATER");

  // process all threads in the Inbox
  var threads = GmailApp.getInboxThreads();
  
  for (var i = 0; i < threads.length; i++) {
    // get all messages in a given thread
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var body = message.getRawContent();

      threads[i].removeLabel(goodLabel);
      threads[i].removeLabel(hateLabel);

      try {
        var text = message.getPlainBody();
        sentiment = analyze(text);
      } catch(e) {
        sentiment = '';
        Logger.log("ERROR:"+e);
      }      
      if (sentiment == 'positive') {
        threads[i].addLabel(goodLabel);
      };       
      if (sentiment == 'negative') {
        threads[i].addLabel(hateLabel);
      }; 
      Logger.log(message.getSubject() + " " + sentiment);
    }
  }
}

function analyze(phrase) {
  var projectNumber = '414649711441';
  var hostedModelName = 'sample.sentiment';

  var prediction = Prediction.Hostedmodels.predict(
      {
        input: {
          csvInstance: [phrase]
        }
      },
      projectNumber,
      hostedModelName);

  // Logs Sentiment: positive/negative.
  Logger.log('Sentiment: ' + prediction.outputLabel);
  return prediction.outputLabel
}

