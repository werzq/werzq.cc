import { Fira_Code, Playfair_Display } from 'next/font/google'
import './globals.css'

const firaCode = Fira_Code({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={firaCode.className}>
      <body className="min-h-screen bg-background font-mono antialiased select-none scroll-hidden">
        {children}
      </body>
    </html>
  )
}

export { playfair }

