import { useState } from 'react';

// PUBLIC_INTERFACE
export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'system', text: 'Ask about the Giant Anteater status.' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: 'user', text: input }, { role: 'assistant', text: 'This is a placeholder response.' }]);
    setInput('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div className="card mt-16" style={{ minHeight: 260, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflow: 'auto', display: 'grid', gap: 8 }}>
          {messages.map((m, i) => (
            <div key={i} className="row" style={{ justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div className="badge" style={{ background: m.role === 'user' ? 'rgba(30,58,138,.12)' : 'rgba(245,158,11,.12)', color: 'inherit' }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-16">
          <input className="input" placeholder="Type a message…" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && send()} />
          <button className="btn" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}
