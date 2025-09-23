import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('about')
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const welcomeText = "Welcome dear voyager~"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < welcomeText.length) {
        setDisplayText(welcomeText.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const asciiArt = `
       ██████ ██   ██ ███    ██ ██████  ██████   █████  ██████  ██    ██ ███████ ███████ ██    ██ ██   ██ ███████ 
      ██      ██   ██ ████   ██ ██   ██ ██   ██ ██   ██ ██   ██  ██  ██  ██      ██      ██    ██  ██ ██  ██      
      ██      ███████ ██ ██  ██ ██   ██ ██████  ███████ ██████    ████   ███████ ███████ ██    ██   ███   ███████ 
      ██      ██   ██ ██  ██ ██ ██   ██ ██   ██ ██   ██ ██   ██    ██         ██      ██ ██    ██  ██ ██       ██ 
       ██████ ██   ██ ██   ████ ██████  ██   ██ ██   ██ ██████     ██    ███████ ███████  ██████  ██   ██ ███████                                                                                                                                               
  `

  const portfolioData = {
    about: {
      title: "About Me",
      content: `
System Information:
==================
Name: Chandra D.P.
Role: Graphic Designer, IT Student
Status: Available for freelance projects
Location: Jawa Barat, Indonesia
Experience: 2 Months in digital design

Bio:
----
Passionate graphic designer specializing in brand identity, 
digital illustrations, and user interface design. I combine 
technical expertise with creative vision to deliver compelling 
visual solutions that resonate with target audiences.

My approach blends traditional design principles with modern 
digital techniques, creating memorable experiences across 
print and digital media.
      `
    },
    skills: {
      title: "Technical Skills",
      content: `
Design Software:
================
> IbisPaint     [████████████████████] 95%

Language
============
> Indonesian                 [██████████████████  ] 90%
> English                    [████████████████    ] 80%

Specializations:
================
• Brand Identity Design
• Logo & Icon Design
• Web UI/UX Design
• Print Design
• Digital Illustrations
• Motion Graphics
• Typography
• Color Theory
      `
    },
    projects: {
      title: "Featured Projects",
      content: `
Project Repository:
===================

[01] None
     ├── Client: TBD
     ├── Type: TBD
     ├── Tools: TBD
     ├── Year: TBD
     └── Status: TBD
      `
    },
    contact: {
      title: "Contact Information",
      content: `
Connection Protocols:
=====================

Email:        abyssuxs@gmail.com
LinkedIn:     /in/chandradwipurwanto/
Instagram:    @chndrabyssuxs

Availability:
=============
Status:       ONLINE
Response:     < 24 hours
Timezone:     WIB (UTC+7)

Services Available:
===================
• Brand Identity Design
• Logo & Visual Identity
• Web Design & Development
• Print Design
• Digital Illustrations
• Consultation & Strategy

Ready to collaborate? Send a message!
      `
    }
  }

  const navigationItems = [
    { id: 'about', label: 'about.txt', command: 'cat about.txt' },
    { id: 'skills', label: 'skills.log', command: 'cat skills.log' },
    { id: 'projects', label: 'projects.dir', command: 'ls projects/' },
    { id: 'contact', label: 'contact.info', command: 'cat contact.info' }
  ]

  return (
    <div className="terminal-container">
      <div className="crt-screen">
        {/* Terminal Header */}
        <div className="terminal-section">
          <div className="ascii-art terminal-bright">
            {asciiArt}
          </div>
          <div className="terminal-glow" style={{ fontSize: '1.2rem', marginTop: '20px' }}>
            {displayText}
            {isTyping && <span className="cursor">_</span>}
          </div>
        </div>

        {/* System Info */}
        <div className="terminal-section">
          <div className="terminal-prompt">system --info</div>
          <div className="terminal-dim">
            Terminal Portfolio v2.1.0<br/>
            Last login: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}<br/>
            User: guest@portfolio:~$
          </div>
        </div>

        {/* Navigation */}
        <div className="terminal-section">
          <div className="terminal-prompt">ls -la</div>
          <div className="terminal-nav">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`terminal-nav-item ${currentSection === item.id ? 'active' : ''}`}
                onClick={() => setCurrentSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Current Command */}
        <div className="terminal-section">
          <div className="terminal-prompt">
            {navigationItems.find(item => item.id === currentSection)?.command}
          </div>
        </div>

        {/* Content Display */}
        <div className="terminal-section">
          <h2 className="terminal-bright">{portfolioData[currentSection].title}</h2>
          <pre className="terminal-text" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
            {portfolioData[currentSection].content}
          </pre>
        </div>

        {/* Interactive Contact Form (only shown in contact section) */}
        {currentSection === 'contact' && (
          <div className="terminal-section">
            <div className="terminal-prompt">compose --message</div>
            <form className="mt-4">
              <div className="mb-3">
                <label className="terminal-amber block mb-1">Name:</label>
                <input 
                  type="text" 
                  className="terminal-input" 
                  placeholder="Enter your name..."
                />
              </div>
              <div className="mb-3">
                <label className="terminal-amber block mb-1">Email:</label>
                <input 
                  type="email" 
                  className="terminal-input" 
                  placeholder="your.email@domain.com"
                />
              </div>
              <div className="mb-3">
                <label className="terminal-amber block mb-1">Message:</label>
                <textarea 
                  className="terminal-input" 
                  rows="4" 
                  placeholder="Type your message here..."
                  style={{ resize: 'vertical' }}
                ></textarea>
              </div>
              <button type="submit" className="terminal-button">
                send --message
              </button>
            </form>
          </div>
        )}

        {/* Footer */}
        <div className="terminal-section">
          <div className="terminal-dim" style={{ textAlign: 'center', marginTop: '40px' }}>
            ┌─────────────────────────────────────────────────────────────┐<br/>
            │ © 2025 ABYSSUXS     •     Built with React & Terminal UI    │<br/>
            └─────────────────────────────────────────────────────────────┘
          </div>
        </div>

        {/* Blinking Cursor at bottom */}
        <div className="terminal-section">
          <span className="terminal-prompt">guest@portfolio:~$ </span>
          <span className="cursor">_</span>
        </div>
      </div>
    </div>
  )
}

export default App

