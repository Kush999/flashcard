import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();
  
  // Redirect signed-in users to dashboard
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
      <main className="flex flex-col items-center space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground">
            FlashCards
          </h1>
          <h2 className="text-2xl text-muted-foreground">
            Your personal flashcard app
          </h2>
        </div>
        
        <div className="flex gap-4 mt-8">
          <SignInButton>
            <Button size="lg" variant="default">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button size="lg" variant="outline">
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </main>
    </div>
  );
}