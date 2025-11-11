import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { BookOpen, Shield } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("AdminLogin: handleSubmit called with formData:", formData);

    if (validateForm()) {
      console.log("AdminLogin: Validation passed, attempting login");
      console.log("AdminLogin: Attempting login with:", { email: formData.email, role: "admin" });
      try {
        const result = await login(formData.email, formData.password, "admin");
        console.log("AdminLogin: Login result:", result);
        toast.success("Admin login successful!");
        console.log("AdminLogin: About to navigate to /admin/dashboard");
        console.log("AdminLogin: Current location before navigation:", window.location.pathname);
        navigate("/admin/dashboard");
        console.log("AdminLogin: Navigation called, current location after:", window.location.pathname);
      } catch (error) {
        console.log("AdminLogin: Login failed with error:", error);
        toast.error("Admin login failed. Please check your credentials.");
      }
    } else {
      console.log("AdminLogin: Validation failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-muted/30">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-primary" />
              <Shield className="h-4 w-4 text-destructive absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold gradient-text">EduLearn Admin</span>
          </Link>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground">Access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Admin Email</label>
            <Input
              id="email"
              type="email"
              placeholder="admin@edulearn.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary-hover" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Admin Login"}
          </Button>
        </form>


        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Are you a student?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Student Login
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;