"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CourseForm() {
    const [topic, setTopic] = useState("");
    const [duration, setDuration] = useState(4);
    const [level, setLevel] = useState("beginner");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Generating course:", { topic, duration, level });
        // TODO: call backend API and store result
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="topic">What do you want to learn?</Label>
                <Input
                    id="topic"
                    placeholder="e.g. Machine Learning, EV design..."
                    value={topic}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTopic(e.target.value)
                    }
                    required
                />
            </div>

            <div>
                <Label htmlFor="duration">Duration (weeks)</Label>
                <Input
                    id="duration"
                    type="number"
                    min={1}
                    max={52}
                    value={duration}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDuration(Number(e.target.value))
                    }
                    required
                />
            </div>

            <div>
                <Label htmlFor="level">Skill Level</Label>
                <Input
                    id="level"
                    placeholder="beginner / intermediate / advanced"
                    value={level}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setLevel(e.target.value)
                    }
                    required
                />
            </div>

            <Button type="submit" className="w-full">
                Generate Course
            </Button>
        </form>
    );
}
