import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
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
    console.log("Login: handleSubmit called with formData:", formData);

    if (validateForm()) {
      console.log("Login: Validation passed, attempting login");
      console.log("Login: Attempting login with:", { email: formData.email, role: "user" });
      try {
        const result = await login(formData.email, formData.password, "user");
        console.log("Login: Login result:", result);
        toast.success("Login successful!");
        console.log("Login: About to navigate to /user/dashboard");
        console.log("Login: Current location before navigation:", window.location.pathname);
        navigate("/user/dashboard");
        console.log("Login: Navigation called, current location after:", window.location.pathname);
      } catch (error) {
        console.log("Login: Login failed with error:", error);
        toast.error("Login failed. Please check your credentials.");
      }
    } else {
      console.log("Login: Validation failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-muted/30">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">EduLearn</span>
          </Link>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Login to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary-hover" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>


        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            Are you an admin?{" "}
            <Link to="/admin/login" className="text-primary hover:underline">
              Admin Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
