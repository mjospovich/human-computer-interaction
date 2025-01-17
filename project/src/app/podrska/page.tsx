// podrska page

import { Navigation } from "@/components/navigation";
import { CopyButton } from "@/components/copyButton";

export default function PodrskaPage() {
  const email = "kupujemautohr@gmail.com";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Navigation />
      <div className="text-center ">
        <p className="text-sm text-secondary-text-black">
          Za više informacija kontaktirajte nas na:
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-main-text-black pl-3">{email}</span>
          <CopyButton text={email} />
        </div>
      </div>
    </main>
  );
}
