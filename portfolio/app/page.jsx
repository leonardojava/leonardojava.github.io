"use client"
import GradientDescent from "@/components/GradientDescent";
import Project from "@/components/Project"
import SocialMediaButton from "@/components/SocialMediaButton";
import { useState, useEffect, useRef } from 'react';
import {ReactSocialMediaIcons} from 'react-social-media-icons';
import { motion } from "motion/react"

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans text-white text-shadow-lg/30">
      
      <GradientDescent />
      
        <div className="flex flex-col items-center text-center my-30 relative z-10">
              <motion.div
              initial={{ opacity: 0, y: 0}}
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 3, ease: "easeOut" }}
              className="flex flex-col items-center text-center relative z-10"
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Leonardo Vo</h1>
                <p className="text-xl md:text-2xl mb-8">Computer Science Student</p>

                <div
                className="border-2 border-[#00000040] bg-[#0c1244cc] my-5 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-[0_0_15px_rgba(65,184,255,0.8)] transition-shadow"
                >
                <a
                  href="ldvoresume.pdf"
                  target="_blank"
                  className="text-lg font-semibold"
                >
                  Resume
                </a>
                </div>

                <div className="flex gap-4">
                  <div className="hover:shadow-[0_0_15px_rgba(65,184,255,0.8)] transition-shadow">
                    <ReactSocialMediaIcons
                      borderColor="rgba(0,0,0,0.25)"
                      icon="github"
                      iconColor="rgba(255,255,255,1)"
                      backgroundColor="rgba(12, 18, 68, 0.8)"
                      url="https://www.kaggle.com/code/leonardovo/digits"
                      size="58"
                    />
                  </div>
                  <div className="hover:shadow-[0_0_15px_rgba(65,184,255,0.8)] transition-shadow">
                    <ReactSocialMediaIcons
                      borderColor="rgba(0,0,0,0.25)"
                      icon="linkedin"
                      iconColor="rgba(255,255,255,1)"
                      backgroundColor="rgba(12, 18, 68, 0.8)"
                      url="https://www.linkedin.com/in/leonardo-vo-761845294/"
                      size="58"
                    />
                  </div>
                  <div className="hover:shadow-[0_0_15px_rgba(65,184,255,0.8)] transition-shadow">
                    <ReactSocialMediaIcons
                      borderColor="rgba(0,0,0,0.25)"
                      icon="mail"
                      iconColor="rgba(255,255,255,1)"
                      backgroundColor="rgba(12, 18, 68, 0.8)"
                      url="mailto:leonardo11907vo@gmail.com/"
                      size="58"
                    />
                  </div>
                </div>

              </motion.div>
              
              <motion.div 
              className="my-40 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 2, ease: "easeOut" }}>
                <h2 className="text-3xl font-bold mb-6 text-left">About Me</h2>
                <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg border-3 border-[#00000040]">
                  <p className="mb-4 text-left">
                    I'm a Computer Science student who just recently commited to UC Santa Cruz. If it isn't clear, I find computer science and math very interesting. With Machine learning
                    being that cool combo of the two I've been spending a lot of time studying it.
                  </p>
                </div>
              </motion.div>

              <motion.div 
              className="my-20"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 2, ease: "easeOut" }}>
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
              </motion.div>
        </div>

      
    </div>

    
  );
}
