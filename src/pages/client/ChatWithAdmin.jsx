import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, RefreshCw, Send, Ticket } from "lucide-react";
import { getMessages, sendMessage } from "../../api/chatApi";
import { getTickets } from "../../api/ticketApi";
import { PageHeader } from "../../components/ClientComponent/UI";

const formatTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
};

export default function ChatWithAdmin() {
  const [tickets, setTickets] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [pollingPaused, setPollingPaused] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let active = true;

    getTickets()
      .then((response) => {
        if (!active) return;
        const ticketList = response.tickets || [];
        setTickets(ticketList);
        if (ticketList.length) setTicketId(String(ticketList[0]._id || ticketList[0].id));
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.response?.data?.message || "Could not load your tickets.");
        }
      })
      .finally(() => {
        if (active) setLoadingTickets(false);
      });

    return () => { active = false; };
  }, []);

  const fetchMessages = useCallback(async (showLoading = false) => {
    if (!ticketId) return;
    if (showLoading) setLoadingMessages(true);

    try {
      const response = await getMessages(ticketId, "client_admin");
      setMessages(response.messages || []);
      setError("");
    } catch (requestError) {
      setPollingPaused(true);
      setError(requestError.response?.data?.message || "Could not load this conversation.");
    } finally {
      if (showLoading) setLoadingMessages(false);
    }
  }, [ticketId]);

  useEffect(() => {
    if (!ticketId) {
      setMessages([]);
      return undefined;
    }
    if (pollingPaused) return undefined;

    fetchMessages(true);
    const intervalId = window.setInterval(() => fetchMessages(), 5000);
    return () => window.clearInterval(intervalId);
  }, [ticketId, fetchMessages, pollingPaused]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !ticketId || sending) return;

    setSending(true);
    setError("");
    try {
      const response = await sendMessage(ticketId, "client_admin", text);
      if (response.message) {
        setMessages((current) => [...current, response.message]);
      } else {
        await fetchMessages();
      }
      setDraft("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not send your message.");
    } finally {
      setSending(false);
    }
  };

  const selectedTicket = tickets.find(
    (ticket) => String(ticket._id || ticket.id) === ticketId,
  );

  return (
    <div>
      <PageHeader
        eyebrow="Support center"
        title="Chat with Admin"
        description="Discuss a support ticket directly with the ClientCare admin team."
      />

      <section className="flex h-[min(70vh,720px)] min-h-[480px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 p-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
              <MessageCircle size={19} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-stone-900">Ticket conversation</p>
              <p className="truncate text-xs text-stone-500">
                {selectedTicket?.title || "Select a ticket to start"}
              </p>
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-stone-500">
            <Ticket size={15} />
            <select
              aria-label="Choose ticket for chat"
              value={ticketId}
              onChange={(event) => setTicketId(event.target.value)}
              disabled={loadingTickets || tickets.length === 0}
              className="max-w-[220px] rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 outline-none focus:border-orange-400"
            >
              {loadingTickets ? (
                <option value="">Loading tickets...</option>
              ) : tickets.length ? (
                tickets.map((ticket) => (
                  <option key={ticket._id || ticket.id} value={ticket._id || ticket.id}>
                    {ticket.title}
                  </option>
                ))
              ) : (
                <option value="">No tickets available</option>
              )}
            </select>
          </label>
        </div>

        {error && (
          <div role="alert" className="flex items-center justify-between gap-3 border-b border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-700">
            <span>{error}</span>
            {ticketId && (
              <button type="button" onClick={() => setPollingPaused(false)} className="inline-flex shrink-0 items-center gap-1 font-semibold hover:underline">
                <RefreshCw size={14} /> Retry
              </button>
            )}
          </div>
        )}

        <div className="flex-1 space-y-4 overflow-y-auto bg-stone-50/60 p-4 sm:p-6">
          {loadingTickets ? (
            <p className="py-10 text-center text-sm text-stone-500">Loading your tickets...</p>
          ) : !tickets.length ? (
            <div className="mx-auto max-w-sm py-12 text-center">
              <Ticket size={30} className="mx-auto text-stone-300" />
              <p className="mt-3 text-sm font-semibold text-stone-800">Create a ticket to start a chat</p>
              <p className="mt-1 text-sm text-stone-500">Each conversation is linked to one of your support tickets.</p>
              <Link to="/client/create-ticket" className="mt-4 inline-flex rounded-xl bg-[#C2410C] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#9A3412]">
                Create ticket
              </Link>
            </div>
          ) : loadingMessages ? (
            <p className="py-10 text-center text-sm text-stone-500">Loading conversation...</p>
          ) : messages.length ? (
            messages.map((message) => {
              const isOwnMessage = message.senderRole === "client";
              return (
                <div key={message._id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                  <article className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[75%] ${isOwnMessage ? "rounded-br-md bg-orange-700 text-white" : "rounded-bl-md border border-stone-200 bg-white text-stone-800"}`}>
                    <div className="flex items-center gap-2">
                      <p className={`text-xs font-bold ${isOwnMessage ? "text-orange-100" : "text-stone-800"}`}>
                        {isOwnMessage ? "You" : message.senderName || "Admin"}
                      </p>
                      {!isOwnMessage && <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold capitalize text-orange-800">Admin</span>}
                    </div>
                    <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6">{message.text}</p>
                    <time className={`mt-2 block text-right text-[10px] ${isOwnMessage ? "text-orange-100" : "text-stone-400"}`}>
                      {formatTime(message.createdAt)}
                    </time>
                  </article>
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center">
              <MessageCircle size={30} className="mx-auto text-stone-300" />
              <p className="mt-3 text-sm font-semibold text-stone-800">No messages yet</p>
              <p className="mt-1 text-sm text-stone-500">Send a message to begin discussing this ticket with Admin.</p>
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
            placeholder={ticketId ? "Write a message..." : "Select a ticket first"}
            maxLength={5000}
            rows={1}
            disabled={!ticketId || sending}
            className="max-h-32 min-h-11 flex-1 resize-y rounded-xl border border-stone-200 px-4 py-3 text-sm text-stone-800 outline-none placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:bg-stone-50"
          />
          <button
            type="submit"
            disabled={!ticketId || !draft.trim() || sending}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-4 text-sm font-semibold text-white transition hover:bg-[#9A3412] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={16} /> <span className="hidden sm:inline">{sending ? "Sending..." : "Send"}</span>
          </button>
        </form>
      </section>
    </div>
  );
}
