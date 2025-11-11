import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockCourses } from "@/data/mockCourses";
import {
  Clock,
  Users,
  Star,
  Award,
  BookOpen,
  PlayCircle,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
          <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    navigate(`/payment/${id}`);
  };

  const courseModules = [
    { title: "Introduction to the Course", lessons: 5, duration: "45 min" },
    { title: "Getting Started", lessons: 8, duration: "1h 30min" },
    { title: "Core Concepts", lessons: 12, duration: "2h 15min" },
    { title: "Advanced Topics", lessons: 10, duration: "1h 45min" },
    { title: "Project Work", lessons: 6, duration: "2h" },
    { title: "Final Assessment", lessons: 3, duration: "1h" },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container px-4">
        {/* Course Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground mb-4">{course.category}</span>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground">{course.description}</p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-muted-foreground">({course.students} ratings)</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>{course.students}+ students</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <span>{course.lessons} lessons</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`}
                alt={course.instructor}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="text-sm text-muted-foreground">Instructor</p>
                <p className="font-semibold">{course.instructor}</p>
              </div>
            </div>
          </div>

          {/* Enrollment Card */}
          <Card className="p-6 h-fit space-y-6 sticky top-24">
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-3xl font-bold text-primary mb-2">${course.price}</p>
              <p className="text-sm text-muted-foreground">One-time payment • Lifetime access</p>
            </div>

            <Button className="w-full btn-hero" onClick={handleEnroll}>
              Enroll Now
            </Button>

            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-semibold">This course includes:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Lifetime access to course materials</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Downloadable resources</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Access on mobile and desktop</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>30-day money-back guarantee</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Course Content */}
        <div className="space-y-6">
          <div className="flex space-x-4 mb-6">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded">Overview</button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded">Curriculum</button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded">Instructor</button>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Master the fundamentals and advanced concepts",
                  "Build real-world projects from scratch",
                  "Best practices and industry standards",
                  "Problem-solving and debugging techniques",
                  "Optimize performance and scalability",
                  "Prepare for professional certifications",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>Basic computer skills and internet access</li>
                <li>Willingness to learn and practice regularly</li>
                <li>No prior experience required for beginner courses</li>
              </ul>
            </Card>
          </div>

          <div className="space-y-4">
            {courseModules.map((module, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">
                    Module {index + 1}: {module.title}
                  </h3>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                    {module.lessons} lessons • {module.duration}
                  </span>
                </div>
                <div className="space-y-2">
                  {Array.from({ length: module.lessons }).map((_, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <PlayCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Lesson {lessonIndex + 1}</span>
                      <span className="text-sm text-muted-foreground ml-auto">
                        {5 + lessonIndex * 2} min
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div>
            <Card className="p-6">
              <div className="flex items-start gap-6">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`}
                  alt={course.instructor}
                  className="h-24 w-24 rounded-full"
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold">{course.instructor}</h2>
                    <p className="text-muted-foreground">
                      Senior {course.category} Expert
                    </p>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      <span>4.8 Instructor Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>45,000+ Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-4 w-4" />
                      <span>15 Courses</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {course.instructor} is a renowned expert in {course.category} with over 10 years 
                    of industry experience. They have worked with leading tech companies and trained 
                    thousands of students worldwide. Their teaching approach focuses on practical, 
                    real-world applications and hands-on learning.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
