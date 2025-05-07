'use client'
import { useActionState } from "react";
import { sendSupportTicket } from "./actions";

export default function Support() {

  const [state, formAction, isPending] = useActionState(sendSupportTicket, {
    success: false,
    message: '',
  });

  return (
    <div className="flex flex-row gap-24 min-h-36 w-full mt-40 px-64 z-0"> 
      {/* PAGE HEADINGS */}
      <div className="w-full flex flex-col gap-2.5">
        <h1 className="text-[#111] text-4xl font-semibold">Daj nam znać</h1>
        <p className="texx-[#111] text-base font-light">Jesteśmy tutaj, aby Ci pomóc! Jeśli masz pytania, napotkałeś problem techniczny lub potrzebujesz wsparcia przy korzystaniu z naszego serwisu, skontaktuj się z nami za pomocą formularza kontaktowego lub napisz bezpośrednio na nasz adres e-mail. Odpowiemy tak szybko, jak to możliwe!</p>
      </div>
      {/* CONTACT FORM */}
      <div className="w-full">
        <form 
          className="flex flex-col gap-4 border p-10 w-full bg-white drop-shadow-md rounded-xl"
          action={formAction}
        >
          <h2>Formularz Kontaktowy</h2>

          <div className="flex flex-col gap-1">
            <label>Imię</label>
            <input type="text"  name="name" className="border"/>
          </div>

          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input type="text" name="email" className="border"/>
          </div>

          <div className="flex flex-col gap-1">
            <label>Tytył</label>
            <input type="text" name="title" className="border"/>
          </div>

          <div className="flex flex-col gap-1">
            <label>Imię</label>
            <textarea className="border" name="message"></textarea>
          </div>

          <div className="flex justify-end mt-5">
            <button 
              type="submit"
              className="w-fit px-10 py-1 rounded bg-[#111] text-white hover:bg-[#333] hover:cursor-pointer"
              disabled={isPending}
            >
              {isPending ? 'Wysyłanie...' : 'Wyślij'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

