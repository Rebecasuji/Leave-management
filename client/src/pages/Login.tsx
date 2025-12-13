import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'wouter';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const loginSchema = z.object({
  code: z.string().min(1, "Employee Code is required"),
  password: z.string().min(1, "Password is required"), // Not strictly checked in mock, but good for UI
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      code: '',
      password: '',
    }
  });

  useEffect(() => {
    if (user) {
      if (user.role === 'Admin') {
        setLocation('/admin/dashboard');
      } else {
        setLocation('/employee/dashboard');
      }
    }
  }, [user, setLocation]);

  useEffect(() => {
    // Intro animation
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(".login-element", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, 
      "-=0.4"
    );
  }, []);

  const onSubmit = async (data: LoginForm) => {
    // Mock password check - in real app this would be secure
    // Accepting any password for the prototype as long as code matches
    const success = await login(data.code.toUpperCase());
    
    if (success) {
      toast({
        title: "Welcome back",
        description: "Login successful",
        className: "bg-primary/10 border-primary/20 text-white"
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid Employee Code",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div ref={containerRef} className="w-full max-w-md px-4 relative z-10">
        <div className="mb-8 text-center login-element">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] rotate-3">
             <span className="text-4xl font-bold text-white">K</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white tracking-wider mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">KNOCKTURN</h1>
          <p className="text-muted-foreground uppercase tracking-[0.3em] text-sm">Private Limited</p>
        </div>

        <Card className="bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardHeader className="space-y-1 login-element">
            <CardTitle className="text-2xl text-center text-white">Sign In</CardTitle>
            <CardDescription className="text-center">Enter your Employee Code to access the portal</CardDescription>
          </CardHeader>
          <CardContent className="login-element">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Employee Code</label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                  <Input 
                    {...form.register("code")}
                    placeholder="e.g. A0001 or E0041" 
                    className="relative bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 transition-all h-12"
                  />
                </div>
                {form.formState.errors.code && (
                  <p className="text-red-400 text-xs mt-1">{form.formState.errors.code.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                  <Input 
                    {...form.register("password")}
                    type="password" 
                    placeholder="••••••••" 
                    className="relative bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 transition-all h-12"
                  />
                </div>
                 {form.formState.errors.password && (
                  <p className="text-red-400 text-xs mt-1">{form.formState.errors.password.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 mt-6"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Authenticating..." : "LOGIN TO DASHBOARD"}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-xs text-muted-foreground">Restricted Access. Authorized Personnel Only.</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
