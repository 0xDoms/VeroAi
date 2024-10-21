import React, { useEffect, useState } from "react";
import Navbar  from '../components/global/navbar';



import { Button } from "../components/ui/button";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const words = [{text: "Transform"},{text: "Your"},{text: "Support"},{text: "with"},{text: "Vero.",className: "text-primary dark:text-primary",},];

  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user)

  return (
    <main>
      <Navbar user={user} />
      <section className="h-screen w-full flex items-center justify-center bg-background text-center">
        <div className='p-8 flex flex-col items-center'>
          <span className='border border-primary text-primary rounded-3xl py-1 px-4'>Chat Support</span>
          <TypewriterEffect words={words} className='mt-5'/>
          <p className="text-muted-foreground text-lg mt-5">
            Enhance efficiency, monitor performance, and drive revenue growth with our powerful Chatbot solution.
          </p>
          <div className="card-wrapper w-3/4 h-96 mt-6">
            <div className="card-content">
              <img className='rounded-2xl w-full h-full object-cover' src="https://cdn.discordapp.com/attachments/1122110177336889384/1297933452854693958/dashboard.png?ex=6717ba39&is=671668b9&hm=a50c611d93bd5b2b581d7dad60f7316fa67e7ffdb20be7c36b012de23d4de1f5&" />
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 w-full h-1/2 z-10 bg-gradient-to-t from-background to-transparent via-background'></div>
      </section>
    </main>
  );
}