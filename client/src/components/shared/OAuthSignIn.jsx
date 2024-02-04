import Icons from "@/components/Icons";
import { Button } from "../ui/button";

const OAuthSignIn = () => {
  const oauthProviders = [
    {
      name: "Google",
      strategy: "oauth_google",
      icon: "google",
      color: "hover:bg-green-500",
    },
    {
      name: "Facebook",
      strategy: "oauth_facebook",
      icon: "facebook",
      color: "hover:bg-blue-500",
    },
    {
      name: "Twitter",
      strategy: "oauth_twitter",
      icon: "twitter",
      color: "hover:bg-blue-400",
    },
    {
      name: "Discord",
      strategy: "oauth_discord",
      icon: "discord",
      color: "hover:bg-violet-500",
    }
  ];

  return (
    <>
      <div>
        <div className="flex flex-wrap justify-center cursor-pointer gap-8">
          {oauthProviders.map((provider) => {
            const Icon = Icons[provider.icon];
            return (
              <Button
                className={`text-white flex ${provider.color}`}
              >
                <Icon className="mr-2 size-4" aria-hidden="true" />
                {provider.name}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OAuthSignIn;
