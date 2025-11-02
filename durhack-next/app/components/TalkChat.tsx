'use client';

import { useEffect, useRef } from 'react';
import Talk from 'talkjs';

export default function TalkChat() {
  const chatboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Talk.ready.then(() => {
      const me = new Talk.User({
        id: '123456',
        name: 'Gandia',
        email: 'gandia@example.com',
        photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
        role: 'user',
      });

      const other = new Talk.User({
        id: '654321',
        name: 'Alex',
        email: 'alex@example.com',
        photoUrl: 'https://talkjs.com/images/avatar-5.jpg',
        role: 'user',
      });

      const session = new Talk.Session({
        appId: 'YOUR_TALKJS_APP_ID',
        me: me,
      });

      const conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
      conversation.setParticipant(me);
      conversation.setParticipant(other);

      const inbox = session.createInbox({ selected: conversation });
      inbox.mount(chatboxRef.current!);
    });
  }, []);

  return <div ref={chatboxRef} style={{ height: '400px' }} />;
}