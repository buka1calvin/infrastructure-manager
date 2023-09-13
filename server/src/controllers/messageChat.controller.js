import Message from "../models/Message";

export const addMessage = async (req, res) => {
  const { sender,receiver,message } = req.body;
  try {
    const NewMessage = await Message.create({
        message:{text:message},
        users:[sender,receiver],
        sender:sender
    })
    res.status(201).json({ message: NewMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  const sender  = req.body.sender;
  const receiver = req.body.receiver;
  try { 
    const getMessages = await await Message.find({
        users: {
          $all: [sender, receiver],
        },
      }).sort({ updatedAt: 1 });
    const projectedMessages=getMessages.map((message)=>{
      console.log("Message createdAt:", message.createdAt);
        return {
            fromSelf:message.sender.toString()===sender,
            message:message.message.text,
            createdAt: message.createdAt.toLocaleString(undefined, {
          hour: 'numeric',
          minute: 'numeric',
          weekday: 'short',
        }), 
        }
    })
    res.status(200).json({ messages: projectedMessages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
