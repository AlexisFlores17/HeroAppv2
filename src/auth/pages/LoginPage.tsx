
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router";

export const LoginPage = () => {

  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/", {
      replace: true,
    });
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-500">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 md:p-6 lg:p-8">
        <Card >
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput id="email1" type="email" placeholder="name@flowbite.com"  />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput id="password1" type="password"  />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
