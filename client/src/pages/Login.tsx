/* Hearthline auth: the login page keeps the editorial voice intact while making the shortest path back to a saved home obvious. */
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [, setLocation] = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!signIn(email, password)) {
      toast.error("Enter an email and a password with at least 6 characters");
      return;
    }
    toast.success("Good to see you again");
    setLocation("/dashboard");
  };

  return <AuthLayout eyebrow="Member access" title={<>Welcome<br /><em>back home.</em></>} copy="Sign in to return to your saved residences, upcoming viewings, and private conversations."><form className="auth-form" onSubmit={submit}><label>Email address<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" /></label><label>Password<span className="password-field"><input type={showPassword ? "text" : "password"} required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" autoComplete="current-password" /><button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label><button type="submit" className="button button--clay w-full">Log in <ArrowRight size={15} /></button><p className="auth-form__note">No account yet? <Link href="/signup">Create your Hearthline profile</Link></p></form></AuthLayout>;
}
