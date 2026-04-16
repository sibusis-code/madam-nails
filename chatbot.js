/* Madam Nails – Chatbot */
(function () {
  const toggle = document.getElementById('chatToggle');
  const box = document.getElementById('chatBox');
  const badge = document.getElementById('chatBadge');
  const messages = document.getElementById('chatMessages');
  const quickWrap = document.getElementById('chatQuick');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');

  let open = false;

  // ── Knowledge base ──────────────────────────────────────────────
  const KB = [
    {
      patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'howzit', 'hola'],
      reply: "Welcome to Madam Nails & Beauty Bar! How can I help you today?",
      quick: ['Book appointment', 'View prices', 'Our location', 'Opening hours']
    },
    {
      patterns: ['book', 'appointment', 'schedule', 'reserve', 'slot'],
      reply: "We operate <strong>by appointment only</strong>. 📲 Please contact us to book:\n📞 <a href='tel:+27742237225'>+27 74 223 7225</a>\n✉️ <a href='mailto:azwiemakhuvha@icloud.com'>azwiemakhuvha@icloud.com</a>\n💬 Or message us on <a href='https://wa.me/27742237225' target='_blank'>WhatsApp</a>!",
      quick: ['View prices', 'Our location', 'What services do you offer?']
    },
    {
      patterns: ['price', 'cost', 'how much', 'rate', 'pricing', 'fee', 'charge'],
      reply: "Here's a quick look at our prices 💛\n\n<strong>Nail Services</strong>\n• Gel Polish – R200 | Gel Infill – R250\n• Acrylic Full Set – R350 | Acrylic Infill – R300\n• Nail Art – from R50 per nail\n• Pedicure – R200 | Manicure – R150\n\n<strong>Packages</strong>\n• Mani & Pedi – R320 | Gel Mani & Pedi – R380\n• Full Set + Pedi – R500\n\n<strong>Lashes & Beauty</strong>\n• Classic Lashes – R350 | Volume Lashes – R450\n• Lash Infill – R200\n\nFor the full price list, see the <a href='#pricing'>Pricing section</a> on our website.",
      quick: ['Book appointment', 'Our location', 'Opening hours']
    },
    {
      patterns: ['hour', 'open', 'close', 'time', 'when', 'operating', 'trading'],
      reply: "We are open <strong>by appointment</strong> — so your slot is guaranteed! 🕐\nContact us to find a time that works for you:\n📞 <a href='tel:+27742237225'>+27 74 223 7225</a>",
      quick: ['Book appointment', 'Our location']
    },
    {
      patterns: ['where', 'location', 'address', 'pretoria', 'directions', 'find you', 'situated'],
      reply: "📍 We are located in <strong>Pretoria Central, 0001</strong>, South Africa.\nContact us for the exact address and we'll send you directions!\n📞 <a href='tel:+27742237225'>+27 74 223 7225</a>",
      quick: ['Book appointment', 'View prices']
    },
    {
      patterns: ['service', 'what do you do', 'what do you offer', 'offer', 'treatment', 'do you do'],
      reply: "We offer a full range of beauty services 💅✨\n\n• Gel & Acrylic Nails\n• Nail Art & Extensions\n• Manicure & Pedicure\n• Classic & Volume Lashes\n• Lash Infills\n• Signature Packages (Mani + Pedi combos)\n\nCheck the <a href='#services'>Services</a> or <a href='#pricing'>Pricing</a> sections for full details!",
      quick: ['View prices', 'Book appointment']
    },
    {
      patterns: ['gel', 'acrylic', 'nail art', 'extension', 'infill', 'polish'],
      reply: "Yes, we specialise in gel and acrylic nails! 💅\n• <strong>Gel Polish</strong> – R200\n• <strong>Gel Infill</strong> – R250\n• <strong>Acrylic Full Set</strong> – R350\n• <strong>Acrylic Infill</strong> – R300\n• <strong>Nail Art</strong> – from R50/nail\n\nReady to book?",
      quick: ['Book appointment', 'View all prices']
    },
    {
      patterns: ['lash', 'eyelash', 'classic lash', 'volume lash'],
      reply: "Our lash services 👁️✨\n• <strong>Classic Lashes</strong> – R350\n• <strong>Volume Lashes</strong> – R450\n• <strong>Lash Infill</strong> – R200\n\nContact us to book your lash appointment!",
      quick: ['Book appointment', 'View all prices']
    },
    {
      patterns: ['pedicure', 'manicure', 'mani', 'pedi', 'feet', 'toes'],
      reply: "Treat yourself! 🦶💅\n• <strong>Manicure</strong> – R150\n• <strong>Pedicure</strong> – R200\n• <strong>Mani & Pedi Package</strong> – R320\n• <strong>Gel Mani & Pedi Package</strong> – R380",
      quick: ['Book appointment', 'View all prices']
    },
    {
      patterns: ['whatsapp', 'contact', 'call', 'phone', 'email', 'reach', 'message'],
      reply: "You can reach us through any of these channels 📲\n📞 <a href='tel:+27742237225'>+27 74 223 7225</a>\n💬 <a href='https://wa.me/27742237225' target='_blank'>WhatsApp Us</a>\n✉️ <a href='mailto:azwiemakhuvha@icloud.com'>azwiemakhuvha@icloud.com</a>\n📘 <a href='https://facebook.com' target='_blank'>Facebook</a> | 📷 <a href='https://instagram.com' target='_blank'>Instagram @madam_nails22</a>",
      quick: ['Book appointment', 'View prices']
    },
    {
      patterns: ['social', 'instagram', 'facebook', 'follow'],
      reply: "Follow us for nail inspo & updates! ✨\n📘 Facebook: <a href='https://facebook.com' target='_blank'>Madam's_Nails Treat</a>\n📷 Instagram: <a href='https://instagram.com' target='_blank'>@madam_nails22</a>",
      quick: ['Book appointment', 'View prices']
    },
    {
      patterns: ['thank', 'thanks', 'thx', 'great', 'awesome', 'perfect', 'good'],
      reply: "You're welcome! 💛 We can't wait to have you in the chair. Anything else I can help with?",
      quick: ['Book appointment', 'View prices', 'Our location']
    },
    {
      patterns: ['bye', 'goodbye', 'see you', 'later', 'ttyl'],
      reply: "Bye for now! 💅 Come back anytime — we're always here. See you soon at Madam Nails! 🌟",
      quick: []
    }
  ];

  const DEFAULT = {
    reply: "I'm not sure about that, but our team can help! 😊\n📞 <a href='tel:+27742237225'>+27 74 223 7225</a>\n💬 <a href='https://wa.me/27742237225' target='_blank'>WhatsApp Us</a>",
    quick: ['Book appointment', 'View prices', 'Our location', 'Opening hours']
  };

  // Quick reply shortcuts → input text
  const QUICK_MAP = {
    'Book appointment': 'I want to book an appointment',
    'View prices': 'What are your prices?',
    'View all prices': 'What are your prices?',
    'Our location': 'Where are you located?',
    'Opening hours': 'What are your opening hours?',
    'What services do you offer?': 'What services do you offer?'
  };

  // ── Helpers ─────────────────────────────────────────────────────
  function match(text) {
    const t = text.toLowerCase().trim();
    for (const entry of KB) {
      if (entry.patterns.some(p => t.includes(p))) return entry;
    }
    return DEFAULT;
  }

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + sender;
    div.innerHTML = '<div class="chat-bubble">' + text.replace(/\n/g, '<br>') + '</div>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function setQuick(items) {
    quickWrap.innerHTML = '';
    items.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'quick-btn';
      btn.textContent = label;
      btn.addEventListener('click', () => handleSend(QUICK_MAP[label] || label));
      quickWrap.appendChild(btn);
    });
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'chat-msg bot typing-indicator';
    div.id = 'typingDot';
    div.innerHTML = '<div class="chat-bubble"><span></span><span></span><span></span></div>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typingDot');
    if (t) t.remove();
  }

  function handleSend(text) {
    if (!text.trim()) return;
    addMessage(text, 'user');
    setQuick([]);
    input.value = '';
    showTyping();
    setTimeout(() => {
      removeTyping();
      const result = match(text);
      addMessage(result.reply, 'bot');
      if (result.quick && result.quick.length) setQuick(result.quick);
    }, 700);
  }

  // ── Toggle ───────────────────────────────────────────────────────
  function openChat() {
    open = true;
    box.classList.add('active');
    toggle.classList.add('open');
    badge.style.display = 'none';
    input.focus();
  }

  function closeChat() {
    open = false;
    box.classList.remove('active');
    toggle.classList.remove('open');
  }

  toggle.addEventListener('click', () => open ? closeChat() : openChat());
  document.getElementById('chatCloseBtn').addEventListener('click', closeChat);

  sendBtn.addEventListener('click', () => handleSend(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(input.value); });

  // ── Greeting ─────────────────────────────────────────────────────
  setTimeout(() => {
    addMessage("Hi gorgeous! 💅 I'm the Madam Nails & Beauty Bar assistant. How can I help you today?", 'bot');
    
    setQuick(['Book appointment', 'View prices', 'Our location', 'Opening hours']);
  }, 300);

  // Show badge after 3s if not opened
  setTimeout(() => {
    if (!open) badge.style.display = 'flex';
  }, 3000);
})();
