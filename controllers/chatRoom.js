const db = require('../models')

const index = async (req, res) => {
  console.log('all messages')
}

const show = async (req, res) => {
  try {
    const foundChatRoom = await db.ChatRoom.findOne({ _id: req.params.id })
    await res.json({ chatRoom: foundChatRoom })
  } catch (error) {
    console.log(error)
  }
}

const create = async (req, res) => {
  const body = JSON.parse(req.body.body)
  const members = body
  let userIds = []
  for (let id of members) {
    userIds.push(id.user)
  }
  const obj = {}
  obj['members'] = members
  // console.log('members', obj)

  try {
    const newChatRoom = await db.ChatRoom.create(obj)
    await newChatRoom.save()
    const foundUsers = await db.User.find().where('_id').in(userIds).exec()
    foundUsers.map(async (user) => {
      user.chatRooms.push(newChatRoom)
      await user.save()
    })
    // console.log('new', newChatRoom)
    await res.json({ chatRoom: newChatRoom })
  } catch (error) {
    console.log(error)
  }
}

const update = async (req, res) => {}

const destroy = async (req, res) => {}
module.exports = {
  index,
  show,
  create,
  update,
  destroy,
}