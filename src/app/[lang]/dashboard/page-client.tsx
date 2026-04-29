"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Label from "@/components/ui/form/Label";
import Input from "@/components/ui/form/input/InputField";
import { Button } from "@/components/ui/buttons/Button";
import Title from "@/components/ui/titles/title";

export function PageClient() {
  const router = useRouter();
  // const teams = user.useTeams();
  const [teamDisplayName, setTeamDisplayName] = React.useState("");

  // React.useEffect(() => {
  //   if (teams.length > 0 && !user.selectedTeam) {
  //     user.setSelectedTeam(teams[0]);
  //   }
  // }, [teams, user]);

  // if (teams.length === 0) {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="max-w-xs w-full">
        <Title
          className="text-center text-2xl font-semibold"
          type="h1"
          title={"Welcome!"}
        />
        <p className="text-center text-gray-500">this is simple dashboard</p>
      </div>
    </div>
  );
  // } else if (user.selectedTeam) {
  //   router.push(`/dashboard/${user.selectedTeam.id}`);
  // }

  return null;
}
