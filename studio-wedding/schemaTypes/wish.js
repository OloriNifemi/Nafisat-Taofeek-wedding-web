export default {
  name: "wish",
  title: "Wish",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (r) => r.required() },
    { name: "text", title: "Message", type: "text", validation: (r) => r.required() },
    { name: "createdAt", title: "Created At", type: "datetime" },
  ],
};