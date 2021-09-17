var SuccessStories = require("./SuccessStoriesModel");
const cloudinary = require('../../../config/Cloudinary');
//Function to add SuccessStories
module.exports.addSuccessStories = async (req, res) => {
  if (!req.body?.name) {
    res.status(400).json({ status: "error", message: "Name required", statusCode: 400 })
    return
  } else if (!req.body?.userName) {
    res.status(400).json({ status: "error", message: "User Name Required", statusCode: 400 })
    return
  } else if (!req.body?.email) {
    res.status(400).json({ status: "error", message: "email Required", statusCode: 400 })
    return
  } else if (!req.body?.description) {
    res.status(400).json({ status: "error", message: "Description Required", statusCode: 400 })
    return
  } else {
    const check = await SuccessStories.findOne({ email: req.body?.email });
    if (check) {
      res.status(400).json({ status: "success", message: "Success Story already exist", statusCode: 400 })
      return
    }
    const { name, userName, email, description } = req.body;
    const filename = await cloudinary.uploader.upload(req.file?.path, { folder: `SuccessStories/${email}/` });
    const newSuccessStories = new SuccessStories({
      name, userName, email, description,
      successStoryImage: filename?.secure_url,
      cloudinaryId: filename?.public_id,
      status: "pending",
      whyReject: ""
    });
    newSuccessStories.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      res.status(201).json({ status: "success", data: success, message: "SuccessStories Added  Successfully", statusCode: 201 })
      return
    });
  }
};

//getSuccessStories
module.exports.getSuccessStories = async (req, res) => {
  try {
    const getSuccessStories = await SuccessStories.find({});
    res.status(202).json({ status: "success", message: "Get list  Successfully", data: getSuccessStories, statusCode: 202 })
    return
  } catch (error) {
    res.status(400).json({ status: "success", message: { error }, statusCode: 400 })
    return
  }
};

//approve
module.exports.approve = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "Id required", statusCode: 400 })
    return
  } else {
    const { id } = req.body;
    const Story = await SuccessStories.findByIdAndUpdate(id, {
      status: "Approve",
    }, { new: true }
    )
    if (!Story) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    Story.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      res.status(201).json({ status: "success", data: success, message: "Story Approve Successfully", statusCode: 201 })
      return
    });
  }
};
//reject
module.exports.reject = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id required", statusCode: 400 })
    return
  } else if (!req.body?.whyReject) {
    res.status(400).json({ status: "error", message: "whyReject message Required", statusCode: 400 })
    return
  } else {
    const { id, whyReject } = req.body;
    const Story = await SuccessStories.findByIdAndUpdate(id, {
      status: "reject",
      whyReject,
    }, { new: true }
    )
    if (!Story) {
      res.status(400).json({ status: "error", message: "Your id is incorrect", statusCode: 400 })
      return
    }
    Story.save((err, success) => {
      if (err) {
        res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
        return
      }
      res.status(201).json({ status: "success", data: success, message: "Story rejected Successfully", statusCode: 201 })
      return
    });
  }

};

//Update
module.exports.updateSuccessStories = async (req, res) => {
  if (!req.body?.id) {
    res.status(400).json({ status: "error", message: "id Required", statusCode: 400 })
    return
  } else {
    const check = await SuccessStories.findOne({ _id: req.body?.id });
    if (check.status === 'reject') {
      if (!req.body?.name) {
        res.status(400).json({ status: "error", message: "Name required", statusCode: 400 })
        return
      } else if (!req.body?.userName) {
        res.status(400).json({ status: "error", message: "User Name Required", statusCode: 400 })
        return
      } else if (!req.body?.email) {
        res.status(400).json({ status: "error", message: "email Required", statusCode: 400 })
        return
      } else if (!req.body?.description) {
        res.status(400).json({ status: "error", message: "Description Required", statusCode: 400 })
        return
      } else {
        const del = await cloudinary.uploader.destroy(check.cloudinaryId);
        if (del) {
          const { name, userName, email, description,id } = req.body;
          const filename = await cloudinary.uploader.upload(req.file?.path, { folder: `SuccessStories/${email}/` });
          const data = {
            name, userName, email, description,
            successStoryImage: filename?.secure_url,
            cloudinaryId: filename?.public_id,
            status: "pending"
          };
          const newSuccessStories = await SuccessStories.findByIdAndUpdate(id, data, { new: true })
          newSuccessStories.save((err, success) => {
            if (err) {
              res.status(400).json({ status: "error", message: err?.message, statusCode: 400 })
              return
            }
            res.status(201).json({ status: "success", data: success, message: "SuccessStories Update Successfully", statusCode: 201 })
            return
          });
        } else {
          res.status(201).json({ status: "success", data: success, message: "Old image not deleted!try again", statusCode: 201 })
          return

        }
      }
    } else {
      res.status(400).json({ status: "error", message: `story already ${check.status}`, statusCode: 400 })
      return

    }
  }


};
