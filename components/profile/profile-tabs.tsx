"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FeedContainer } from "@/components/feed/feed-container"

export function ProfileTabs() {
    return (
        <Tabs defaultValue="work" className="w-full">
            <div className="container px-4 border-b">
                <TabsList className="bg-transparent h-12 w-full justify-start space-x-6 rounded-none p-0">
                    <TabsTrigger value="work" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 pt-2 font-medium">Work</TabsTrigger>
                    <TabsTrigger value="projects" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 pt-2 font-medium">Projects</TabsTrigger>
                    <TabsTrigger value="collections" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 pt-2 font-medium">Collections</TabsTrigger>
                    <TabsTrigger value="liked" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 pt-2 font-medium">Liked Shots</TabsTrigger>
                    <TabsTrigger value="about" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3 pt-2 font-medium">About</TabsTrigger>
                </TabsList>
            </div>

            <div className="container px-4 py-8">
                <TabsContent value="work" className="mt-0">
                    <FeedContainer />
                </TabsContent>
                <TabsContent value="projects" className="mt-0">
                    <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">No projects to show</div>
                </TabsContent>
                <TabsContent value="collections" className="mt-0">
                    <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">No collections to show</div>
                </TabsContent>
                <TabsContent value="liked" className="mt-0">
                    <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">No liked shots yet</div>
                </TabsContent>
                <TabsContent value="about" className="mt-0">
                    <div className="max-w-2xl">
                        <h3 className="text-lg font-bold mb-4">About Me</h3>
                        <p className="text-muted-foreground">Detailed bio and resume information would go here.</p>
                    </div>
                </TabsContent>
            </div>
        </Tabs>
    )
}
