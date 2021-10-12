var SocketList = require("./SocketModel");
module.exports.socketBox = async (index) => {
  try {
const id = "61656e7b24a37808ae6139af";
const socketDel =await SocketList.findOne()
const checkDel = socketDel.boxState.find((item)=>{
  return item==index
})
if (checkDel) {
  const data = await SocketList.findByIdAndUpdate(
    id, {
      $pull:{boxState:index}
    }, { new: true} 
 )
 return {data:await data.boxState}
 
}else{
  const data = await SocketList.findByIdAndUpdate(id, {
    $push:{boxState:index}
  }, { new: true ,upsert:true}
  )
  return {data:await data.boxState}
}
    
  } catch (error) {
    return error
    
  }
 
};
module.exports.getsocketBox = async () => {
  try {
const id = "61656e7b24a37808ae6139af";
const data =await SocketList.findOne({_id:id})
return {data:await data.boxState}    
  } catch (error) {
    return error
    
  }
 
};
