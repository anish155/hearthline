/* Hearthline auth: signup is calm and human, introducing the saved-home experience without adding unnecessary friction. */
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!signUp(name, email, password)) {
      toast.error("Add your name, a valid email, and a password with at least 6 characters");
      return;
    }
    toast.success("Your Hearthline profile is ready");
    setLocation("/dashboard");
  };

  return <AuthLayout eyebrow="Create your profile" title={<>Make room<br /><em>for what’s next.</em></>} copy="Save the homes that stay with you, request private viewings, and keep every next step in one considered place."><form className="auth-form" onSubmit={submit}><label>Your name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Alex Morgan" autoComplete="name" /></label><label>Email address<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" /></label><label>Create a password<span className="password-field"><input type={showPassword ? "text" : "password"} required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" autoComplete="new-password" /><button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label><button type="submit" className="button button--clay w-full">Create profile <ArrowRight size={15} /></button><p className="auth-form__note">Already a member? <Link href="/login">Log in to Hearthline</Link></p></form></AuthLayout>;
}
