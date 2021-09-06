var sgMail = require("@sendgrid/mail");

exports.sendEmail = async (email, message, subject) => {
  try {
    let querySnapshot = await admin
      .firestore()
      .collection("api")
      .where("type", "==", "sendGrid")
      .get();

    querySnapshot.forEach((doc) => {
      const msg = {
        to: email,
        from: "unohr99@gmail.com",
        subject: subject,
        text: message,
      };
      sgMail.setApiKey(doc.data().apiKey);
      return sgMail.send(msg);
    });
  } catch (err) {
    return err;
  }
};
