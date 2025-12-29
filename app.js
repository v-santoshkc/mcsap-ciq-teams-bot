const { stripMentionsText } = require("@microsoft/teams.api");
const { App } = require("@microsoft/teams.apps");
const { LocalStorage } = require("@microsoft/teams.common");
require("dotenv").config();

// Storage
const storage = new LocalStorage();

// Create Teams App using App ID + Secret
const app = new App({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD,
  storage
});

const getConversationState = (conversationId) => {
  let state = storage.get(conversationId);
  if (!state) {
    state = { count: 0 };
    storage.set(conversationId, state);
  }
  return state;
};

app.on("message", async (context) => {
  const text = stripMentionsText(context.activity);

  if (text === "/reset") {
    storage.delete(context.activity.conversation.id);
    await context.send("Conversation state cleared.");
    return;
  }

  const state = getConversationState(context.activity.conversation.id);
  state.count++;
  await context.send(`[${state.count}] you said: ${text}`);
});

module.exports = app;




