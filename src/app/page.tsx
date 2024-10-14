import React, { useEffect, useState } from "react";
import Navbar  from '../components/global/navbar';
import { Check } from 'lucide-react';


import { LampContainer } from "../components/ui/lamp";
import { Button } from "../components/ui/button";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

//Obvious template, never really worked with these
const WorkedWith = [
  { Company: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png" }, // Google
  { Company: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Bing_logo_%282016%29.svg/1200px-Bing_logo_%282016%29.svg.png" }, // Bing
  { Company: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" }, // Amazon
  { Company: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1024px-Apple_logo_black.svg.png" }, // Apple
  { Company: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1024px-Facebook_f_logo_%282019%29.svg.png" }, // Facebook
  { Company: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/640px-Samsung_Logo.svg.png" }, // Samsung
];

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
      <section className="flex justify-center">
        <InfiniteMovingCards
          items={WorkedWith}
          direction="right"
          speed="normal"
        />
      </section>
      <section className="flex justify-center mt-5">
        <div className="flex flex-col items-center justify-center max-w-1/2 w-1/2 p-2">
          <LampContainer>
            <h1 className="text-4xl text-white font-bold font-sans mb-5">
              Plans Just Fit For You
            </h1>
            <div className="flex">
            <Card className="max-w-1/3 mx-2">
              <CardHeader>
                <CardTitle className="font-bold text-2xl">Start Up</CardTitle>
                <CardDescription className="font-bold text-white text-5xl">$10</CardDescription>
                <CardDescription>
                  Perfect for small teams or individuals looking to explore our chatbot solution and improve customer interaction.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mt-2">
                  <Check className="mr-2" />
                  <p>25 Active Chats</p>
                </div>
                <div className="flex items-center mt-2">
                  <Check className="mr-2" />
                  <p>500 AI Messages</p>
                </div>
                <div className="flex items-center mt-2">
                  <Check className="mr-2" />
                  <p>2 Team Members</p>
                </div>
                <Button className="w-full mt-4">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="max-w-1/3 mx-2">
              <CardHeader>
                <CardTitle className="font-bold text-2xl">Business Ready</CardTitle>
                <CardDescription className="font-bold text-white text-5xl">$50</CardDescription>
                <CardDescription>
                  Designed for growing businesses looking to scale their support with advanced AI-driven interactions and more flexibility.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mt-2">
                  <Check className="mr-2" />
                  <p>100 Active Chats</p>
                </div>
                <div className="flex items-center mt-2">
                  <Check className="mr-2" />
                  <p>5,000 AI Messages</p>
                </div>
                <div className="flex items-center mt-2">
                  <Check className="mr-2" />
                  <p>10 Team Members</p>
                </div>
                <Button className="w-full mt-4">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="max-w-1/3 mx-2">
              <CardHeader>
                <CardTitle className="font-bold text-2xl">Enterprise</CardTitle>
                <CardDescription className="font-bold text-white text-5xl">$200</CardDescription>
                <CardDescription>
                  Tailored for large-scale enterprises requiring unlimited access, high-performance AI, and dedicated support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mt-2">
                  <Check className="mr-2" />
                  <p>Unlimited Active Chats</p>
                </div>
                <div className="flex items-center mt-2">
                  <Check className="mr-2" />
                  <p>Unlimited AI Messages</p>
                </div>
                <div className="flex items-center mt-2">
                  <Check className="mr-2" />
                  <p>Unlimited Team Members</p>
                </div>
                <Button className="w-full mt-4">Get Started</Button>
              </CardContent>
            </Card>
          </div>
          </LampContainer>
        </div>
      </section>
    </main>
  );
}