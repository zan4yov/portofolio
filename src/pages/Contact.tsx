import { useState } from "react"
import { Check, Copy, Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import PageSection from "@/components/PageSection"
import Reveal from "@/components/Reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { personalInfo, socialLinks } from "@/data/portfolio-data"

const SOCIALS = [
  { href: socialLinks.github, label: "GitHub", handle: "zan4yov", icon: Github },
  { href: socialLinks.linkedin, label: "LinkedIn", handle: "Razan Reswara", icon: Linkedin },
  { href: socialLinks.twitter, label: "Twitter", handle: "@zan4yov", icon: Twitter },
  { href: socialLinks.instagram, label: "Instagram", handle: "@razanvvr", icon: Instagram },
]

const FIELD_LABEL = "mb-2 block text-sm font-medium text-ink"

export default function Contact() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  /**
   * There is no backend behind this site, so the form does the honest thing:
   * it composes the message and hands it to the reader own email client.
   * Nothing is claimed to have been sent, because nothing has been.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const subject = String(data.get("subject") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    const body = [message, "", "--", name, email].join("\n")
    const href =
      "mailto:" +
      personalInfo.email +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body)

    window.location.href = href
    toast({
      title: "Draft ready",
      description: "Your email app should open with the message filled in.",
    })
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({
        title: "Could not copy",
        description: "Copy the address manually: " + personalInfo.email,
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="container">
        <PageHeader
          title="Contact"
          lead="Internships, junior roles or a question about something I built. Email is the surest way to reach me."
        />
      </div>

      <PageSection>
        <div className="grid gap-12 md:grid-cols-12 lg:gap-16">
          <Reveal className="md:col-span-7">
            <h2 className="text-heading font-semibold text-ink">Write a message</h2>
            <p className="measure mt-3 text-lead text-ink-dim">
              This fills in a draft in your own email app. Nothing is sent until you send it.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={FIELD_LABEL}>
                    Your name
                  </label>
                  <Input id="name" name="name" autoComplete="name" required />
                </div>
                <div>
                  <label htmlFor="email" className={FIELD_LABEL}>
                    Your email
                  </label>
                  <Input id="email" name="email" type="email" autoComplete="email" required />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={FIELD_LABEL}>
                  Subject
                </label>
                <Input id="subject" name="subject" required />
              </div>

              <div>
                <label htmlFor="message" className={FIELD_LABEL}>
                  Message
                </label>
                <Textarea id="message" name="message" rows={7} required className="resize-y" />
              </div>

              <Button type="submit" size="lg">
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                Open draft in email app
              </Button>
            </form>
          </Reveal>

          <Reveal className="md:col-span-5" delay={80}>
            <h2 className="text-heading font-semibold text-ink">Or reach me directly</h2>

            <div className="mt-8 border-t border-hairline pt-6">
              <p className="text-sm text-ink-faint">Email</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href={"mailto:" + personalInfo.email}
                  className="text-lead font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-base ease-out hover:decoration-primary"
                >
                  {personalInfo.email}
                </a>
                <Button type="button" variant="outline" size="sm" onClick={copyEmail}>
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <ul className="mt-8 divide-y divide-hairline border-t border-hairline">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-4 transition-colors duration-base ease-out"
                  >
                    <social.icon
                      className="h-[1.1rem] w-[1.1rem] shrink-0 text-ink-dim transition-colors duration-base ease-out group-hover:text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-ink transition-colors duration-base ease-out group-hover:text-primary">
                      {social.label}
                    </span>
                    <span className="data ml-auto text-ink-faint">{social.handle}</span>
                    <span className="sr-only">, opens in a new tab</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-2.5 border-t border-hairline pt-6 text-sm text-ink-dim">
              <span aria-hidden="true" className="relative grid h-2.5 w-2.5 place-items-center">
                <span className="absolute inset-0 animate-pulse-soft rounded-full bg-secondary/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              </span>
              {personalInfo.availability}
            </div>
          </Reveal>
        </div>
      </PageSection>
    </>
  )
}
