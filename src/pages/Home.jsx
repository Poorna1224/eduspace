import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CourseCard from "@/components/courses/CourseCard";
import { mockCourses } from "@/data/mockCourses";
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  Play, 
  CheckCircle,
  Star
} from "lucide-react";

const Home = () => {
  const featuredCourses = mockCourses.slice(0, 3);

  const stats = [
    { icon: BookOpen, label: "Courses", value: "500+" },
    { icon: Users, label: "Students", value: "50K+" },
    { icon: Award, label: "Certificates", value: "30K+" },
    { icon: TrendingUp, label: "Success Rate", value: "95%" },
  ];

  const features = [
    {
      icon: Play,
      title: "Learn at Your Pace",
      description: "Access courses 24/7 and learn on your schedule with lifetime access.",
    },
    {
      icon: Award,
      title: "Get Certified",
      description: "Earn industry-recognized certificates upon course completion.",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience.",
    },
    {
      icon: CheckCircle,
      title: "Practical Projects",
      description: "Build real-world projects to showcase in your portfolio.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-background -z-10" />
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Online Learning Management System with
              <span className="gradient-text block">Quality Education</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Access world-class courses from industry experts. Learn new skills, advance your career, 
              and achieve your goals with our comprehensive learning platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="btn-hero">
                  Explore Courses
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-2">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <stat.icon className="h-8 w-8 mx-auto text-primary" />
                <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose EduLearn?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 space-y-4 card-hover">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Courses</h2>
              <p className="text-muted-foreground">Start learning with our most popular courses</p>
            </div>
            <Link to="/courses">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4">
          <Card className="p-12 text-center space-y-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Learning?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students already learning on EduLearn. Get started today with our free trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="btn-hero">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
