import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (type: "login" | "signup") => {
    try {
      // Validate inputs
      if (!email || !password) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter both email and password.",
        });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter a valid email address.",
        });
        return;
      }

      // Validate password length
      if (password.length < 6) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Password must be at least 6 characters long.",
        });
        return;
      }

      setLoading(true);
      console.log(`Attempting to ${type} with email:`, email);

      if (type === "login") {
        const { error } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        
        if (error) {
          if (error.message === "Invalid login credentials") {
            throw new Error("Invalid email or password. Please try again or sign up if you don't have an account.");
          }
          throw error;
        }

        navigate("/");
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password 
        });

        if (error) throw error;

        toast({
          title: "Check your email",
          description: "We sent you a confirmation link.",
        });
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Hacker News
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in or create an account
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-4">
            <Button
              onClick={() => handleAuth("login")}
              disabled={loading}
              className="w-full"
            >
              Sign in
            </Button>
            <Button
              onClick={() => handleAuth("signup")}
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;