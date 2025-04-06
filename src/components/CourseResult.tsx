"use client";

import { Card } from "@/components/ui/card";
import { Course } from "@/lib/types";

export default function CourseResult({ course }: { course: Course }) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">{course.title}</h2>
                <p className="text-muted-foreground">{course.description}</p>
            </div>

            {course.weeks?.map((week, idx) => (
                <Card key={idx} className="p-4 space-y-2">
                    <h3 className="text-xl font-semibold">
                        Week {week.week}: {week.title}
                    </h3>
                    <p>{week.description}</p>

                    <div>
                        <strong>Assignments:</strong>
                        <ul className="list-disc pl-5">
                            {week.assignments?.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <strong>Resources:</strong>
                        <ul className="list-disc pl-5">
                            {week.resources?.map((r, i) => (
                                <li key={i}>
                                    <a
                                        href={r}
                                        className="text-blue-600 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {r}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            ))}
        </div>
    );
}
