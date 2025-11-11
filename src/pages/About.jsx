import { Card } from "@/components/ui/card";
import { Target, Users, Award, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To make quality education accessible to everyone, everywhere, at any time.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a supportive learning community where students and instructors thrive together.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering the highest quality courses taught by industry-leading experts.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Constantly evolving our platform with cutting-edge technology and teaching methods.",
    },
  ];

  const stats = [
    { value: "50,000+", label: "Active Students" },
    { value: "500+", label: "Expert Instructors" },
    { value: "1,000+", label: "Courses Available" },
    { value: "95%", label: "Success Rate" },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">About EduLearn</h1>
          <p className="text-lg text-muted-foreground">
            We're on a mission to transform education through innovative online learning 
            experiences that empower individuals to achieve their full potential.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center space-y-2">
              <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto space-y-8 mb-16">
          <Card className="p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2025, EduLearn emerged from a simple yet powerful idea: quality 
                education should be accessible to everyone, regardless of their location or 
                circumstances. Our founders, a group of educators and technologists, recognized 
                the transformative power of online learning and set out to create a platform 
                that would revolutionize education.
              </p>
              <p>
                Today, we serve over 50,000 students worldwide, offering courses in technology, 
                business, design, and more. Our platform connects learners with industry-leading 
                experts who bring real-world experience and passion for teaching into every course.
              </p>
              <p>
                We believe that learning is a lifelong journey, and we're committed to providing 
                the tools, resources, and support needed to help our students succeed at every 
                step of their educational path.
              </p>
            </div>
          </Card>
        </div>

        {/* Values */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape the learning experience we provide
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dedicated professionals working together to revolutionize online education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO & Co-Founder" },
              { name: "Michael Chen", role: "CTO & Co-Founder" },
              { name: "Emily Rodriguez", role: "Head of Curriculum" },
            ].map((member, index) => (
              <Card key={index} className="p-6 text-center space-y-4">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto"
                />
                <div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
