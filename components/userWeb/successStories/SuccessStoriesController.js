var SuccessStories = require("./SuccessStoriesModel");
//Function to add SuccessStories
module.exports.addSuccessStories = async (req, res) => {
  const { name, userName, email,description } = req.body;
  const filename = req.file?.filename;
  if (!name || !userName || !email || !description) {
    res.status(400).send("All params are required");
  }
  const newSuccessStories = new SuccessStories({
    name, userName, email,description, 
    successStoryImage: filename,
    status:"pending"
  });
  newSuccessStories.save((err, success) => {
    if (err) {
      res.status(501).send("error happen");
    }
    res.status(200).send("SuccessStories Added Successfully");
  });
};

//getSuccessStories
module.exports.getSuccessStories = async (req, res) => {
  const getSuccessStories = await SuccessStories.find({});
  res.status(200).json(getSuccessStories);
};

//approve
module.exports.approve = async (req, res) => {
  console.log("check",req.body);
  const { id } = req.body;
  if (!id) {
    res.status(400).send("All params are required");
  }
  const Story = await SuccessStories.findByIdAndUpdate(id, {
    status: "Approve",
  }, { new: true }
  )
  if (!Story) {
    res.status(400).send("Your id is incorrect");
  }
  Story.save((err, data) => {
    if (err) {
      res.status(501).send("error happen");
    }
    res.status(200).send("Story Approve Successfully");
  });
};
//reject
module.exports.reject = async (req, res) => {
  const { id,whyReject } = req.body;
  if (!id || !whyReject) {
    res.status(400).send("All params are required");
  }
    const Story = await SuccessStories.findByIdAndUpdate(id, {
    status: "reject",
    whyReject,
  }, { new: true }
  )
  if (!Story) {
    res.status(400).send("Your id is incorrect");
  }
  Story.save((err, data) => {
    if (err) {
      res.status(501).send("error happen");
    }
    res.status(200).send("Story rejected Successfully");
  });
};
