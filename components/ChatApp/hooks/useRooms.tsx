import { useContext, useEffect, useState } from 'react';
import { ActionSender, BaseRoomConfig, joinRoom, selfId } from 'trystero';
import React from 'react';
import { PopupContext } from '../../../pages/_app';
import { useLocalStorage } from 'usehooks-ts';
import { Messages } from '../messages/messages';
import { Room } from '../rooms/room';
import * as trystero from 'trystero';
import DOMPurify from 'dompurify';
import badWords from './badwords';

export let sendMessage: ActionSender<Messages.Message>;

export const useRooms = (
  selectedRoomCallback: (_room: Room.RoomWrapper) => void,
  messageCallback: Messages.MessageCallback,
  maxMessageSize: number,
  blockMessagesWithProfanity: boolean,
  censcorMessagesWithProfanity: boolean,
  peerMessageInterval: number,
) => {
  const [rooms, setRooms] = useState<Room.RoomWrapper[]>();
  const [savedRooms, setSavedRooms] = useLocalStorage<Room.SavedRoom[]>('roomNames', []);
  const { setFormError } = useContext(PopupContext);

  useEffect(() => {
    if (!rooms || rooms.length === 0) {
      addRoom('GLOBAL', '');
    }
  }, [rooms]);
  useEffect(() => {
    setRooms(savedRooms.map((_room) => ({ roomName: _room.roomName, room: undefined, password: _room.password, allowStreams: false })));
  }, []);

  const [streams, setStreams] = useState<Room.PeerStream>();
  const streamsRef = React.useRef(streams);
  const setStreamRef = (data: Room.PeerStream) => {
    streamsRef.current = data;
    setStreams(data);
  };

  const [lastMessageFromPeer, setLastMessageFromPeer] = useState<Room.lastMessageFromPeer>();
  const lastMessageFromPeerRef = React.useRef(lastMessageFromPeer);
  const setLastMessageFromPeerRef = (data: Room.lastMessageFromPeer) => {
    lastMessageFromPeerRef.current = data;
    setLastMessageFromPeer(data);
  };

  const { setOpenToast, setToastMessage, setToastType } = useContext(PopupContext);

  const allowStreamsForRoom = (_room: Room.RoomWrapper, allow: boolean) => {
    if (rooms) {
      const newRooms = rooms.map((room: Room.RoomWrapper) => {
        if (room.roomName === _room.roomName) {
          selectedRoomCallback({ ...room, allowStreams: allow });
          return { ...room, allowStreams: allow };
        }
        return room;
      });
      setRooms(newRooms);
    }
  };

  // separate code for updating room state vs stream state
  // organization and functionality
  const addToSavedRooms = (roomName: string, _password: string) => {
    if (savedRooms) {
      if (!savedRooms.find((room) => room.roomName === roomName)) {
        setSavedRooms([...savedRooms, { roomName, password: _password }]);
      }
    } else {
      setSavedRooms([{ roomName, password: _password }]);
    }
  };
  const removedFromSavedRooms = (roomName: string) => {
    if (savedRooms) {
      setSavedRooms(savedRooms.filter((room) => room.roomName !== roomName));
    }
  };

  // add room to state
  const addRoom = (_roomName: string, _password: string) => {
    if (_roomName == '') {
      setToastMessage('Room must have a name');
      setOpenToast(true);
      setToastType('failure');
      return;
    }

    // check if roomName is already in state
    if (rooms) {
      if (rooms.find((room) => room.roomName === _roomName)) {
        setToastMessage('Room exists');
        setOpenToast(true);
        setToastType('failure');
        return;
      }
    }
    if (rooms) {
      if (!rooms.find((room) => room.roomName === _roomName)) {
        setRooms([...rooms, { roomName: _roomName, room: undefined, password: _password, allowStreams: false }]);
        addToSavedRooms(_roomName, _password);
      }
    } else {
      setRooms([{ roomName: _roomName, room: undefined, password: _password, allowStreams: false }]);
      addToSavedRooms(_roomName, _password);
    }
  };

  const disconnectRoom = (_room: Room.RoomWrapper) => {
    selectedRoomCallback(Room.emptyRoom);

    if (_room.room) {
      _room.room.leave();
      const newItem: Room.RoomWrapper = { ..._room, room: undefined };
      if (rooms) {
        setRooms((rooms: any) => rooms.map((room: Room.RoomWrapper) => (room.roomName === _room.roomName ? newItem : room)));
      }
    }
  };

  const blockPeerVideoController = (peerId: string, block: boolean) => {
    if (streams) {
      const newStreams = { ...streams };
      if (newStreams[peerId]) {
        newStreams[peerId].videoBlocked = block;
        setStreamRef(newStreams);
      } else {
        setStreamRef({ [peerId]: { mediaStream: undefined, videoBlocked: block, audioBlocked: block, textBlocked: block } });
      }
    } else {
      setStreamRef({ [peerId]: { mediaStream: undefined, videoBlocked: block, audioBlocked: block, textBlocked: block } });
    }
  };

  const blockPeerAudioController = (peerId: string, block: boolean) => {
    if (streams) {
      const newStreams = { ...streams };
      if (newStreams[peerId]) {
        newStreams[peerId].audioBlocked = block;
        setStreamRef(newStreams);
      } else {
        setStreamRef({ [peerId]: { mediaStream: undefined, videoBlocked: block, audioBlocked: block, textBlocked: block } });
      }
    } else {
      setStreamRef({ [peerId]: { mediaStream: undefined, videoBlocked: block, audioBlocked: block, textBlocked: block } });
    }
  };

  const blockPeerTextController = (peerId: string, block: boolean) => {
    if (streams) {
      const newStreams = { ...streams };
      if (newStreams[peerId]) {
        newStreams[peerId].textBlocked = block;
        setStreamRef(newStreams);
      } else {
        setStreamRef({ [peerId]: { mediaStream: undefined, videoBlocked: block, audioBlocked: block, textBlocked: block } });
      }
    } else {
      setStreamRef({ [peerId]: { mediaStream: undefined, videoBlocked: block, audioBlocked: block, textBlocked: block } });
    }
  };

  const connectStream = async (_room: Room.RoomWrapper, _stream: MediaStream) => {
    if (rooms) {
      // find _room in rooms
      const _rooms = rooms.find((room) => room.roomName === _room.roomName);
      if (_rooms) {
        if (_rooms.room) {
          try {
            _rooms.room.addStream(_stream);
            _rooms.room.onPeerJoin((peerId) => {
              if (_rooms.room) {
                _rooms.room.addStream(_stream, peerId);
              } else {
                setFormError({ open: true, message: 'Room no longer exists for peer to join' });
              }
            });
            _rooms.room.onPeerLeave((peerId) => {
              if (_rooms.room) {
                _rooms.room.removeStream(_stream, peerId);
              }
            });
          } catch (e) {
            setFormError({ open: true, message: 'Error adding stream' });
          }
        }
      }
    }
  };

  const disconnectStream = async (_room: Room.RoomWrapper, _stream: MediaStream) => {
    if (rooms) {
      const room = rooms.find((room) => room.roomName === _room.roomName);
      if (room) {
        if (room.room) {
          try {
            room.room.removeStream(_stream);
          } catch (e) {
            setFormError({ open: true, message: 'Error removing stream' });
          }
        }
      }
    }
  };

  const connectToRoom = (_room: Room.RoomWrapper) => {
    try {
      const config: BaseRoomConfig = { appId: '63f7ef007b534d6bb42e9c02650f3901', password: _room.password };
      let room: trystero.Room;
      try {
        room = joinRoom(config, _room.roomName);
        const newItem: Room.RoomWrapper = { ..._room, room };
        selectedRoomCallback(newItem);
        if (newItem.room) {
          newItem.room.onPeerStream((stream, peerId) => {
            if (streamsRef.current && streamsRef.current[peerId] && streamsRef.current[peerId].videoBlocked) {
              return;
            }
            const copy = { ...streamsRef.current };
            copy[peerId] = { mediaStream: stream, videoBlocked: false, audioBlocked: false, textBlocked: false };
            setStreamRef(copy);
          });
        }

        if (rooms) {
          setRooms((rooms: any) => rooms.map((room: Room.RoomWrapper) => (room.roomName === _room.roomName ? newItem : room)));
        } else {
          setRooms([newItem]);
        }

        if (room) {
          // this needs to be moved
          const [_sendMessage, getMessage] = room.makeAction<Messages.Message>('message');
          sendMessage = _sendMessage;
          getMessage((_msg, peerId) => {
            if (!_msg) {
              return;
            }
            if (_msg.message == undefined || _msg.message == null || _msg.message == '') {
              return;
            }
            if (_msg.message.length > maxMessageSize) {
              return;
            }
            if (_msg.timestamp == undefined || _msg.timestamp == null || _msg.timestamp <= 0) {
              return;
            }
            if (_msg.peerId == undefined || _msg.peerId == null || _msg.peerId == '') {
              return;
            }
            if (_msg.peerId != peerId) {
              return;
            }

            if (lastMessageFromPeerRef.current && lastMessageFromPeerRef.current[peerId]) {
              if (Date.now() - lastMessageFromPeerRef.current[peerId] < peerMessageInterval) {
                return;
              }
            }

            if (streamsRef.current && streamsRef.current[peerId] && streamsRef.current[peerId].textBlocked) {
              return;
            }

            // sanitize message
            _msg.message = DOMPurify.sanitize(_msg.message);
            const foundSwears = badWords.filter((word: string) => _msg.message.toLowerCase().includes(word.toLowerCase()));
            if (foundSwears.length > 0) {
              if (blockMessagesWithProfanity) {
                return;
              } else {
                if (censcorMessagesWithProfanity) {
                  foundSwears.map((badWord: string) => {
                    _msg.message.replaceAll(badWord, '*'.repeat(badWord.length));
                  });
                }
              }
            }

            if (lastMessageFromPeerRef.current) {
              lastMessageFromPeerRef.current[peerId] = Date.now();
            } else {
              lastMessageFromPeerRef.current = { [peerId]: Date.now() };
            }
            setLastMessageFromPeerRef(lastMessageFromPeerRef.current);

            messageCallback.getMessageListener(_msg, _room.roomName);
          });
        } else {
          setFormError({ open: true, message: 'Room is undefined' });
        }
      } catch (e) {
        console.log('error joining room', e);
        setFormError({ open: true, message: 'Error joining room, ' + e });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // remove room from state
  const removeRoom = (_room: Room.RoomWrapper) => {
    if (_room.room) {
      _room.room.leave();
    }
    if (rooms) {
      setRooms((rooms: any) => rooms.filter((room: Room.RoomWrapper) => room.roomName !== _room.roomName));
      removedFromSavedRooms(_room.roomName);
    }
  };

  // select room
  const selectRoom = (_room: Room.RoomWrapper) => {
    if (_room.room) {
      setFormError({ open: true, message: 'Already connected to room' });
      disconnectRoom(_room);
      return;
    }
    selectedRoomCallback(_room);
  };

  const getPeers = (_room: Room.RoomWrapper) => {
    if (_room.room) {
      return _room.room.getPeers();
    } else {
      return [];
    }
  };

  const callSendMessage = (message: Messages.Message) => {
    if (sendMessage) {
      sendMessage(message);
    } else {
      setFormError({ open: true, message: 'Unable to send message' });
    }
  };

  return {
    rooms,
    addRoom,
    removeRoom,
    selectRoom,
    connectToRoom,
    disconnectRoom,
    selfId,
    getPeers,
    callSendMessage,
    connectStream,
    streamsRef,
    disconnectStream,
    blockPeerAudioController,
    blockPeerVideoController,
    blockPeerTextController,
    savedRooms,
    allowStreamsForRoom,
  };
};
