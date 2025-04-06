"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CourseResult from "./CourseResult";
import { Course } from "@/lib/types";

export default function CourseForm() {
    const [topic, setTopic] = useState("");
    const [duration, setDuration] = useState(4);
    const [level, setLevel] = useState("beginner");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Course | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const res = await fetch("api/generate-course", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic, duration, level }),
            });

            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error("Error generating course:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <div>
                    <Label htmlFor="topic">What do you want to learn?</Label>
                    <Input
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Build a startup, Game AI..."
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="duration">Duration (weeks)</Label>
                    <Input
                        id="duration"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        min={1}
                        max={52}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="level">Skill Level</Label>
                    <Input
                        id="level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        placeholder="beginner / intermediate / advanced"
                        required
                    />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Generating..." : "Generate Course"}
                </Button>
            </form>

            {result && <CourseResult course={result} />}
        </>
    );
}
