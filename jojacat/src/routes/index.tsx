import ThemeToggle from '#/components/ThemeToggle'
import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const { data: session, isPending } = authClient.useSession()

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    })
  }

  const handleSignOut = async () => {
    await authClient.signOut()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <main className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Joja Cat
          </h1>
          <p className="mt-2 text-muted-foreground">
            Welcome to the future of Joja.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          {isPending ? (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span>Checking session...</span>
            </div>
          ) : session ? (
            <div className="flex w-full flex-col items-center space-y-6">
              <div className="flex flex-col items-center space-y-2">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="h-20 w-20 rounded-full border-2 border-primary shadow-lg"
                  />
                )}
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-foreground">
                    {session.user.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full transition-all hover:bg-destructive hover:text-white"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <Button
                onClick={handleSignIn}
                className="flex w-full items-center justify-center space-x-2 py-6 text-lg font-medium shadow-lg hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0"
              >
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                <span>Sign in with Google</span>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
