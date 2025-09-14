import Link from "next/link"
import { Code, Mail, MessageSquare, Github, Linkedin, ExternalLink } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Learn: [
      { name: "Tutorials", href: "/tutorials" },
      { name: "Programs", href: "/programs" },
      { name: "Notes", href: "/notes" },
      { name: "Interview Prep", href: "/interview-prep" },
    ],
    Resources: [
      { name: "Java Basics", href: "/tutorials" },
      { name: "OOP Concepts", href: "/tutorials" },
      { name: "Advanced Topics", href: "/tutorials" },
      { name: "Best Practices", href: "/notes" },
    ],
    Connect: [
      { name: "Email", href: "mailto:deepcodewarriors@gmail.com", icon: Mail },
      { name: "WhatsApp", href: "https://whatsapp.com/channel/0029Vb6lj0W30LKXRWJJ8v1T", icon: MessageSquare },
      { name: "GitHub", href: "https://github.com/DeepanjaliIshte", icon: Github },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/deepanjali-ishte-071691201", icon: Linkedin },
    ],
  }

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Deep Code Warriors</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Empowering students with comprehensive Java programming resources, tutorials, and interview preparation
              materials.
            </p>
            <p className="text-sm text-muted-foreground">
              Created by <span className="font-semibold text-foreground">Deepanjali Ishte</span>
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {"icon" in link && <link.icon className="w-4 h-4" />}
                      {link.name}
                      {link.href.startsWith("http") && <ExternalLink className="w-3 h-3" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© {currentYear} Deep Code Warriors. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link
                href="https://drive.google.com/drive/folders/1KGSBa9CjadZzYft4EovNmoSmyqjmq5or?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Study Drive
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
