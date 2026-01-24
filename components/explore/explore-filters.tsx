"use client"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ExploreFilters() {
    return (
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <Tabs defaultValue="all" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="ui-ux">UI/UX</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                    <TabsTrigger value="illustration">Illustration</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="flex items-center space-x-2">
                <Select defaultValue="popular">
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="popular">Popular</SelectItem>
                        <SelectItem value="recent">New & Noteworthy</SelectItem>
                        <SelectItem value="viewed">Most Viewed</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">Filters</Button>
            </div>
        </div>
    )
}
