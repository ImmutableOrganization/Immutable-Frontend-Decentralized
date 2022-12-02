import { NextPage } from 'next'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

let ranOnce = false
const ServerTest: NextPage = () => {
  useEffect(() => {
    if (!ranOnce) {
      console.log('HI')
      ranOnce = true
      var socket = io('http://localhost/3001');
      console.log(socket)
      socket.on('connect', function () {
        socket.send('hi');
      
        socket.on('message', function (msg) {
            console.log(msg);
          // my msg
        });
      });
    }
  }, [])

  return <></>
}

export default ServerTest
