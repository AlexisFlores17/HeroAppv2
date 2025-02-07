import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {login}= useContext(AuthContext);
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


 

    login("Alexis Flores");
    


    navigate("/marvel", {
      replace: true,
    });
  };

  return (
    <div className="login flex items-center justify-center h-screen">
      <div
        className="square backdrop-blur-sm "
        style={{ "--i": 0 } as React.CSSProperties}
      ></div>
      <div
        className="square backdrop-blur-sm"
        style={{ "--i": 1 } as React.CSSProperties}
      ></div>
      <div
        className="square backdrop-blur-sm"
        style={{ "--i": 2 } as React.CSSProperties}
      ></div>
      <div
        className="square backdrop-blur-sm"
        style={{ "--i": 3 } as React.CSSProperties}
      ></div>
      <div
        className="square backdrop-blur-sm"
        style={{ "--i": 4 } as React.CSSProperties}
      ></div>
      <div
        className="square backdrop-blur-sm"
        style={{ "--i": 5 } as React.CSSProperties}
      ></div>
      <div
        className="square backdrop-blur-sm"
        style={{ "--i": 6 } as React.CSSProperties}
      ></div>
      <div
        className="square backdrop-blur-sm"
        style={{ "--i": 7 } as React.CSSProperties}
      ></div>
      <div
        className="square backdrop-blur-sm"
        style={{ "--i": 8 } as React.CSSProperties}
      ></div>
      <div className="login-cristal backdrop-blur-[5px] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 md:p-6 lg:p-8">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput id="email1" type="email" placeholder="name@flowbite.com" />
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              placeholder="******"
              autoComplete="on"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};
