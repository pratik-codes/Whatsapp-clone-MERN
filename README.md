![image](https://images.news18.com/ibnlive/uploads/2019/10/WhatsApp.jpg?impolicy=website&width=534&height=356)
# WHATSAPP CLONE
## Tech Stack 
- M - MongoDb
- E - Express
- R - React
- N - Node

## Real-time updation:
### Pusher (how does it work)

![image](https://miro.medium.com/max/945/1*dTjmKo7m-nxMdIS-HMoNDg.gif)

- Step 1: The user pushing data to the database.
- Step 2: In MongoDB, we have ‘Change Stream’ for streaming real-time data changes which in return triggers ‘Pusher’.
- Step 3: Now, we need to subscribe to the pusher channel at ‘front-end’ for getting real-time updates.
## Almost Done!!
