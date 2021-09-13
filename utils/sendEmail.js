const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const mailersend = new MailerSend({
  api_key: process.env.apiKey,
});
module.exports.sendEmail = async (id,portal,email,name,yourRole,res) => {
  try{
    const recipients = [new Recipient(email,name )];

    const variables = [
      {
        email: email,
        substitutions: [
          {
            var: 'id',
            value: id
          },
          {
            var: 'Role',
            value: yourRole
          },
          {
            var: 'name',
            value: name
          },
          {
            var: 'portalLink',
            value: portal
          },
          {
            var: 'support_email',
            value: 'info@trainings.techloset.com'
          }
        ],
      }
    ];
    
    const emailParams = new EmailParams()
        .setFrom("info@trainings.techloset.com")
        .setFromName("trainings.techloset")
        .setRecipients(recipients)
        .setSubject("Job information")
        .setTemplateId('pr9084zx7xlw63dn')
        .setVariables(variables);    
        // await mailersend.send(emailParams);
  }
  catch(error){
    res.status(400).json({status:"error", message:{error}, statusCode: 400})
    return
  }
};
