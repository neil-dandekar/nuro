"use client";

import { Card } from "@/components/ui/card";
import { Course } from "@/lib/types";

export default function CourseResult({ course }: { course: Course }) {
    return (
        <div className="space-y-6 mt-8">
            <div>
                <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                <p className="text-muted-foreground">{course.description}</p>
            </div>

            {course.weeks?.map((week, idx) => (
                <Card key={idx} className="p-4 space-y-3">
                    <h3 className="text-xl font-semibold">
                        Week {week.week}: {week.title}
                    </h3>
                    <p>{week.description}</p>

                    <div>
                        <strong>Assignments:</strong>
                        <ul className="list-disc pl-5 mt-1">
                            {week.assignments?.map((a, i) => (
                                <li key={i}>{a}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <strong>Resources:</strong>
                        <ul className="list-disc pl-5 mt-1">
                            {week.resources?.map((r, i) => (
                                <li key={i}>
                                    <a
                                        href={r}
                                        className="text-blue-600 hover:underline"
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
