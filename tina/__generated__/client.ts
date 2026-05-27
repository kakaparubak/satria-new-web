import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'b05c1f10fffeacd596462b63e5f3c583897305e1', queries,  });
export default client;
  