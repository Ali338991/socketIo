const client = require("twilio");

exports.sendMessage = async (num,message) => {
  try {
    let querySnapshot = await admin
      .firestore()
      .collection("api")
      .where("type", "==", "twilio")
      .get();

    querySnapshot.forEach((doc) => {
      client(doc.data().accountSid, doc.data().authToken).messages.create({
        body: message,
        from: number,
        to: num,
      });
    });
  } catch (err) {
    return err;
  }
};



