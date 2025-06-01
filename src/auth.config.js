import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google, GitHub],
};
