// app/page.tsx
import CourseForm from "../components/CourseForm";

export default function Home() {
    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-4 text-center">Nuro 📚</h1>
            <p className="text-center mb-8 text-muted-foreground">
                Instantly generate full project-based learning courses with AI.
            </p>
            <CourseForm />
        </main>
    );
}
