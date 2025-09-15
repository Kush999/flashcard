import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { decksTable, cardsTable } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, Calendar } from "lucide-react";
import { CreateDeckButton } from "./create-deck-button";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  // Fetch user's decks with card counts
  const userDecks = await db
    .select({
      id: decksTable.id,
      name: decksTable.name,
      description: decksTable.description,
      category: decksTable.category,
      createdAt: decksTable.createdAt,
      cardCount: count(cardsTable.id),
    })
    .from(decksTable)
    .leftJoin(cardsTable, eq(decksTable.id, cardsTable.deckId))
    .where(eq(decksTable.userId, userId))
    .groupBy(decksTable.id, decksTable.name, decksTable.description, decksTable.category, decksTable.createdAt)
    .orderBy(decksTable.createdAt);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your flashcard decks and track your learning progress
            </p>
          </div>
          <CreateDeckButton />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Decks</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userDecks.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userDecks.reduce((total, deck) => total + Number(deck.cardCount), 0)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(userDecks.map(deck => deck.category).filter(Boolean)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Decks Grid */}
        {userDecks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userDecks.map((deck) => (
              <Card key={deck.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{deck.name}</CardTitle>
                      {deck.category && (
                        <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full mt-2">
                          {deck.category}
                        </span>
                      )}
                    </div>
                  </div>
                  {deck.description && (
                    <CardDescription className="mt-2">
                      {deck.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{deck.cardCount} cards</span>
                    <span>Created {formatDate(deck.createdAt)}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="default" size="sm" className="flex-1">
                      Study
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No decks yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Get started by creating your first flashcard deck. Perfect for learning languages, studying, or memorizing facts!
            </p>
            <CreateDeckButton>
              Create Your First Deck
            </CreateDeckButton>
          </div>
        )}
      </div>
  );
}
