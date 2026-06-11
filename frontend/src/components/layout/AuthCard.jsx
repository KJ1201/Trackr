import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

function AuthCard({ name }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (name === "register" && password !== password2) {
    //   // setError("Passwords do not match.");
    //   toast.error("Passwords do not match.");
    //   return;
    // }

    setLoading(true);
    try {
      if (name === "register") {
        await register({ username, email, password, password2 });
        navigate("/login");
        toast.success("Account Created Successfully");
      }
      if (name === "login") {
        await login({ username, password });
        navigate("/dashboard");
        toast.success("Logged In Successful");
      }
    } catch (err) {
      const data = err.response?.data;
      if (data) {
        const messages = Object.values(data).flat().join(" ");
        // setError(messages);
        toast.error(messages);
      } else {
        // setError("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-black">
              {name === "login"
                ? "Login to your account"
                : "Create a new account"}
            </CardTitle>
            <CardDescription>
              Enter your details below to {name} to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Your Name"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Field>
                {name === "register" ? (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Field>
                ) : null}

                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    {name === "login" ? (
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    ) : null}
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>

                {name === "register" ? (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password2">
                        Confirm Password
                      </FieldLabel>
                    </div>
                    <Input
                      id="password2"
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </Field>
                ) : null}

                <Field>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      name.toUpperCase()
                    )}
                  </Button>
                  {/* <Button variant="outline" type="button">
                    Login with Google
                  </Button> */}
                  {name === "login" ? (
                    <FieldDescription className="text-center">
                      Don&apos;t have an account?{" "}
                      <Link to="/register">Sign Up</Link>
                    </FieldDescription>
                  ) : (
                    <FieldDescription className="text-center">
                      Have an existing account? <Link to="/login">Login</Link>
                    </FieldDescription>
                  )}
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AuthCard;
