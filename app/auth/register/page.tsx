"use client";

import { register } from "@/actions/registerUser";
import { useFormState } from "react-dom";

// export type FormData= {
//   status:'ok'|'error',
//   message:string
// }

export default function RegisterPage() {
  const [formState, registerAction] = useFormState(register, "");
  return (
    <>
      <form action={registerAction}>
        <label>
          E-mail: <input type="text" name="email" placeholder="John Kowalski" />
        </label>
        <label>
          Password:{" "}
          <input type="password" name="password" placeholder="12345" />
        </label>
        <input type="submit" />
      </form>
      {formState && <p className="text-destructive">{formState}</p>}
    </>
  );
}
