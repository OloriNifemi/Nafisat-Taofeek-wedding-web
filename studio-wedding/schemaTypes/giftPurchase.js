export default {
  name: "giftPurchase",
  title: "Gift Purchase",
  type: "document",
  fields: [
    { name: "giftId", title: "Gift ID", type: "string", validation: (r) => r.required() },
    { name: "giftName", title: "Gift Name", type: "string" },
    { name: "anonymous", title: "Anonymous", type: "boolean" },
    { name: "name", title: "Name", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "message", title: "Message", type: "text" },
    { name: "createdAt", title: "Created At", type: "datetime" },
  ],
};