"use client"
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import GenericUserUrlForm from "@/components/generic-user-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const GenericShortner = () => {
  const router = useRouter();
  return (
    <div className="h-screen w-full flex items-center justify-center p-4 ">

      <Card className=" w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Paste Your Link Here
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {/* This is the form component */}
          <GenericUserUrlForm />

          <p className="text-muted-foreground mb-2">or</p>

          <Button
            className="font-semibold w-[150px]"
            onClick={() => router.push("/login")}
          >
            Join Shortit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenericShortner;
