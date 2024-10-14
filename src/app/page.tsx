import React, { useEffect, useState } from "react";
import Navbar  from '../components/global/navbar';



import { Button } from "../components/ui/button";
import { TypewriterEffect } from "../components/ui/typewriter-effect";

export default function Home() {
  const words = [{text: "Transform"},{text: "Your"},{text: "Support"},{text: "with"},{text: "Vero.",className: "text-primary dark:text-primary",},];
  return (
    <main>
      <Navbar />
      <section className="h-screen w-full flex items-center justify-center bg-background text-center">
        <div className='p-8 flex flex-col items-center'>
          <span className='border border-primary text-primary rounded-3xl py-1 px-4'>Chat Support</span>
          <TypewriterEffect words={words} className='mt-5'/>
          <p className="text-muted-foreground text-lg mt-5">
            Enhance efficiency, monitor performance, and drive revenue growth with our powerful Chatbot solution.
          </p>
          <div className="card-wrapper w-3/4 h-96 mt-6">
            <div className="card-content">
              <img className='rounded-2xl w-full h-full object-cover' src="https://cdn.dribbble.com/userupload/15896168/file/original-40568ecba17e7efa21905c83e401d29c.png?resize=1024x768" />
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 w-full h-1/2 z-10 bg-gradient-to-t from-background to-transparent via-background'></div>
      </section>
    </main>
  );
}