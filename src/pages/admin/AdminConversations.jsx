import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, RefreshCw, Send, Users, Code2 } from "lucide-react";
import { getMessages, sendMessage } from "../../api/chatApi";
import { getTickets } from "../../api/ticketApi";
import { PageHeader } from "../../components/ClientComponent/UI";

const chatTabs = [
  { id: "client_admin", label: "Client Conversations", icon: Users },
  { id: "admin_developer", label: "Developer Conversations", icon: Code2 },
];

const formatTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
};

export default function AdminConversations() {
  const [chatType, setChatType] = useState("client_admin");
  const [selectedByType, setSelectedByType] = useState({
    client_admin: "",
    admin_developer: "",
  });
  const [tickets, setTickets] = useState([]);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let active = true;
    getTickets()
      .then((response) => {
        if (!active) return;
        setTickets(response.tickets || []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || "Could not load tickets.");
      })
      .finally(() => {
        if (active) setLoadingTickets(false);
      });
    return () => { active = false; };
  }, []);

  const availableTickets = useMemo(
    () => chatType === "admin_developer"
      ? tickets.filter((ticket) => ticket.assignedDeveloper?._id || ticket.assignedDeveloper)
      : tickets,
    [tickets, chatType],
  );

  const currentSelection = selectedByType[chatType];
  const selectedTicketId = availableTickets.some(
    (ticket) => String(ticket._id || ticket.id) === currentSelection,
  )
    ? currentSelection
    : String(availableTickets[0]?._id || availableTickets[0]?.id || "");

  useEffect(() => {
    if (selectedTicketId && selectedTicketId !== selectedByType[chatType]) {
      setSelectedByType((current) => ({ ...current, [chatType]: selectedTicketId }));
    }
  }, [selectedTicketId, selectedByType, chatType]);

  const fetchMessages = useCallback(async (showLoading = false) => {
    if (!selectedTicketId) return;
    if (showLoading) setLoadingMessages(true);
    try {
      const response = await getMessages(selectedTicketId, chatType);
      setMessages(response.messages || []);
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not load this conversation.");
    } finally {
      if (showLoading) setLoadingMessages(false);
    }
  }, [selectedTicketId, chatType]);

  useEffect(() => {
    if (!selectedTicketId) {
      setMessages([]);
      return undefined;
    }
    fetchMessages(true);
    const intervalId = window.setInterval(() => fetchMessages(), 5000);
    return () => window.clearInterval(intervalId);
  }, [fetchMessages, selectedTicketId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !selectedTicketId || sending) return;

    setSending(true);
    setError("");
    try {
      const response = await sendMessage(selectedTicketId, chatType, text);
      if (response.message) setMessages((current) => [...current, response.message]);
      else await fetchMessages();
      setDraft("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not send your message.");
    } finally {
      setSending(false);
    }
  };

  const selectedTicket = availableTickets.find(
    (ticket) => String(ticket._id || ticket.id) === selectedTicketId,
  );
  const otherPartyName = chatType === "client_admin"
    ? selectedTicket?.client?.name || "Client"
    : selectedTicket?.assignedDeveloper?.name || "Developer";

  return (
    <div>
      <PageHeader
        eyebrow="Support management"
        title="Conversations"
        description="Chat with clients about their tickets and coordinate directly with assigned developers."
      />

      <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-stone-200 bg-white p-2">
        {chatTabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setChatType(id)}
            aria-pressed={chatType === id}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${chatType === id ? "bg-orange-50 text-orange-800" : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"}`}
          >
            <Icon size={17} /> {label}
          </button>
        ))}
      </div>

      {error && !selectedTicketId && (
        <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <section className="grid min-h-[600px] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="border-b border-stone-100 lg:border-b-0 lg:border-r">
          <div className="border-b border-stone-100 px-4 py-4">
            <h2 className="font-bold text-stone-900">{chatType === "client_admin" ? "Client tickets" : "Assigned developer tickets"}</h2>
            <p className="mt-1 text-xs text-stone-500">{availableTickets.length} conversations</p>
          </div>
          <div className="max-h-64 overflow-y-auto lg:max-h-[680px]">
            {loadingTickets ? (
              <p className="p-4 text-sm text-stone-500">Loading tickets...</p>
            ) : availableTickets.length ? (
              availableTickets.map((ticket) => {
                const id = String(ticket._id || ticket.id);
                const isActive = id === selectedTicketId;
                const person = chatType === "client_admin"
                  ? ticket.client?.name || "Client"
                  : ticket.assignedDeveloper?.name || "Developer";
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedByType((current) => ({ ...current, [chatType]: id }))}
                    className={`block w-full border-b border-stone-100 px-4 py-4 text-left transition ${isActive ? "bg-orange-50/70" : "hover:bg-stone-50"}`}
                  >
                    <span className="block truncate text-sm font-semibold text-stone-900">{ticket.title}</span>
                    <span className="mt-1 block truncate text-xs text-stone-500">{person}</span>
                    <span className="mt-1 block text-[11px] text-stone-400">#{id.slice(-6).toUpperCase()} · {ticket.status}</span>
                  </button>
                );
              })
            ) : (
              <p className="p-4 text-sm text-stone-500">
                {chatType === "admin_developer" ? "No tickets have an assigned developer yet." : "No client tickets found."}
              </p>
            )}
          </div>
        </aside>

        <div className="flex min-h-[520px] min-w-0 flex-col">
          {selectedTicket ? (
            <>
              <div className="flex items-center gap-3 border-b border-stone-100 px-4 py-4 sm:px-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700"><MessageCircle size={19} /></span>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-bold text-stone-900">{selectedTicket.title}</h2>
                  <p className="mt-1 text-xs text-stone-500">{chatType === "client_admin" ? "Client" : "Assigned developer"}: {otherPartyName}</p>
                </div>
              </div>

              {error && (
                <div role="alert" className="flex items-center justify-between gap-3 border-b border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                  <span>{error}</span>
                  <button type="button" onClick={() => fetchMessages(true)} className="inline-flex shrink-0 items-center gap-1 font-semibold hover:underline"><RefreshCw size={14} /> Retry</button>
                </div>
              )}

              <div className="flex-1 space-y-4 overflow-y-auto bg-stone-50/60 p-4 sm:p-6">
                {loadingMessages ? (
                  <p className="py-10 text-center text-sm text-stone-500">Loading conversation...</p>
                ) : messages.length ? (
                  messages.map((message) => {
                    const isOwnMessage = message.senderRole === "admin";
                    const senderLabel = message.senderRole === "admin"
                      ? "You"
                      : message.senderName || (chatType === "client_admin" ? "Client" : "Developer");
                    return (
                      <div key={message._id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                        <article className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[75%] ${isOwnMessage ? "rounded-br-md bg-orange-700 text-white" : "rounded-bl-md border border-stone-200 bg-white text-stone-800"}`}>
                          <p className={`text-xs font-bold ${isOwnMessage ? "text-orange-100" : "text-stone-700"}`}>{senderLabel}</p>
                          <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6">{message.text}</p>
                          <time className={`mt-2 block text-right text-[10px] ${isOwnMessage ? "text-orange-100" : "text-stone-400"}`}>{formatTime(message.createdAt)}</time>
                        </article>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-16 text-center">
                    <MessageCircle size={30} className="mx-auto text-stone-300" />
                    <p className="mt-3 text-sm font-semibold text-stone-800">No messages yet</p>
                    <p className="mt-1 text-sm text-stone-500">Send a message to start this conversation with {otherPartyName}.</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="flex items-end gap-3 border-t border-stone-100 bg-white p-3 sm:p-4">
                <textarea
                  aria-label="Your message"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  placeholder={`Message ${otherPartyName}...`}
                  maxLength={5000}
                  rows={1}
                  disabled={sending}
                  className="max-h-32 min-h-11 flex-1 resize-y rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-800 outline-none placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:bg-stone-50"
                />
                <button type="submit" disabled={!draft.trim() || sending} className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-4 text-sm font-semibold text-white transition hover:bg-[#9A3412] disabled:cursor-not-allowed disabled:opacity-50">
                  <Send size={16} /><span className="hidden sm:inline">{sending ? "Sending..." : "Send"}</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <MessageCircle size={34} className="text-stone-300" />
              <p className="mt-3 text-sm font-semibold text-stone-800">Select a conversation</p>
              <p className="mt-1 text-sm text-stone-500">Choose a ticket from the list to view its messages.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
