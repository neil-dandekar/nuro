export interface Course {
    title: string;
    description: string;
    weeks: {
        week: number;
        title: string;
        description: string;
        assignments: string[];
        resources: string[];
    }[];
}
