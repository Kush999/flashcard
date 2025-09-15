import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
      <main className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-4xl font-bold text-foreground">
          Welcome to Your Flashcards App
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          shadcn/ui has been successfully installed! This is a demonstration of the Button component.
        </p>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        
        <div className="flex gap-4 flex-wrap justify-center mt-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🔥</Button>
        </div>
        
        <div className="mt-8 p-6 border rounded-lg bg-card text-card-foreground">
          <h2 className="text-xl font-semibold mb-4">Next Steps:</h2>
          <ul className="text-left space-y-2 text-sm">
            <li>• Browse available components: <code className="bg-muted px-1 py-0.5 rounded">npx shadcn@latest add [component]</code></li>
            <li>• Check the documentation: <a href="https://ui.shadcn.com" className="text-primary hover:underline">ui.shadcn.com</a></li>
            <li>• Start building your flashcards interface!</li>
          </ul>
        </div>
      </main>
    </div>
  );
}