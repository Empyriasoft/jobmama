// Chat-native contact channels. For social traffic these are a lower-friction
// first touch than booking a calendar slot. Fill in what exists — null entries
// are simply not rendered.

export interface ContactChannels {
  instagramDm: string | null;
  messenger: string | null;
  viber: string | null;
}

export const contactChannels: ContactChannels = {
  // Opens a DM to the Instagram account.
  instagramDm: "https://ig.me/m/jobmama_bg",
  // TODO(user): add an m.me/<page> link once the Facebook page handle is known.
  messenger: null,
  // TODO(user): add "viber://chat?number=%2B359XXXXXXXXX" with the business number.
  viber: null,
};
