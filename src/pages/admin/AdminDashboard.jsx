import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockCourses } from "@/data/mockCourses";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const stats = [
    { icon: Users, label: "Total Students", value: "50,234", change: "+12.5%" },
    { icon: BookOpen, label: "Active Courses", value: "524", change: "+8.2%" },
    { icon: DollarSign, label: "Revenue (MTD)", value: "$125,430", change: "+15.3%" },
    { icon: TrendingUp, label: "Completion Rate", value: "87%", change: "+3.1%" },
  ];

  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 55000 },
    { month: "Jun", revenue: 67000 },
  ];

  const enrollmentData = [
    { month: "Jan", enrollments: 1200 },
    { month: "Feb", enrollments: 1500 },
    { month: "Mar", enrollments: 1300 },
    { month: "Apr", enrollments: 1800 },
    { month: "May", enrollments: 1600 },
    { month: "Jun", enrollments: 2100 },
  ];

  const recentUsers = [
    { name: "John Doe", email: "john@example.com", status: "Active", joined: "2024-03-15" },
    { name: "Jane Smith", email: "jane@example.com", status: "Active", joined: "2024-03-14" },
    { name: "Bob Johnson", email: "bob@example.com", status: "Inactive", joined: "2024-03-13" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your learning platform</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => alert('Add Course functionality would open a form here')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Student Enrollments</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrollments" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Tables */}
        <div className="space-y-6">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded ${activeTab === 'courses' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              onClick={() => setActiveTab('courses')}
            >
              Courses
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'analytics' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
          </div>

          {activeTab === 'courses' && (
            <div>
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Course Management</h3>
                  <Button size="sm" onClick={() => alert('Add Course functionality would open a form here')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </div>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Title</th>
                      <th className="border border-gray-300 px-4 py-2">Instructor</th>
                      <th className="border border-gray-300 px-4 py-2">Category</th>
                      <th className="border border-gray-300 px-4 py-2">Students</th>
                      <th className="border border-gray-300 px-4 py-2">Rating</th>
                      <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCourses.slice(0, 5).map((course) => (
                      <tr key={course.id}>
                        <td className="border border-gray-300 px-4 py-2 font-medium">{course.title}</td>
                        <td className="border border-gray-300 px-4 py-2">{course.instructor}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">{course.category}</span>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">{course.students}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex items-center gap-1">
                            {course.rating}
                            <span className="text-muted-foreground">/ 5</span>
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => alert(`Edit course: ${course.title}`)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => alert(`Delete course: ${course.title}?`)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">User Management</h3>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Name</th>
                      <th className="border border-gray-300 px-4 py-2">Email</th>
                      <th className="border border-gray-300 px-4 py-2">Status</th>
                      <th className="border border-gray-300 px-4 py-2">Joined</th>
                      <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2 font-medium">{user.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === "Active" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">{user.joined}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Button size="sm" variant="ghost" onClick={() => alert(`Manage user: ${user.name}`)}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Top Performing Courses</h3>
                  <div className="space-y-4">
                    {mockCourses.slice(0, 5).map((course, index) => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-muted-foreground">#{index + 1}</span>
                          <div>
                            <p className="font-medium text-sm">{course.title}</p>
                            <p className="text-xs text-muted-foreground">{course.students} students</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">{course.rating}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Platform Insights</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm">Average Course Completion</span>
                      <span className="font-semibold">87%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm">Student Satisfaction</span>
                      <span className="font-semibold">4.7/5</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm">Active Monthly Users</span>
                      <span className="font-semibold">32,450</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span className="text-sm">Total Hours Watched</span>
                      <span className="font-semibold">125,890h</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
