const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const mailersend = new MailerSend({
  api_key: process.env.apiKey,
});
module.exports.sendEmail = async (email) => {
  try{
    const recipients = [
      new Recipient("your@domain.com", "Your Client")
    ];
  
    const emailParams = new EmailParams()
      .setFrom("your@domain.com")
      .setFromName("domain")
      .setRecipients(recipients)
      .setSubject("Subject")
      .setHtml("This is the HTML content")
      .setText("This is the text content");
    await mailersend.send(emailParams);
    console.log(email);
  }
  catch(error){
    console.log(error.message);
  }
};
