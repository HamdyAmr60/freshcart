
import React, { useState } from 'react';
import Layout from '@/components/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, LogIn, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock authentication functionality - in a real app, this would use Firebase, Auth0, etc.
const Account: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const { toast } = useToast();

  // Mock user data
  const [user, setUser] = useState({
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
  });

  // Mock login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Mock register form state
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic - would normally validate with backend
    toast({
      title: "Logged in successfully",
      description: "Welcome back!",
    });
    setIsLoggedIn(true);
    setUser({
      name: 'Jane Smith',
      email: loginForm.email,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    // Mock register logic - would normally send to backend
    toast({
      title: "Account created successfully",
      description: "Welcome to Evergreen!",
    });
    setIsLoggedIn(true);
    setUser({
      name: registerForm.name,
      email: registerForm.email,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '' });
    toast({
      title: "Logged out successfully",
      description: "Come back soon!",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-medium mb-6 flex items-center">
            <User className="mr-2" /> My Account
          </h1>

          {isLoggedIn ? (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <div className="text-lg">{user.name}</div>
                </div>
                <div>
                  <Label>Email</Label>
                  <div className="text-lg">{user.email}</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Tabs 
              defaultValue="login" 
              value={activeTab} 
              onValueChange={(v) => setActiveTab(v as 'login' | 'register')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input 
                          id="login-email"
                          type="email" 
                          name="email"
                          value={loginForm.email}
                          onChange={handleLoginChange}
                          placeholder="your.email@example.com" 
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          name="password"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-sage-500 hover:bg-sage-600">
                        <LogIn className="mr-2 h-4 w-4" /> Login
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Full Name</Label>
                        <Input
                          id="register-name"
                          name="name"
                          value={registerForm.name}
                          onChange={handleRegisterChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input 
                          id="register-email"
                          type="email"
                          name="email"
                          value={registerForm.email}
                          onChange={handleRegisterChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input 
                          id="register-password"
                          type="password"
                          name="password"
                          value={registerForm.password}
                          onChange={handleRegisterChange}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-confirm">Confirm Password</Label>
                        <Input 
                          id="register-confirm"
                          type="password"
                          name="confirmPassword"
                          value={registerForm.confirmPassword}
                          onChange={handleRegisterChange}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-sage-500 hover:bg-sage-600">
                        Create Account
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Account;
