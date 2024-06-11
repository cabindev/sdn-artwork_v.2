'use client'
import React from 'react';

type Props = {
    onMessageClick: () => void;  // กำหนดว่า props 'onMessageClick' เป็น function ที่ไม่รับ parameter และไม่มี return value
}

// ระบุว่านี่คือ Client Component
/* Client */
export default function Page({ onMessageClick }: Props) {
  return (
    <div>
      <button onClick={onMessageClick}>Click Me</button>
    </div>
  );
}
