"use client"
import GradientDescent from "@/components/GradientDescent";
import Project from "@/components/Project"
import SocialMediaButton from "@/components/SocialMediaButton";
import { useState, useEffect, useRef } from 'react';
import {ReactSocialMediaIcons} from 'react-social-media-icons';



export default function Home() {
  return (
    <div className="relative min-h-screen font-sans text-white">
      
      <GradientDescent />
      
        <div className="flex flex-col items-center text-center my-30 relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Leonardo Vo</h1>
              <p className="text-xl md:text-2xl mb-8">Computer Science Student</p>
              
              <div className = "flex gap-4">
              <ReactSocialMediaIcons borderColor="rgba(0,0,0,0.25)" icon="github" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(12, 18, 68, 0.8)" url="https://github.com/leonardojava" size="58" />
              <ReactSocialMediaIcons borderColor="rgba(0,0,0,0.25)" icon="linkedin" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(12, 18, 68, 0.8)" url="https://www.linkedin.com/in/leonardo-vo-761845294/" size="58" />
              <ReactSocialMediaIcons borderColor="rgba(0,0,0,0.25)" icon="mail" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(12, 18, 68, 0.8)" url="mailto:leonardo11907vo@gmail.com/" size="58" />
              </div>
              <div className="my-40 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-left">About Me</h2>
                <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg">
                  <p className="mb-4 text-left">
                    I'm a Computer Science student who just recently commited to UC Santa Cruz. If it isn't clear, I find computer science and math very interesting. With Machine learning
                    being that cool combo of the two I've been spending a lot of time studying it.
                  </p>
                </div>
              </div>

              <div className="my-20">
                  <h2 className="text-3xl font-bold mb-6 text-left">Projects</h2>
                  <div className="grid grid-cols-1 gap-6">
                      <Project
                        title="Hand Written Digit Classifier" 
                        description="A neural network I built using Python and NumPy. It classifies hand drawn images of digits from MSINT data set."
                        link="https://github.com/leonardojava/digpy"
                      />
                      <Project
                        title="Rate my Cascade" 
                        description="Basic full stack web app I built using Nextjs. Literally a clone of Rate my professor but for my high school lol. Lets users create email verified accounts to read/write reviews for teachers."
                        link="https://github.com/leonardojava/ratemycascade"
                      />
                      <Project
                        title="My Malloc" 
                        description="My own implementation of malloc(). I dynamically request memory from OS using VirtualAlloc() 
                                    and manage it using a free list. It kind of has a garbage collector too which is cool."
                        link="https://github.com/leonardojava/heap_alloc"
                      />
                      
                  </div>
              </div>
        </div>

      
    </div>

    
  );
}
