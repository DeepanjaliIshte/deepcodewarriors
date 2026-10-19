"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  language: string
  code: string
  output?: string
}

export function CodeBlock({ language, code, output }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-border/50 bg-[#0d1117]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-white/10">
        <span className="text-xs font-mono text-muted-foreground uppercase">{language}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 text-muted-foreground hover:text-foreground"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
      
      {/* Code Area */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed text-blue-300">
          <code>{code}</code>
        </pre>
      </div>

      {/* Optional Output Area */}
      {output && (
        <div className="border-t border-white/10 bg-[#0d1117] p-4">
          <div className="text-xs font-mono text-muted-foreground mb-2 uppercase">Output</div>
          <pre className="text-sm font-mono text-green-400">
            <code>{output}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
