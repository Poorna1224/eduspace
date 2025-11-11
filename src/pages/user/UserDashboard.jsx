import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockCourses } from "@/data/mockCourses";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  PlayCircle,
  Calendar,
  User,
  Settings,
} from "lucide-react";

const UserDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const enrolledIds = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const courses = mockCourses.filter(course => enrolledIds.includes(course.id)).map(course => ({
      ...course,
      enrolled: true,
      progress: Math.floor(Math.random() * 100) // Mock progress
    }));
    setEnrolledCourses(courses);
  }, []);

  const stats = [
    { icon: BookOpen, label: "Enrolled Courses", value: enrolledCourses.length },
    { icon: Award, label: "Certificates", value: 2 },
    { icon: Clock, label: "Hours Learned", value: "48h" },
    { icon: TrendingUp, label: "Progress", value: "65%" },
  ];

  const recentActivity = [
    { course: "Complete Web Development", action: "Completed Module 3", time: "2 hours ago" },
    { course: "Python for Data Science", action: "Started Module 5", time: "1 day ago" },
    { course: "UI/UX Design", action: "Completed Quiz", time: "3 days ago" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Student!</h1>
            <p className="text-muted-foreground">Continue your learning journey</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        </div>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {Math.floor((course.progress / 100) * course.lessons)} of {course.lessons} lessons
                        </p>
                        <Link to={`/courses/${course.id}`}>
                          <Button size="sm" variant="outline">
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Continue
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Certificates */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">My Certificates</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <Award className="h-8 w-8 text-accent" />
                  <div>
                    <h3 className="font-semibold">Web Development Certificate</h3>
                    <p className="text-sm text-muted-foreground">Completed: Jan 2024</p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Download
                  </Button>
                </div>
                <div className="border rounded-lg p-4 space-y-3">
                  <Award className="h-8 w-8 text-accent" />
                  <div>
                    <h3 className="font-semibold">Data Science Certificate</h3>
                    <p className="text-sm text-muted-foreground">Completed: Feb 2024</p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/courses" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  My Certificates
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="pb-3 border-b last:border-0">
                    <p className="text-sm font-medium">{activity.course}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommended */}
            <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/10 to-secondary/10">
              <h3 className="font-semibold">Recommended for You</h3>
              <div>
                <h4 className="font-medium text-sm mb-1">Mobile App Development</h4>
                <p className="text-xs text-muted-foreground mb-3">Based on your interests</p>
                <Link to="/courses/4">
                  <Button size="sm" variant="default" className="w-full">
                    View Course
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
